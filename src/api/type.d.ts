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

type AllTaskStatus = {
  statusId: number;
  statusName: string;
};

type SearchParamsType = {
  pageIndex?: number;
  pageSize?: number;
  taskCode?: string;
  status?: string;
  isRepair?: boolean;
  totalCount?: string;
};

type TaskStatusTypeEntityType = {
  statusId: number;
  statusName: string;
};

type TaskType = {
  typeId: number;
  typeName: string;
  type: number;
};

type CurrentPageRecordsType = {
  addr?: string;
  assignorId?: number;
  createTime?: string;
  createType?: number;
  desc?: string;
  expect?: null;
  innerCode?: string;
  productTypeId?: number;
  regionId?: string;
  taskCode?: string;
  taskId?: string;
  taskStatus?: number;
  taskStatusTypeEntity?: TaskStatusTypeEntityType;
  taskType?: TaskType;
  updateTime?: string;
  userId?: number;
  userName?: string;
};

type SearchRes = {
  currentPageRecords: CurrentPageRecordsType[];
  pageIndex: string;
  pageSize: string;
  totalCount: string;
  totalPage: string;
};
