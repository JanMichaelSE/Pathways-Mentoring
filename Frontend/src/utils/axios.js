import Axios from "axios";

const axios = Axios.create({ baseURL: "http://localhost:5000" });

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
          let userStorage = JSON.parse(
            window.sessionStorage.getItem("user-storage")
          );

          const token = userStorage.state.refreshToken;
          const response = await axios.post("/auth/refreshToken", {
            token: token,
          });

          const { accessToken, refreshedToken } = response.data;
          originalConfig.headers.Authorization = "Bearer " + accessToken;
          userStorage.state.accessToken = accessToken;
          userStorage.state.refreshToken = refreshedToken;

          window.sessionStorage.setItem(
            "user-storage",
            JSON.stringify(userStorage)
          );

          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  }
);

export default axios;
