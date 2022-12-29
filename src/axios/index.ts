import router from "@/router";
import { getToken } from "@/utils";
import { Message } from "@arco-design/web-react";
import axios from "axios";
import { CreateAxiosOptions } from "./type";

const baseURL = "http://likede2-admin.itheima.net/likede/api/";

const defaultOpts: CreateAxiosOptions = {
  baseURL,
  requestOptions: {
    withToken: true,
  },
};

const instance = axios.create(defaultOpts);

instance.interceptors.request.use(
  (config: CreateAxiosOptions) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = getToken();

    if (token && config.requestOptions?.withToken !== false) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Message.error(error.response.data + "，请重新登录");
      router.navigate("/login");
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { instance };
