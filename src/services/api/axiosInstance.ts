import axios from "axios";
import { getAccessTokenFromCookie } from "../../utils/cookies";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL as string;

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessTokenFromCookie();
    
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
