type Input = {
  appKey: string;
  method: string;
  params: Record<string, string>;
};

/* @internal */
export class HeeyAliBuildParams {
  static build(input: Input): Record<string, string> {
    return {
      ...input.params,
      method: input.method,
      sign_method: 'sha256',
      app_key: input.appKey,
      timestamp: Date.now().toString(),
    };
  }
}
