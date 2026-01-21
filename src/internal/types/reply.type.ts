export type ReplyDto<T = void> = {
  success: boolean;
  data?: T;
};
