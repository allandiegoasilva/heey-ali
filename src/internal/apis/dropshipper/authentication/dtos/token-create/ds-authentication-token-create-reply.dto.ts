/**
 * Response DTO for the authentication token creation API.
 *
 * This type represents the response structure returned after successfully exchanging
 * an authorization code for an access token. The response includes authentication tokens,
 * user information, and expiration details.
 *
 * @see {@link https://openservice.aliexpress.com/doc/doc.htm?spm=a2o9m.11193494.0.0.80ca6095yBvNgQ&nodeId=27493&docId=118729#/?docId=1592 Official API Documentation}
 *
 * @internal
 */
export type DsAuthenticationTokenCreateReplyDTO = {
  /** Valid time duration for the refresh token (in seconds) */
  refresh_token_valid_time: string;
  /** Havana ID identifier */
  havana_id: string;
  /** Response code indicating the status of the request */
  code: string;
  /** Expiration time for the access token */
  expire_time: string;
  /** Locale setting (e.g., "zh_CN") */
  locale: string;
  /** User nickname */
  user_nick: string;
  /** Access token used for API authentication */
  access_token: string;
  /** Refresh token used to obtain a new access token when it expires */
  refresh_token: string;
  /** Account ID associated with the authenticated user */
  account_id: string;
  /** User ID identifier */
  user_id: string;
  /** Platform where the account is registered (e.g., "seller_center") */
  account_platform: string;
  /** Time in seconds until the refresh token expires */
  refresh_expires_in: string;
  /** Time in seconds until the access token expires */
  expires_in: string;
  /** Service provider identifier (e.g., "global") */
  sp: string;
  /** Unique request ID for tracking purposes */
  request_id: string;
  /** Seller ID identifier */
  seller_id: string;
  /** Account email address */
  account: string;
};
