import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { DSAuthenticationTokenCreateInputDTO } from './dtos/token-create/token-create-input.dto';
import { DsAuthenticationTokenCreate } from './methods/ds-authentication-token-create';
import { DsAuthenticationTokenRefresh } from './methods/ds-authentication-token-refresh';

export class DsAuthentication {
  private _tokenCreate?: DsAuthenticationTokenCreate;
  private _tokenRefresh?: DsAuthenticationTokenRefresh;

  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DsAuthentication(httpClient);
  }

  tokenCreate(input: DSAuthenticationTokenCreateInputDTO): Promise<unknown> {
    if (!this._tokenCreate) {
      this._tokenCreate = DsAuthenticationTokenCreate._create(this._httpClient);
    }

    return this._tokenCreate.execute(input);
  }

  tokenRefresh(): Promise<unknown> {
    if (!this._tokenRefresh) {
      this._tokenRefresh = DsAuthenticationTokenRefresh._create(
        this._httpClient,
      );
    }

    return this._tokenRefresh.execute();
  }
}
