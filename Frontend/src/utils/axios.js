import Axios from "axios";
import { getState } from "@/store/user.store";

const axios = Axios.create({ baseURL: "http://localhost:8000" });

axios.interceptors.request.use((config) => {
  const userStorage = JSON.parse(window.sessionStorage.getItem("user-storage"));
  const accessToken = userStorage.state.accessToken;
  config.headers.Authorization = "Bearer " + accessToken;

  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (
      !originalConfig.url.includes("/auth/login") &&
      !originalConfig.url.includes("/auth/signup") &&
      err.response
    ) {
      // Access Token has expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const userState = getState();

          const token = userState.refreshToken;
          const response = await axios.post("/auth/refreshToken", {
            token: token,
          });

          const { accessToken, refreshedToken } = response.data;
          originalConfig.headers.Authorization = "Bearer " + accessToken;
          userState.setTokens(accessToken, refreshedToken);

          return axios(originalConfig);
        } catch (_error) {
          const userState = getState();
          userState.resetUser();

          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
