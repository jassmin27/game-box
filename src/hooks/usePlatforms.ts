import APIClient from "../services/api-client";
import type { Platform } from "../types";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Platform>('platforms/lists/parents');

function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24 hrs
  });
}

export default usePlatforms;
