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
  parent_platforms: Platform[];
  metacritic: number;
  rating_top: number;
}

export interface GameQuery {
  genre: string;
  platform: string;
  sortOrder: string;
}
