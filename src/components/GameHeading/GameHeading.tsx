import usePlatform from "../../hooks/usePlatform";
import useGenre from "../../hooks/useGenre";
import styles from "./GameHeading.module.css";
import useGameQueryStore from "../../store";
import { useSearchParams } from "react-router";

function GameHeading() {
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const selectedGenre = useGenre(selectedGenreId);

  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");

  if (searchText) {
    return (
      <h1 className={styles["game-heading"]}>
        Search results for "{searchText}"
      </h1>
    );
  }

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;
  return <h1 className={styles["game-heading"]}>{heading}</h1>;
}

export default GameHeading;
