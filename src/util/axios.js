import axios from "axios";

const instance = axios.create({
  // baseURL: "http://15.164.228.215:8080",
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Content-type"] = "application/json";
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
