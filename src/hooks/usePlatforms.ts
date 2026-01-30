import ms from "ms";
import APIClient from "../services/api-client";
import type { Platform } from "../types";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Platform>("platforms/lists/parents");

function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
}

export default usePlatforms;
