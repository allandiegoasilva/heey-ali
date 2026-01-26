import { HeeyAliGenericError } from './heey-ali-generic-error.type';

export type ReplyDto<T = void> = {
  code: number;
  success: boolean;
  data?: T | HeeyAliGenericError;
};
