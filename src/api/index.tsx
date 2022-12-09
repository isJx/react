import { instance as api } from "@/axios/index";
import { LoginType, Result } from "./type";

enum API {
  getCheckCode = "/api/user-service/user/imageCode/",
  login = "/api/user-service/user/login",
}

export const getCheckCode = (id: number) => {
  return api.get<unknown, Result<Blob>>(`${API.getCheckCode}${id}`, {
    responseType: "blob",
  });
};

export const login = (data: LoginType) => {
  return api.post(API.login, data);
};
