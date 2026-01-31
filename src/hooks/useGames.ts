import type { Game, GameQuery } from "../types";
import useData from "./useData";

function useGames(gameQuery: GameQuery) {
  return useData<Game>(
    "games",
    {
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    },
    [gameQuery]
  );
}

export default useGames;
