import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';
import { HeeyAliSignParams } from '@/internal/http/builder/heey-ali-sign';
import { describe, expect, it } from 'vitest';

describe('HeeyAliSignParams', () => {
  describe('when prefix is SYNC', () => {
    it('should generate sign with correct format', () => {
      const input = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {
          param1: 'value1',
          param2: 'value2',
        },
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
    });

    it('should generate same sign for same input', () => {
      const input = {
        appSecret: 'secret-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
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
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {
          key1: 'value1',
        },
      };
      const input2 = {
        appSecret: secret,
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
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
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params,
      };
      const input2 = {
        appSecret: 'secret2',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params,
      };

      const result1 = HeeyAliSignParams.sign(input1);
      const result2 = HeeyAliSignParams.sign(input2);

      expect(result1).not.toBe(result2);
    });

    it('should handle empty params object', () => {
      const input = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {},
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
    });

    it('should produce uppercase hexadecimal string', () => {
      const input = {
        appSecret: 'test-secret-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {
          param1: 'value1',
        },
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
      expect(result.length).toBe(64);
    });
  });

  describe('when prefix is REST', () => {
    it('should generate sign with method prepended to params', () => {
      const input = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          param1: 'value1',
          param2: 'value2',
        },
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
    });

    it('should generate same sign for same input', () => {
      const input = {
        appSecret: 'secret-key',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          key1: 'value1',
          key2: 'value2',
        },
      };

      const result1 = HeeyAliSignParams.sign(input);
      const result2 = HeeyAliSignParams.sign(input);

      expect(result1).toBe(result2);
    });

    it('should generate different sign for different methods', () => {
      const secret = 'test-secret';
      const input1 = {
        appSecret: secret,
        method: 'method1',
        prefix: EndpointPrefix.REST,
        params: {
          key1: 'value1',
        },
      };
      const input2 = {
        appSecret: secret,
        method: 'method2',
        prefix: EndpointPrefix.REST,
        params: {
          key1: 'value1',
        },
      };

      const result1 = HeeyAliSignParams.sign(input1);
      const result2 = HeeyAliSignParams.sign(input2);

      expect(result1).not.toBe(result2);
    });

    it('should generate different sign for different params', () => {
      const secret = 'test-secret';
      const input1 = {
        appSecret: secret,
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          key1: 'value1',
        },
      };
      const input2 = {
        appSecret: secret,
        method: 'test.method',
        prefix: EndpointPrefix.REST,
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
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params,
      };
      const input2 = {
        appSecret: 'secret2',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params,
      };

      const result1 = HeeyAliSignParams.sign(input1);
      const result2 = HeeyAliSignParams.sign(input2);

      expect(result1).not.toBe(result2);
    });

    it('should handle empty params object', () => {
      const input = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {},
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
    });

    it('should produce uppercase hexadecimal string', () => {
      const input = {
        appSecret: 'test-secret-key',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          param1: 'value1',
        },
      };

      const result = HeeyAliSignParams.sign(input);

      expect(result).toBe(result.toUpperCase());
      expect(result).toMatch(/^[A-F0-9]+$/);
      expect(result.length).toBe(64);
    });
  });

  describe('comparison between prefixes', () => {
    it('should generate different signs for same params with different prefixes', () => {
      const input1 = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {
          key1: 'value1',
        },
      };
      const input2 = {
        appSecret: 'test-secret',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          key1: 'value1',
        },
      };

      const result1 = HeeyAliSignParams.sign(input1);
      const result2 = HeeyAliSignParams.sign(input2);

      expect(result1).not.toBe(result2);
    });
  });
});

