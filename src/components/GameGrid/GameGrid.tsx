import type { Game } from "../../types";
import GameCard from "../GameCard/GameCard";
import styles from "./GameGrid.module.css";

interface Props {
  games: Game[];
}

function GameGrid({ games }: Props) {
  return (
    <div className={styles["game-grid"]}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GameGrid;
