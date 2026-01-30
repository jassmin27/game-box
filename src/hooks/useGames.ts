import ms from "ms";
import APIClient from "../services/api-client";
import type { Game, GameQuery } from "../types";
import { useInfiniteQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Game>("games");

function getPageFromUrl(url: string | null) {
  if (!url) return undefined;

  const params = new URL(url).searchParams;
  const page = params.get("page");
  return page ? parseInt(page) : undefined;
}

function useGames(gameQuery: GameQuery) {
  return useInfiniteQuery({
    queryKey: ["games", gameQuery],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
          page_size: 20,
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      }),
    getNextPageParam: (lastPage) => getPageFromUrl(lastPage.next),
    staleTime: ms("24h"),
  });
}

export default useGames;
