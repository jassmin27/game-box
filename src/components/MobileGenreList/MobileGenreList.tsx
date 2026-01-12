import type { GameQuery, Genre } from "../../types";
import GenreList from "../GenreList/GenreList";
import styles from "./MobileGenreList.module.css";

interface Props {
  gameQuery: GameQuery;
  onGenreSelect: (genre: Genre) => void;
}
function MobileGenreList({ gameQuery, onGenreSelect }: Props) {
  return (
    <div className={styles["mobile-genre-list"]}>
      <h2>Genres</h2>
      <GenreList
        horizontal
        gameQuery={gameQuery}
        onGenreSelect={onGenreSelect}
      />
    </div>
  );
}

export default MobileGenreList;
