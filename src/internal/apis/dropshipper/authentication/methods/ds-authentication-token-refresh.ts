import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';

export class DsAuthenticationTokenRefresh {
  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DsAuthenticationTokenRefresh(httpClient);
  }

  async execute() {
    console.log('execute');
  }
}
