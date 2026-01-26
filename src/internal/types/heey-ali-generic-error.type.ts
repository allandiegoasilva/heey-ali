import { ErrorType } from '../enum/error-type';

export type HeeyAliGenericError = {
  code: string;
  type: ErrorType;
  message: string;
  request_id: string;
  _trace_id_: string;
};
