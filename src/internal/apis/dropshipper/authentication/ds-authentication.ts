import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { DSAuthorizeInputDTO } from './dtos/authorize/ds-authorize-input.dto';
import { DSAuthenticationTokenCreateInputDTO } from './dtos/token-create/token-create-input.dto';
import { DsAuthenticationTokenCreate } from './methods/ds-authentication-token-create';
import { DsAuthenticationTokenRefresh } from './methods/ds-authentication-token-refresh';
import { DsAuthorize } from './methods/ds-authorize';

export class DsAuthentication {
  private _authorize?: DsAuthorize;
  private _tokenCreate?: DsAuthenticationTokenCreate;
  private _tokenRefresh?: DsAuthenticationTokenRefresh;

  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DsAuthentication(httpClient);
  }

  /**
   * Let users authorize your APP. Your users can use their AE accounts to authorize your APP.
   * After successful authorization, your APP will be able to access the user's data.
   *
   * @param input - Input data containing the redirect URI
   * @returns Promise that resolves with the authorization URL
   *
   * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1590 Official API Documentation}
   */
  authorize(input: DSAuthorizeInputDTO): Promise<string> {
    if (!this._authorize) {
      this._authorize = DsAuthorize._create(this._httpClient);
    }

    return this._authorize.execute(input);
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
