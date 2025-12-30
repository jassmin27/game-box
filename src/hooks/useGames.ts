import type { Game, GameQuery } from "../types";
import useData from "./useData";

function useGames(gameQuery: GameQuery) {
  return useData<Game>(
    "games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platformId,
        ordering: gameQuery.sortOrder,
      },
    },
    [gameQuery]
  );
}

export default useGames;
