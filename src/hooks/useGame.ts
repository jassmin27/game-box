import APIClient from "../services/api-client";
import type { GameDetail } from "../types";
import { skipToken, useQuery } from "@tanstack/react-query";
import { getGameBySlug } from "../demo/services/demoService";
import { useDataMode } from "./useDataMode";

const apiClient = new APIClient<GameDetail>("games");

function useGame(slug: string | undefined) {
  const { dataMode } = useDataMode();

  return useQuery({
    queryKey: ["game", dataMode, slug],
    networkMode: dataMode === "demo" ? "always" : "online",
    queryFn: slug
      ? ({ signal }) =>
          dataMode === "demo"
            ? getGameBySlug(slug)
            : apiClient.get(slug, { signal })
      : skipToken,
  });
}

export default useGame;
