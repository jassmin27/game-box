import { create } from "zustand";
import type { GameQuery } from "./types";

const initialGameQuery: GameQuery = {
  genreId: null,
  platformId: null,
  sortOrder: null,
};

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (genreId: number | null) => void;
  setPlatformId: (platformId: number | null) => void;
  setSortOrder: (sortOrder: string | null) => void;
  resetGameQuery: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: initialGameQuery,

  setGenreId: (genreId) =>
    set((store) => ({
      gameQuery: {
        ...store.gameQuery,
        genreId,
      },
    })),

  setPlatformId: (platformId) =>
    set((store) => ({
      gameQuery: {
        ...store.gameQuery,
        platformId,
      },
    })),

  setSortOrder: (sortOrder) =>
    set((store) => ({
      gameQuery: {
        ...store.gameQuery,
        sortOrder,
      },
    })),

  resetGameQuery: () =>
    set({
      gameQuery: { ...initialGameQuery },
    }),
}));

export default useGameQueryStore;
