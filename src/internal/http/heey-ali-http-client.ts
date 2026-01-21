
import { HeeyAliCredential } from '@/internal/types/heey-ali-credential.type';
import { HeeyAliHttpClientRequest } from '@/internal/types/heey-ali-http-client-request.type';
import { ReplyDto } from '@/internal/types/reply.type';
import { HeeyAliHttpEndpointBuilder } from './builder/heey-ali-http-endpoint-builder';

/* @internal */
export class HeeyAliHttpClient {
  private _requestBuilder: HeeyAliHttpEndpointBuilder;

  constructor(readonly credential: HeeyAliCredential) {
    if(!credential.appKey || !credential.appSecret || !credential.baseUrl) {
      throw new Error('Invalid Heey Ali credential configuration, for start configure the client, you need to provide the appKey, appSecret and baseUrl');
    }
    
    this._requestBuilder = new HeeyAliHttpEndpointBuilder(credential);
  }

  async request<T>(input: HeeyAliHttpClientRequest): Promise<ReplyDto<T>> {
    const url = this._requestBuilder.build({
      method: input.endpoint,
      params: input.params,
    });
  
    const request = await fetch(url, {
      method: input.method,
    });

    const result = await request.json();

    return {
      success: true,
      data: result,
    };
  }
}
