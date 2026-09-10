import type { Genre } from "../../types";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GenreListItem.module.css";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router";
import useGameQueryStore from "../../store";

interface Props {
  genre: Genre;
  loading?: boolean;
  active?: boolean;
}

function GenreListItemSkeleton() {
  return (
    <li className={`${styles["genre-item"]} ${styles["genre-item--skeleton"]}`}>
      <Skeleton width={40} height={40} borderRadius={10} />
      <div className={styles["genre-text"]}>
        <Skeleton height={10} />
      </div>
    </li>
  );
}

function GenreListItem({ genre, loading = false, active = false }: Props) {
  const navigate = useNavigate();
  const setGenreId = useGameQueryStore((s) => s.setGenreId);

  if (loading) {
    return <GenreListItemSkeleton />;
  }

  return (
    <li className={`${styles["genre-item"]} ${active ? styles.active : ""}`}>
      <button
        type="button"
        aria-pressed={active}
        className={styles["genre-button"]}
        onClick={() => {
          setGenreId(genre.id);
          navigate("/");
        }}
      >
        <img alt="" src={getCroppedImageURL(genre.image_background)} />
        <span className={styles["genre-text"]}>{genre.name}</span>
      </button>
    </li>
  );
}

export default GenreListItem;
