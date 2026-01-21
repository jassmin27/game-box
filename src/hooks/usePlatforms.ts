import apiClient from "../services/api-client";
import type { FetchResponse, Platform } from "../types";
import { useQuery } from "@tanstack/react-query";

function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Platform>>("platforms/lists/parents")
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hrs
  });
}

export default usePlatforms;
