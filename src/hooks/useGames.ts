import APIClient from "../services/api-client";
import type { Game, GameQuery } from "../types";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Game>("games");

function useGames(gameQuery: GameQuery) {
  return useQuery({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      }),
  });
}

export default useGames;
