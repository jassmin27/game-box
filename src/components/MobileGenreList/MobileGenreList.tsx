import GenreList from "../GenreList/GenreList";
import styles from "./MobileGenreList.module.css";

function MobileGenreList() {
  return (
    <div className={styles["mobile-genre-list"]}>
      <h2>Genres</h2>
      <GenreList horizontal />
    </div>
  );
}

export default MobileGenreList;
