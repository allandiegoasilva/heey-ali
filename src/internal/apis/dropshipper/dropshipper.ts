import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { DsAuthentication } from './authentication/ds-authentication';

export class DropshippersApi {
  private _authenticate?: DsAuthentication;

  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DropshippersApi(httpClient);
  }

  get authentication() {
    if (!this._authenticate) {
      this._authenticate = DsAuthentication._create(this._httpClient);
    }

    return this._authenticate;
  }
}
