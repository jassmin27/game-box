import type { Game } from "../../types";
import GameCard from "../GameCard/GameCard";
import styles from "./GameGrid.module.css";

interface Props {
  games: Game[];
  isLoading: boolean;
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

function GameGrid({ games, isLoading }: Props) {
  return (
    <div className={styles["game-grid"]}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <GameCard key={i} game={placeholderGame} loading />
          ))
        : games?.map((game) => <GameCard key={game.id} game={game} />)}
    </div>
  );
}

export default GameGrid;
