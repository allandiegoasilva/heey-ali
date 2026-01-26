import { HeeyAliHttpClient } from '@/internal/http/heey-ali-http-client';
import { DsAuthenticationAuthorizeInputDTO } from '../dtos/authorize/ds-authentication-authorize-input.dto';

/**
 * Let users authorize your APP. Your users can use their AE accounts to authorize your APP.
 * After successful authorization, your APP will be able to access the user's data.
 *
 * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1590 Official API Documentation}
 *
 * @internal
 */
export class DsAuthorize {
  private _method = `/oauth/authorize`;

  private constructor(private readonly _httpClient: HeeyAliHttpClient) {}

  static _create(httpClient: HeeyAliHttpClient) {
    return new DsAuthorize(httpClient);
  }

  async execute(input: DsAuthenticationAuthorizeInputDTO): Promise<string> {
    const url = new URL(this._httpClient.credential.baseUrl);
    url.pathname = this._method;

    url.searchParams.set('force_auth', 'true');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('redirect_uri', input.redirect_uri);
    url.searchParams.set('client_id', this._httpClient.credential.appKey);

    return url.toString();
  }
}
