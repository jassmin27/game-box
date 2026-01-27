import type { GameQuery } from "../../types";
import useGenres from "../../hooks/useGenres";
import styles from "./GameHeading.module.css";
import usePlatforms from "../../hooks/usePlatforms";

interface Props {
  gameQuery: GameQuery;
}

function GameHeading({ gameQuery }: Props) {
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();

  const selectedGenre = genres?.results.find((genre) => genre.id === gameQuery.genreId);

  const selectedPlatform = platforms?.results.find((platform) => platform.id === gameQuery.platformId);

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;
  return <h1 className={styles["game-heading"]}>{heading}</h1>;
}

export default GameHeading;
