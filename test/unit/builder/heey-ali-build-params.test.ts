import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';
import { HeeyAliBuildParams } from '@/internal/http/builder/heey-ali-build-params';
import { describe, expect, it } from 'vitest';

describe('HeeyAliBuildParams', () => {
  describe('when prefix is SYNC', () => {
    it('should build params with all required fields including method', () => {
      const input = {
        appKey: 'test-app-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
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
        prefix: EndpointPrefix.SYNC,
        params: {
          custom_param: 'custom_value',
          another_param: 'another_value',
        },
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result.custom_param).toBe('custom_value');
      expect(result.another_param).toBe('another_value');
      expect(result).toHaveProperty('method', 'custom.method');
    });

    it('should handle empty params object', () => {
      const input = {
        appKey: 'test-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {},
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result).toHaveProperty('method', 'test.method');
      expect(result).toHaveProperty('sign_method', 'sha256');
      expect(result).toHaveProperty('app_key', 'test-key');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('when prefix is REST', () => {
    it('should build params without method field', () => {
      const input = {
        appKey: 'test-app-key',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {
          param1: 'value1',
          param2: 'value2',
        },
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result).toHaveProperty('param1', 'value1');
      expect(result).toHaveProperty('param2', 'value2');
      expect(result).not.toHaveProperty('method');
      expect(result).toHaveProperty('sign_method', 'sha256');
      expect(result).toHaveProperty('app_key', 'test-app-key');
      expect(result).toHaveProperty('timestamp');
    });

    it('should include custom params in result', () => {
      const input = {
        appKey: 'app-key-123',
        method: 'custom.method',
        prefix: EndpointPrefix.REST,
        params: {
          custom_param: 'custom_value',
          another_param: 'another_value',
        },
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result.custom_param).toBe('custom_value');
      expect(result.another_param).toBe('another_value');
      expect(result).not.toHaveProperty('method');
    });

    it('should handle empty params object', () => {
      const input = {
        appKey: 'test-key',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {},
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result).not.toHaveProperty('method');
      expect(result).toHaveProperty('sign_method', 'sha256');
      expect(result).toHaveProperty('app_key', 'test-key');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('common behavior', () => {
    it('should always set sign_method to sha256', () => {
      const input = {
        appKey: 'test-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {},
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result.sign_method).toBe('sha256');
    });

    it('should set timestamp as string', () => {
      const input = {
        appKey: 'test-key',
        method: 'test.method',
        prefix: EndpointPrefix.SYNC,
        params: {},
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result.timestamp).toBeDefined();
      expect(typeof result.timestamp).toBe('string');
    });

    it('should always include app_key from input', () => {
      const input = {
        appKey: 'custom-app-key',
        method: 'test.method',
        prefix: EndpointPrefix.REST,
        params: {},
      };

      const result = HeeyAliBuildParams.build(input);

      expect(result.app_key).toBe('custom-app-key');
    });
  });
});

