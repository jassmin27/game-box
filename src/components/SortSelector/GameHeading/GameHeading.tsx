import type { GameQuery } from "../../../types";
import styles from "./GameHeading.module.css";

interface Props {
  gameQuery: GameQuery;
}

function GameHeading({ gameQuery }: Props) {
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  }  Games`;
  return <h1 className={styles["game-heading"]}>{heading}</h1>;
}

export default GameHeading;
