import Cookie from "js-cookie";

export const setToken = (token: string) => {
  Cookie.set("token", token);
};

export const getToken = () => {
  return Cookie.get("token");
};

export const setUserInfo = (data: string) => {
  Cookie.set("userInfo", data);
};

export const getUserInfo = () => {
  return Cookie.get("userInfo");
};

export const logout = () => {
  Cookie.remove("token");
  Cookie.remove("userInfo");
};

export const setCookieValue = (name: string, value: string) => {
  return Cookie.set(name, value);
};

export const getCookieValue = (name: string) => {
  return Cookie.get(name);
};
