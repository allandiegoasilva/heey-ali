import { AliExpressConfig } from '@/types/ali-express-config';
import { ReplyDto } from '@/types/reply-dto';
import { createHmac } from 'crypto';

export class AliExpress {
  private baseUrl = process.env.ALI_EXPRESS_BASE_URL;

  async request<T>(input: AliExpressConfig): Promise<ReplyDto<T>> {
    try {
      if (!this.baseUrl) {
        throw new Error('Api endpoint is not defined');
      }

      const params = this.buildParams({
        ...input.params,
        method: input.endpoint,
      });

      const request = await fetch(`${this.baseUrl}?${params}`, {
        method: input.method,
      });

      const result = await request.json();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: undefined,
      };
    }
  }

  buildParams(params: Record<string, string>): string {
    const orderParams = this.sortParams({
      ...params,
      timestamp: Date.now(),
      sign_method: 'sha256',
      app_key: process.env.ALI_EXPRESS_APP_KEY as string,
    });
    const urlParams = new URLSearchParams(orderParams);
    const sign = this.signParams(orderParams);
    urlParams.append('sign', sign);

    const paramString: string = urlParams.toString();
    return paramString;
  }

  signParams(searchParams: Record<string, any>) {
    const secret: string = process.env.ALI_EXPRESS_APP_SECRET as string;

    if (!secret) {
      throw new Error('Invlaid ali express secret');
    }

    let params: string = '';

    for (const key of Object.keys(searchParams)) {
      params += `${key}${searchParams[key]}`;
    }

    const hmac = createHmac('sha256', secret);
    hmac.update(params);

    return hmac.digest('hex').toUpperCase();
  }

  sortParams(params: Record<string, any>): Record<string, any> {
    const sortedParams: Record<string, string> = {};
    const sortedKeys = Object.keys(params).sort();

    for (const key of sortedKeys) {
      sortedParams[key] = params[key];
    }

    return sortedParams;
  }
}
