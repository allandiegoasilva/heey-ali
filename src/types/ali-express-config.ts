import { HttpMethod } from '@/enums/http-method';

export type AliExpressConfig = {
  method: HttpMethod;
  endpoint: string;
  params: Record<string, string>;
};
