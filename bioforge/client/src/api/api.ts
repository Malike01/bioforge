import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "@/store/authStore";

export interface ApiErrorResponse {
  status: number;
  code: string; // 'BIO_VALIDATION_ERROR', 'AUTH_ERROR'
  message: string;
  details?: Record<string, any>;
}

export class BioServiceError extends Error {
  public status: number;
  public code: string;
  public details?: Record<string, any>;

  constructor(error: ApiErrorResponse) {
    super(error.message);
    this.name = "BioServiceError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

// 2. Axios Instanc
const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.detail || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(new Error(message));
  },
);
