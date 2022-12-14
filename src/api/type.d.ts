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

type CollectReportResponse = {
  cancelTotal: number;
  completedTotal: number;
  date: null;
  progressTotal: null;
  repair: boolean;
  total: number;
  workerCount: number;
};

type TopValueRes = {
  amount: number;
  count: number;
  skuId: string;
  skuName: string;
};

type AmountCollectRes = {
  series: number[];
  xAxis: string[];
};

type NodeCollectRes = {
  name: string;
  value: number;
};
