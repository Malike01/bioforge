import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

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
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<any>) => {
    let errorResponse: ApiErrorResponse = {
      status: 500,
      code: "UNKNOWN_ERROR",
      message: "An unexpected error occurred in BioForge system.",
    };

    if (error.response) {
      const { data, status } = error.response;

      errorResponse = {
        status: status,
        code: data?.code || `HTTP_${status}`,
        message: data?.detail || data?.message || error.message,
        details: data?.details || null,
      };

      if (status === 401) {
        console.warn("Session expired");
      }
    } else if (error.request) {
      errorResponse = {
        status: 0,
        code: "NETWORK_ERROR",
        message:
          "Bio-Engine is unreachable. Please check your connection or Docker containers.",
      };
    }

    return Promise.reject(new BioServiceError(errorResponse));
  },
);
