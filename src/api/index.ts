import { instance as api } from "@/axios/index";
import {
  AllTaskStatus,
  AmountCollectRes,
  CollectReportResponse,
  LoginResponseType,
  LoginType,
  NodeCollectRes,
  Result,
  SearchParamsType,
  SearchRes,
  TopValueRes,
} from "./type";

enum API {
  getCheckCode = "user-service/user/imageCode/",
  login = "user-service/user/login",
  collectReport = "task-service/task/taskReportInfo",
  orderCount = "order-service/report/orderCount", //获取一定时间范围之内的订单总数
  orderAmount = "order-service/report/orderAmount", //获取一定时间范围之内的收入
  topValue = "order-service/report/skuTop", //获取销售前几的商品
  amountCollect = "order-service/report/amountCollect", // 获取销售额统计
  regionCollect = "order-service/report/regionCollect", // 根据地区汇总销售额数据(销售量分布)
  nodeCollect = "vm-service/node/nodeCollect", // 合作商点位汇总统计
  nodeCount = "vm-service/node/count", //获取点位总数
  partnerCount = "user-service/partner/count", //获取合作商总数
  allTaskStatus = "task-service/task/allTaskStatus", // 工单状态列表
  search = "/task-service/task/search", // 工单搜索
}

export const getCheckCode = (id: number) => {
  return api.get<unknown, Result<Blob>>(`${API.getCheckCode}${id}`, {
    responseType: "blob",
    requestOptions: {
      withToken: false,
    },
  });
};

export const login = (data: LoginType) => {
  return api.post<unknown, Result<LoginResponseType>>(API.login, data, {
    requestOptions: {
      withToken: false,
    },
  });
};

export const collectReport = (start: string, end: string) => {
  return api.get<unknown, Result<CollectReportResponse[]>>(
    `${API.collectReport}/${start}/${end}`
  );
};

//获取一定时间范围之内的订单总数
export const orderCount = (start: string, end: string) => {
  return api.get<unknown, Result<string>>(API.orderCount, {
    params: { start, end },
  });
};

// 获取一定时间范围之内的收入
export const orderAmount = (start: string, end: string) => {
  return api.get<unknown, Result<string>>(API.orderAmount, {
    params: { start, end },
  });
};

export const skuTop = (topValue: number, start: string, end: string) => {
  return api.get<unknown, Result<TopValueRes[]>>(
    `${API.topValue}/${topValue}/${start}/${end}`
  );
};

export const amountCollect = (
  collectType: number,
  start: string,
  end: string
) => {
  return api.get<unknown, Result<AmountCollectRes>>(
    `${API.amountCollect}/${collectType}/${start}/${end}`
  );
};

export const regionCollect = (start: string, end: string) => {
  return api.get<unknown, Result<AmountCollectRes>>(
    `${API.regionCollect}/${start}/${end}`
  );
};

export const nodeCollect = () => {
  return api.get<unknown, Result<NodeCollectRes[]>>(API.nodeCollect);
};

export const nodeCount = () => {
  return api.get<unknown, Result<number>>(API.nodeCount);
};

export const partnerCount = () => {
  return api.get<unknown, Result<number>>(API.partnerCount);
};

export const allTaskStatus = () => {
  return api.get<unknown, Result<AllTaskStatus[]>>(API.allTaskStatus);
};

export const search = (params: SearchParamsType) => {
  return api.get<unknown, Result<SearchRes>>(API.search, {
    params,
  });
};
