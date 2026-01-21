import { HeeyAliHttpClient } from "./internal/http/heey-ali-http-client";
import { HeeyAliCredential } from "./types";

export class HeeyAli {
  private _httpClient: HeeyAliHttpClient;

  constructor(readonly credential: HeeyAliCredential) {
    this._httpClient = new HeeyAliHttpClient(credential);
  }

  get test(): unknown {
    return "oi";
  }
}