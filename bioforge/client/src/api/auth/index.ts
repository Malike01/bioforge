import type { LoginCredentials, LoginResponse } from "@/types/auth";
import { apiClient } from "../api";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const formData = new FormData();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }, // Override default JSON
      },
    );

    return response.data;
  },
};
