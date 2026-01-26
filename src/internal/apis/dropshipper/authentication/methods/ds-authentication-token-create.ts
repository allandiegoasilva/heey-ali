import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';
import { HttpMethod } from '@/internal/enum/http-method';
import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { DSAuthenticationTokenCreateInputDTO } from '../dtos/token-create/ds-authentication-token-create-input.dto';

/**
 * Class responsible for creating the authentication token after user authorization.
 *
 * After the user authorizes, they will be redirected to the redirect_uri (callback URL)
 * set by the developer in Step 1, along with the temporary token code. The app then uses
 * the code to exchange for an access_token from the open platform backend interface.
 * This interface must be submitted using the POST method and the https protocol.
 *
 * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1592 Official API Documentation}
 *
 * @internal
 */
export class DsAuthenticationTokenCreate {
  private _method = `/auth/token/create`;

  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DsAuthenticationTokenCreate(httpClient);
  }

  /**
   * Executes the authentication token creation.
   *
   * Exchanges the temporary authorization code for a valid access_token.
   *
   * @param input - Input data containing the authorization code and other necessary information
   * @returns Promise that resolves with the access token data
   */
  async execute(input: DSAuthenticationTokenCreateInputDTO): Promise<unknown> {
    const request = await this._httpClient.request({
      endpoint: this._method,
      method: HttpMethod.POST,
      prefix: EndpointPrefix.REST,
      params: {
        ...input,
      },
    });

    return request.data;
  }
}
