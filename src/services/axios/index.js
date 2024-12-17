import axios from "axios";
import { BASE_URL } from "../../consts";

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  const headers = { Authorization: `Bearer ${token}` };
  config.headers = headers;

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config.url !== '/auth/login' && error.response.status === 401) {
      const user = localStorage.getItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (user && user.role.name === "ADMIN") {
        window.location.href = "/dashboard/login";
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
