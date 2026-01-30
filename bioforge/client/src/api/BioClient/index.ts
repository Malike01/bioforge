import type { AxiosResponse } from "axios";
import { apiClient } from "../api";
import type { BioComponent } from "../../types/bio";

const request = async <T>(promise: Promise<AxiosResponse<T>>): Promise<T> => {
  const response = await promise;
  return response.data;
};

// 6. API Functions
export const bioApi = {
  getParts: () => request<BioComponent[]>(apiClient.get("/api/v1/parts")),

  validateDesign: (designData: any) =>
    request<any>(apiClient.post("/api/v1/design/validate", designData)),

  runSimulation: (simConfig: any) =>
    request<any>(apiClient.post("/api/v1/simulation/run", simConfig)),

  getPartById: (id: string) =>
    request<BioComponent>(apiClient.get(`/api/v1/parts/${id}`)),
};
