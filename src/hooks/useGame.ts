import ms from "ms";
import APIClient from "../services/api-client";
import type { GameDetail } from "../types";
import { skipToken, useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GameDetail>("games");

function useGame(slug: string | undefined) {
  return useQuery({
    queryKey: ["games", slug],
    queryFn: slug ? () => apiClient.get(slug) : skipToken,
    staleTime: ms("24h"),
  });
}

export default useGame;
