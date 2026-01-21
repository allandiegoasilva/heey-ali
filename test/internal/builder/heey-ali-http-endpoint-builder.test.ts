import { HeeyAliHttpEndpointBuilder } from '@/internal/http/builder/heey-ali-http-endpoint-builder';
import { HeeyAliCredential } from '@/types';
import { describe, expect, it } from 'vitest';

describe('HeeyAliHttpEndpointBuilder', () => {
  const mockCredential: HeeyAliCredential = {
    appKey: 'test-app-key',
    appSecret: 'test-app-secret',
    baseUrl: 'https://api.test.com',
  };

  it('should build endpoint URL with all params', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {
        param1: 'value1',
        param2: 'value2',
      },
    };

    const result = builder.build(input);

    expect(result).toContain('https://api.test.com?');
    expect(result).toContain('method=test.method');
    expect(result).toContain('sign_method=sha256');
    expect(result).toContain('app_key=test-app-key');
    expect(result).toContain('param1=value1');
    expect(result).toContain('param2=value2');
    expect(result).toContain('sign=');
    expect(result).toContain('timestamp=');
  });

  it('should include sign in URL', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {},
    };

    const result = builder.build(input);

    const url = new URL(result);
    const signParam = url.searchParams.get('sign');

    expect(signParam).toBeDefined();
    expect(signParam?.length).toBeGreaterThan(0);
    expect(signParam).toBe(signParam?.toUpperCase());
  });

  it('should use correct baseUrl from credential', () => {
    const credential: HeeyAliCredential = {
      appKey: 'key',
      appSecret: 'secret',
      baseUrl: 'https://custom.api.com',
    };
    const builder = new HeeyAliHttpEndpointBuilder(credential);
    const input = {
      method: 'test.method',
      params: {},
    };

    const result = builder.build(input);

    expect(result).toContain('https://custom.api.com?');
  });

  it('should include timestamp in URL', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {},
    };

    const result = builder.build(input);

    const url = new URL(result);
    const timestampParam = url.searchParams.get('timestamp');

    expect(timestampParam).toBeDefined();
    expect(timestampParam?.length).toBeGreaterThan(0);
  });

  it('should handle empty params', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {},
    };

    const result = builder.build(input);

    expect(result).toContain('method=test.method');
    expect(result).toContain('sign_method=sha256');
    expect(result).toContain('app_key=test-app-key');
    expect(result).toContain('sign=');
  });

  it('should sort params before signing', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {
        zebra: 'z-value',
        alpha: 'a-value',
        beta: 'b-value',
      },
    };

    const result = builder.build(input);

    const url = new URL(result);
    const paramString = url.search.substring(1);

    expect(paramString).toContain('alpha=a-value');
    expect(paramString).toContain('beta=b-value');
    expect(paramString).toContain('zebra=z-value');
  });

  it('should generate valid URL format', () => {
    const builder = new HeeyAliHttpEndpointBuilder(mockCredential);
    const input = {
      method: 'test.method',
      params: {
        test: 'value',
      },
    };

    const result = builder.build(input);

    expect(() => new URL(result)).not.toThrow();
    expect(result).toMatch(/^https:\/\/.+\?/);
  });

  it('should use appKey from credential', () => {
    const credential: HeeyAliCredential = {
      appKey: 'custom-key-123',
      appSecret: 'secret',
      baseUrl: 'https://api.test.com',
    };
    const builder = new HeeyAliHttpEndpointBuilder(credential);
    const input = {
      method: 'test.method',
      params: {},
    };

    const result = builder.build(input);

    expect(result).toContain('app_key=custom-key-123');
  });
});

