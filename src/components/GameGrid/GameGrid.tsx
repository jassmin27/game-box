import type { Game } from "../../types";
import GameCard from "../GameCard/GameCard";
import styles from "./GameGrid.module.css";

interface Props {
  games: Game[];
  showSkeletons: boolean;
}

const placeholderGame: Game = {
  id: 0,
  slug: "",
  name: "",
  background_image: "",
  parent_platforms: [],
  metacritic: 0,
  rating_top: 0,
};

function GameGrid({ games, showSkeletons }: Props) {
  return (
    <div
      className={styles["game-grid"]}
      role={showSkeletons ? "status" : undefined}
      aria-label={showSkeletons ? "Loading games" : undefined}
    >
      {showSkeletons
        ? Array.from({ length: 12 }).map((_, i) => (
            <GameCard key={i} game={placeholderGame} loading />
          ))
        : games?.map((game, index) => (
            <GameCard key={game.id} game={game} priority={index === 0} />
          ))}
    </div>
  );
}

export default GameGrid;
