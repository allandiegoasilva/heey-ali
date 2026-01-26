import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';
import { HeeyAliCredential } from '@/types';
import { HeeyAliBuildParams } from './heey-ali-build-params';
import { HeeyAliSignParams } from './heey-ali-sign';
import { HeeyAliSortParams } from './heey-ali-sort-params';

type Input = {
  prefix: EndpointPrefix;
  method: string;
  params: Record<string, string>;
};

/* @internal */
export class HeeyAliHttpEndpointBuilder {
  private _credential: HeeyAliCredential;

  constructor(readonly credential: HeeyAliCredential) {
    this._credential = credential;
  }

  build(input: Input): string {
    if (input.prefix === EndpointPrefix.REST) {
      const paramString = this.signParams(input);

      return `${this._credential.baseUrl}/${input.prefix}${input.method}?${paramString}`;
    }

    const paramString = this.signParams(input);
    return `${this._credential.baseUrl}?${paramString}`;
  }

  private signParams(input: Input): string {
    const params = HeeyAliBuildParams.build({
      prefix: input.prefix,
      params: input.params,
      method: input.method,
      appKey: this._credential.appKey,
    });

    const sortedParams = HeeyAliSortParams.sortParams(params);

    const sign = HeeyAliSignParams.sign({
      appSecret: this._credential.appSecret,
      params: sortedParams,
      method: input.method,
      prefix: input.prefix,
    });

    const urlParams = new URLSearchParams(sortedParams);
    urlParams.append('sign', sign);

    const paramString: string = urlParams.toString();

    return paramString;
  }
}
