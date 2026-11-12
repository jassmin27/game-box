import type { GameDetail } from "../types";

// In Demo Mode, all game data is stored in one place, so a single type
// contains everything needed for both game cards and game details.
// GameDetail already includes all Game properties, so it's reused here.
// Omit excludes the original genres property, allowing it to be replaced
// with an array of genre IDs for easier filtering.
// Additional properties are included to support sorting.
export interface DemoGame extends Omit<GameDetail, "genres"> {
  genres: number[];
  added: number;
  released: string;
  rating: number;
}
