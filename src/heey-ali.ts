import { DropshippersApi } from './internal/apis/dropshipper/dropshipper';
import { HeeyAliHttpClient } from './internal/http/heey-ali-http-client';
import { HeeyAliCredential } from './types';

export class HeeyAli {
  private _httpClient: HeeyAliHttpClient;

  constructor(readonly credential: HeeyAliCredential) {
    this._httpClient = new HeeyAliHttpClient(credential);
  }

  /**
   * Gets the Dropshippers API instance for accessing AliExpress Dropshipper services.
   *
   * This API provides access to dropshipper-related operations such as authentication,
   * order management, and product information for AliExpress dropshipping partners.
   *
   * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1646 AliExpress Dropshipper API Documentation}
   * @returns {DropshippersApi} An instance of the DropshippersApi class
   * @example
   * ```typescript
   * const dropshippersApi = new HeeyAli(credentials).dropshippers;
   * const auth = await dropshippersApi.authentication.tokenCreate();
   * ```
   */
  get dropshippers(): DropshippersApi {
    return DropshippersApi._create(this._httpClient);
  }

  get affiliate(): unknown {
    throw new Error('Not implemented');
  }
}
