export interface Result<T = any> {
  code: number | string;
  count: number;
  message: string | undefined;
  data: T;
}

type LoginType = {
  clientToken: state.code;
  code: string;
  loginName: string;
  loginType: number;
  password: string;
};
