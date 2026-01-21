// TODO: Fix this test

import { HttpMethod } from '@/internal/enum/http-method';
import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { beforeAll, describe, expect, it } from 'vitest';
import { heeyAliGetCredentialMock } from './mocks/heey-ali-get-credential.mock';

describe('HeeyAliHttpClient - Integration', () => {
  let sut: HeeyAliHttpClient;

  beforeAll(() => {
    const credential = heeyAliGetCredentialMock();
    sut = new HeeyAliHttpClient(credential);
  });


  it('should throw error when credential is invalid', () => {
    expect(() => {
      new HeeyAliHttpClient({
        appKey: '',
        appSecret: 'secret',
        baseUrl: 'https://api.test.com',
      });
    }).toThrow(
      'Invalid Heey Ali credential configuration, for start configure the client, you need to provide the appKey, appSecret and baseUrl',
    );

    expect(() => {
      new HeeyAliHttpClient({
        appKey: 'key',
        appSecret: '',
        baseUrl: 'https://api.test.com',
      });
    }).toThrow(
      'Invalid Heey Ali credential configuration, for start configure the client, you need to provide the appKey, appSecret and baseUrl',
    );

    expect(() => {
      new HeeyAliHttpClient({
        appKey: 'key',
        appSecret: 'secret',
        baseUrl: '',
      });
    }).toThrow(
      'Invalid Heey Ali credential configuration, for start configure the client, you need to provide the appKey, appSecret and baseUrl',
    );
  });

  it('should make request and return response with success', async () => {
    const input = {
      method: HttpMethod.GET,
      endpoint: 'aliexpress.ds.product.get',
      params: {},
    };

    const result = await sut.request(input);

    console.log(result);

    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('data');
    expect(result.success).toBe(true);
  }, 30000);

  it('should include all params in request', async () => {
    const input = {
      method: HttpMethod.GET,
      endpoint: 'test.method',
      params: {
        param1: 'value1',
        param2: 'value2',
      },
    };

    const result = await sut.request(input);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  }, 30000);

  it('should handle POST method', async () => {
    const input = {
      method: HttpMethod.POST,
      endpoint: 'test.endpoint',
      params: {},
    };

    const result = await sut.request(input);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  }, 30000);

  it('should build correct URL with all params', async () => {
    const input = {
      method: HttpMethod.GET,
      endpoint: 'test.endpoint',
      params: {
        custom_param: 'custom_value',
      },
    };

    const result = await sut.request(input);

    expect(result.success).toBe(true);
  }, 30000);
});
