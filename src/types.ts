export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

// Fields are required and nullable by design.
// `null` represents an explicit "no filter / cleared" state.
// Optional fields or sentinel values (e.g. 0) are avoided
// to keep UI state and API queries predictable.
export interface GameQuery {
  genreId: number | null;
  platformId: number | null;  // maps cleanly to a selected platform or a cleared state
  sortOrder: string | null;
  searchText: string | null;
}

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

export interface PlatformOption {
  value: number;
  label: string;
  slug: string;
}

export interface SortOption {
  value: string;
  label: string;
}
