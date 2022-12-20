export interface Result<T = any> {
  code: number | string;
  count: number;
  message: string | undefined;
  data: T;
}

type LoginType = {
  clientToken: number;
  code: string;
  loginName: string;
  loginType: number;
  password: string;
};

type LoginResponseType = {
  userId: number | null;
  userName: string | null;
  roleCode: string | null;
  token: string | null;
  success: boolean;
  regionId: string | null;
  msg: string;
  repair: boolean;
};
