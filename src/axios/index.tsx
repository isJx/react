import axios from "axios";

const baseURL = "https://likede2-java.itheima.net";

const instance = axios.create({
  baseURL,
});

export { instance };
