export type ReplyDto<T = void> = {
  code: number;
  success: boolean;
  data?: T;
};
