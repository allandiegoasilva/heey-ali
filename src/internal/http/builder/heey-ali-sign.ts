import { createHmac } from "crypto";

type Input = {
  appSecret: string;
  params: Record<string, string>;
}

/* @internal */
export class HeeyAliSignParams {
  static sign(input: Input): string {
    let params: string = '';

    for (const key of Object.keys(input.params)) {
      params += `${key}${input.params[key]}`;
    }

    const hmac = createHmac('sha256', input.appSecret);
    hmac.update(params);

    return hmac.digest('hex').toUpperCase();
  }
}