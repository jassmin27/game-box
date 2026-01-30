import type { GameQuery } from "../../types";
import usePlatform from "../../hooks/usePlatform";
import useGenre from "../../hooks/useGenre";
import styles from "./GameHeading.module.css";

interface Props {
  gameQuery: GameQuery;
}

function GameHeading({ gameQuery }: Props) {
  const selectedGenre = useGenre(gameQuery.genreId);
  const selectedPlatform = usePlatform(gameQuery.platformId);

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;
  return <h1 className={styles["game-heading"]}>{heading}</h1>;
}

export default GameHeading;
