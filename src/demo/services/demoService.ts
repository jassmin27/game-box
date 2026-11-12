import type {
  Game,
  GameDetail,
  FetchResponse,
  Genre,
  Platform,
} from "../../types";
import type { DemoGame } from "../types";
import { demoGames } from "../data/games";
import { demoGenres } from "../data/genres";
import { demoPlatforms } from "../data/platforms";

function paginateGames(
  games: Game[],
  page: number,
  pageSize: number,
): Promise<FetchResponse<Game>> {
  return Promise.resolve({
    count: games.length,
    results: games.slice(pageSize * (page - 1), pageSize * page),
    next:
      pageSize * page < games.length
        ? `https://demo.gamebox.local/games?page=${page + 1}`
        : null,
  });
}

export function getAllGames(
  page = 1,
  pageSize = 20,
  searchText: string | null = null,
  sortOrder: string | null = null,
  genreId: number | null = null,
  platformId: number | null = null,
): Promise<FetchResponse<Game>> {
  // Search is independent of genre, platform and sorting.
  const search = searchText?.trim().toLowerCase();

  if (search) {
    const searchResults = demoGames.filter((game) =>
      game.name.toLowerCase().includes(search),
    );

    return paginateGames(searchResults, page, pageSize);
  }

  // Filter games by genre.
  const gamesByGenre = genreId
    ? demoGames.filter((game) => game.genres.includes(genreId))
    : demoGames;

  // Filter games by platform.
  const gamesByPlatform = platformId
    ? gamesByGenre.filter((game) =>
        game.parent_platforms?.some(
          ({ platform }) => platform.id === platformId,
        ),
      )
    : gamesByGenre;

  // Sort the filtered games.
  const sortedGames: DemoGame[] = [...gamesByPlatform];

  switch (sortOrder) {
    case "name":
      sortedGames.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "-added":
      sortedGames.sort((a, b) => b.added - a.added);
      break;

    case "-released":
      sortedGames.sort((a, b) => b.released.localeCompare(a.released));
      break;

    case "-metacritic":
      sortedGames.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
      break;

    case "-rating":
      sortedGames.sort((a, b) => b.rating - a.rating);
      break;
  }

  return paginateGames(sortedGames, page, pageSize);
}

export function getGameBySlug(slug: string): Promise<GameDetail> {
  const game = demoGames.find((game) => game.slug === slug);

  if (!game) {
    return Promise.reject(new Error("Game not found"));
  }

  return Promise.resolve({
    ...game,
    genres: demoGenres.filter((genre) => game.genres.includes(genre.id)),
  });
}

export function getAllGenres(): Promise<FetchResponse<Genre>> {
  return Promise.resolve({
    count: demoGenres.length,
    results: demoGenres,
    next: null,
  });
}

export function getAllPlatforms(): Promise<FetchResponse<Platform>> {
  return Promise.resolve({
    count: demoPlatforms.length,
    results: demoPlatforms,
    next: null,
  });
}
