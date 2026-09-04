import { create } from "zustand";
import type { GameQuery } from "./types";

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (genreId: number | null) => void;
  setPlatformId: (platformId: number | null) => void;
  setSortOrder: (sortOrder: string | null) => void;
  setSearchText: (searchText: string | null) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {
    genreId: null,
    platformId: null,
    sortOrder: null,
    searchText: null,
  },

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

  setSearchText: (searchText) =>
    set(() => ({
      gameQuery: {
        genreId: null,
        platformId: null,
        sortOrder: null,
        searchText,
      },
    })),
}));

export default useGameQueryStore;
