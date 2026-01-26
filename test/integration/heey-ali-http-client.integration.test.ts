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


  it('should just connect to the API with error in response', async () => {
    const input = {
      method: HttpMethod.GET,
      endpoint: 'aliexpress.ds.product.get',
      params: {
        ship_to_country: 'US',
        product_id: '1005003784285827',
        target_currency: 'USD',
        target_language: 'en',
        remove_personal_benefit: 'false',
      },
    };

    const result = await sut.request(input);

    expect(result.code).toBe(200);
    expect(result.success).toBe(false);
  });
});
