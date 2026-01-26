import { EndpointPrefix } from '@/internal/enum/endpoint-prefix';

type Input = {
  appKey: string;
  method: string;
  params: Record<string, string>;
  prefix: EndpointPrefix;
};

/* @internal */
export class HeeyAliBuildParams {
  static build(input: Input): Record<string, string> {
    const params: Record<string, string> = {
      ...input.params,
      sign_method: 'sha256',
      app_key: input.appKey,
      timestamp: Date.now().toString(),
    };

    if (input.prefix == EndpointPrefix.SYNC) {
      params['method'] = input.method;
    }

    return params;
  }
}
