import axios from "axios";
import { getCookie } from "../services/cookie";

const axiosInstance = axios.create({
  baseURL:
    /* process.env.REACT_APP_API_BASE_URL || */ "http://localhost:3001/api/v1/",
  timeout: 45 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let customError;

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          customError = new Error(data.message || "Unauthorized access");
          customError.code = "UNAUTHORIZED";
          break;
        case 400:
          customError = new Error(data.message || "Bad request");
          customError.code = "BAD_REQUEST";
          break;
        default:
          customError = new Error(data.message || "An error occurred");
          customError.code = "API_ERROR";
      }
    } else if (error.request) {
      customError = new Error("Network error. Please check your connection.");
      customError.code = "NETWORK_ERROR";
    } else {
      customError = new Error(error.message || "Unexpected error occurred");
      customError.code = "UNEXPECTED_ERROR";
    }

    customError.originalError = error;

    return Promise.reject(customError);
  }
);

export default axiosInstance;
