import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3000",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  const headers = { Authorization: `Bearer ${token}` };
  config.headers = headers;

  return config;
});

export default httpClient;
