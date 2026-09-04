import usePlatform from "../../hooks/usePlatform";
import useGenre from "../../hooks/useGenre";
import styles from "./GameHeading.module.css";
import useGameQueryStore from "../../store";

function GameHeading() {
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const selectedGenre = useGenre(selectedGenreId);

  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;
  return <h1 className={styles["game-heading"]}>{heading}</h1>;
}

export default GameHeading;
