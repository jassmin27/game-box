import APIClient from "../services/api-client";
import type { GameDetail } from "../types";
import { skipToken, useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<GameDetail>("games");

function useGame(slug: string | undefined) {
  return useQuery({
    queryKey: ["games", slug],
    queryFn: slug ? ({ signal }) => apiClient.get(slug, { signal }) : skipToken,
  });
}

export default useGame;
