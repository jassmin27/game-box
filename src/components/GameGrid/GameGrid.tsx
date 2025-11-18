import type { Game } from "../../types";
import styles from "./GameGrid.module.css";

interface Props {
  games: Game[];
}

function GameGrid({ games }: Props) {
  return (
    <div className={styles["game-grid"]}>
      {games.map((game) => (
        <div key={game.id} className={styles["game-card"]}>
          <img src={game.background_image} alt={game.name} />
          <div className={styles["game-card__info"]}>
            <div className={styles["game-card__header"]}>
              <div>
                {game.parent_platforms.map((platform) => (
                  <span key={platform.platform.id}>
                    {platform.platform.name}
                  </span>
                ))}
              </div>
            </div>
            <h3 className={styles["game-card__title"]}>{game.name}</h3>
            <p className={styles["game-card__status"]}>Status</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameGrid;
