import APIClient from "../services/api-client";
import type { Game, GameQuery } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllGames as getDemoGames } from "../demo/services/demoService";
import { useDataMode } from "./useDataMode";

const apiClient = new APIClient<Game>("games");

function getPageFromUrl(url: string | null) {
  if (!url) return undefined;

  const params = new URL(url).searchParams;
  const page = params.get("page");
  return page ? parseInt(page, 10) : undefined;
}

function useGames(gameQuery: GameQuery, searchText: string | null) {
  const { dataMode } = useDataMode();
  const pageSize = dataMode === "demo" ? 8 : 20;

  return useInfiniteQuery({
    queryKey: ["games", dataMode, gameQuery, searchText],
    networkMode: dataMode === "demo" ? "always" : "online",
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      dataMode === "demo"
        ? getDemoGames(
            pageParam,
            pageSize,
            searchText,
            gameQuery.sortOrder,
            gameQuery.genreId,
            gameQuery.platformId,
          )
        : apiClient.getAll({
            signal,
            params: {
              page: pageParam,
              page_size: pageSize,
              genres: searchText ? undefined : gameQuery.genreId,
              parent_platforms: searchText ? undefined : gameQuery.platformId,
              ordering: searchText ? undefined : gameQuery.sortOrder,
              search: searchText || undefined,
            },
          }),
    getNextPageParam: (lastPage) => getPageFromUrl(lastPage.next),
  });
}

export default useGames;
