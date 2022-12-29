import { AxiosRequestConfig } from "axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface RequestOptions {
  withToken?: boolean;
}

declare module "axios" {
  export interface AxiosInstance<T = any> {
    _config: CreateAxiosOptions;
    post<T = unknown, R = Result, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    get<T = unknown, R = Result, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    delete<T = unknown, R = Result, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    head<T = unknown, R = Result, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    options<T = unknown, R = Result, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    put<T = unknown, R = Result, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    patch<T = unknown, R = Result, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R>;
    request<T = unknown, R = Result, D = any>(
      config: AxiosRequestConfig<D>
    ): Promise<R>;
  }
}

declare module "axios" {
  export interface AxiosRequestConfig {
    requestOptions?: RequestOptions;
  }
}
