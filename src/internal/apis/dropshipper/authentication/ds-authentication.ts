import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { ReplyDto } from '@/internal/types/reply.type';
import { DsAuthenticationAuthorizeInputDTO } from './dtos/authorize/ds-authentication-authorize-input.dto';
import { DSAuthenticationTokenCreateInputDTO } from './dtos/token-create/ds-authentication-token-create-input.dto';
import { DsAuthenticationTokenCreateReplyDTO } from './dtos/token-create/ds-authentication-token-create-reply.dto';
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
  authorize(input: DsAuthenticationAuthorizeInputDTO): Promise<string> {
    if (!this._authorize) {
      this._authorize = DsAuthorize._create(this._httpClient);
    }

    return this._authorize.execute(input);
  }

  /**
   * Creates the authentication token after user authorization.
   *
   * After the user authorizes, they will be redirected to the redirect_uri (callback URL)
   * set by the developer in Step 1, along with the temporary token code. The app then uses
   * the code to exchange for an access_token from the open platform backend interface.
   * This interface must be submitted using the POST method and the https protocol.
   *
   * @param input - Input data containing the authorization code and other necessary information
   * @returns Promise that resolves with the access token data
   *
   * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1592 Official API Documentation}
   */
  tokenCreate(
    input: DSAuthenticationTokenCreateInputDTO,
  ): Promise<ReplyDto<DsAuthenticationTokenCreateReplyDTO>> {
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
