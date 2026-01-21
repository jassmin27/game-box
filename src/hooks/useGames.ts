import apiClient from "../services/api-client";
import type { FetchResponse, Game, GameQuery } from "../types";
import { useQuery } from "@tanstack/react-query";

function useGames(gameQuery: GameQuery) {
  return useQuery({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data),
  });
}

export default useGames;
