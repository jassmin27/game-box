import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import type { Game, GameQuery } from "../types";

function useGames(gameQuery: GameQuery) {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state before each new fetch
    setLoading(true);

    const params: any = {};
    if (gameQuery.genre) {
      params.genres = gameQuery.genre.id;
    }
    if (gameQuery.platformId) {
      params.parent_platforms = gameQuery.platformId;
    }
    if (gameQuery.sortOrder) {
      params.ordering = gameQuery.sortOrder;
    }

    apiClient
      .get("games", {
        params: params,
      })
      .then((res) => {
        setGames(res.data.results);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [gameQuery]);

  return { games, error, loading };
}

export default useGames;
