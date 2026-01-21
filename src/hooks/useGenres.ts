import type { Genre, FetchResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<FetchResponse<Genre>>("genres").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hrs
  });
}

export default useGenres;
