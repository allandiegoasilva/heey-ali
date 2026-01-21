import { HeeyAliBuildParams } from '@/internal/http/builder/heey-ali-build-params';
import { describe, expect, it } from 'vitest';

describe('HeeyAliBuildParams', () => {
  it('should build params with all required fields', () => {
    const input = {
      appKey: 'test-app-key',
      method: 'test.method',
      params: {
        param1: 'value1',
        param2: 'value2',
      },
    };

    const result = HeeyAliBuildParams.build(input);

    expect(result).toHaveProperty('param1', 'value1');
    expect(result).toHaveProperty('param2', 'value2');
    expect(result).toHaveProperty('method', 'test.method');
    expect(result).toHaveProperty('sign_method', 'sha256');
    expect(result).toHaveProperty('app_key', 'test-app-key');
    expect(result).toHaveProperty('timestamp');
    expect(typeof result.timestamp).toBe('string');
  });

  it('should include custom params in result', () => {
    const input = {
      appKey: 'app-key-123',
      method: 'custom.method',
      params: {
        custom_param: 'custom_value',
        another_param: 'another_value',
      },
    };

    const result = HeeyAliBuildParams.build(input);

    expect(result.custom_param).toBe('custom_value');
    expect(result.another_param).toBe('another_value');
  });

  it('should always set sign_method to sha256', () => {
    const input = {
      appKey: 'test-key',
      method: 'test.method',
      params: {},
    };

    const result = HeeyAliBuildParams.build(input);

    expect(result.sign_method).toBe('sha256');
  });

  it('should set timestamp as string', () => {
    const input = {
      appKey: 'test-key',
      method: 'test.method',
      params: {},
    };

    const result = HeeyAliBuildParams.build(input);

    expect(result.timestamp).toBeDefined();
    expect(typeof result.timestamp).toBe('string');
  });

  it('should handle empty params object', () => {
    const input = {
      appKey: 'test-key',
      method: 'test.method',
      params: {},
    };

    const result = HeeyAliBuildParams.build(input);

    expect(result).toHaveProperty('method', 'test.method');
    expect(result).toHaveProperty('sign_method', 'sha256');
    expect(result).toHaveProperty('app_key', 'test-key');
    expect(result).toHaveProperty('timestamp');
  });
});

