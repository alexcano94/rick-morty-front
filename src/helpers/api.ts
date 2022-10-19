import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers!.authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;