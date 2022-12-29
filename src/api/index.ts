import { instance as api } from "@/axios/index";
import {
  CollectReportResponse,
  LoginResponseType,
  LoginType,
  Result,
  TopValueRes,
} from "./type";

enum API {
  getCheckCode = "user-service/user/imageCode/",
  login = "user-service/user/login",
  collectReport = "task-service/task/taskReportInfo",
  orderCount = "order-service/report/orderCount", //获取一定时间范围之内的订单总数
  orderAmount = "order-service/report/orderAmount", //获取一定时间范围之内的收入
  topValue = "order-service/report/skuTop", //获取销售前几的商品
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
