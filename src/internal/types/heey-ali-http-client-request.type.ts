import { HttpMethod } from '@/internal/enum/http-method';
import { EndpointPrefix } from '../enum/endpoint-prefix';

/* @internal */
export type HeeyAliHttpClientRequest = {
  method: HttpMethod;
  prefix: EndpointPrefix;
  endpoint: string;
  params?: Record<string, string>;
};
