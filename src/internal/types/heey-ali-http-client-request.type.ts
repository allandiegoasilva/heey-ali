import { HttpMethod } from '@/internal/enum/http-method';

/* @internal */
export type HeeyAliHttpClientRequest = {
  method: HttpMethod;
  endpoint: string;
  params: Record<string, string>;
};
