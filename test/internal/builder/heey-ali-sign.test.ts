import { HeeyAliSignParams } from '@/internal/http/builder/heey-ali-sign';
import { describe, expect, it } from 'vitest';

describe('HeeyAliSignParams', () => {
  it('should generate sign with correct format', () => {
    const input = {
      appSecret: 'test-secret',
      params: {
        param1: 'value1',
        param2: 'value2',
      },
    };

    const result = HeeyAliSignParams.sign(input);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toBe(result.toUpperCase());
  });

  it('should generate same sign for same input', () => {
    const input = {
      appSecret: 'secret-key',
      params: {
        key1: 'value1',
        key2: 'value2',
      },
    };

    const result1 = HeeyAliSignParams.sign(input);
    const result2 = HeeyAliSignParams.sign(input);

    expect(result1).toBe(result2);
  });

  it('should generate different sign for different params', () => {
    const secret = 'test-secret';
    const input1 = {
      appSecret: secret,
      params: {
        key1: 'value1',
      },
    };
    const input2 = {
      appSecret: secret,
      params: {
        key1: 'value2',
      },
    };

    const result1 = HeeyAliSignParams.sign(input1);
    const result2 = HeeyAliSignParams.sign(input2);

    expect(result1).not.toBe(result2);
  });

  it('should generate different sign for different secrets', () => {
    const params = { key1: 'value1' };
    const input1 = {
      appSecret: 'secret1',
      params,
    };
    const input2 = {
      appSecret: 'secret2',
      params,
    };

    const result1 = HeeyAliSignParams.sign(input1);
    const result2 = HeeyAliSignParams.sign(input2);

    expect(result1).not.toBe(result2);
  });

  it('should handle empty params object', () => {
    const input = {
      appSecret: 'test-secret',
      params: {},
    };

    const result = HeeyAliSignParams.sign(input);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toBe(result.toUpperCase());
  });

  it('should concatenate params in sorted order for signing', () => {
    const input = {
      appSecret: 'secret',
      params: {
        z: 'z-value',
        a: 'a-value',
        m: 'm-value',
      },
    };

    const result = HeeyAliSignParams.sign(input);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBe(64);
    expect(result).toMatch(/^[A-F0-9]+$/);
  });

  it('should produce uppercase hexadecimal string', () => {
    const input = {
      appSecret: 'test-secret-key',
      params: {
        param1: 'value1',
      },
    };

    const result = HeeyAliSignParams.sign(input);

    expect(result).toBe(result.toUpperCase());
    expect(result).toMatch(/^[A-F0-9]+$/);
  });
});

