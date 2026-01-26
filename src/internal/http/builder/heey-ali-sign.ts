import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';
import { createHmac } from 'crypto';

type Input = {
  appSecret: string;
  method: string;
  prefix: EndpointPrefix;
  params: Record<string, string>;
};

/* @internal */
export class HeeyAliSignParams {
  static sign(input: Input): string {
    let params: string = '';

    for (const key of Object.keys(input.params)) {
      params += `${key}${input.params[key]}`;
    }

    if (input.prefix === EndpointPrefix.REST) {
      params = `${input.method}${params}`;
    }

    const hmac = createHmac('sha256', input.appSecret);
    hmac.update(params);

    return hmac.digest('hex').toUpperCase();
  }
}
