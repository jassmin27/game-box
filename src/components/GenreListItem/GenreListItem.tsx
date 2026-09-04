import type { Genre } from "../../types";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GenreListItem.module.css";
import Skeleton from "react-loading-skeleton";
import useGameQueryStore from "../../store";

interface Props {
  genre: Genre;
  loading?: boolean;
  active?: boolean;
}

function GenreListItem({ genre, loading = false, active = false }: Props) {
  const setGenreId = useGameQueryStore((s) => s.setGenreId);

  return (
    <li className={styles["genre-item"]}>
      <button
        type="button"
        className={styles["genre-button"]}
        onClick={() => setGenreId(genre.id)}
        disabled={loading}
      >
        {loading ? (
          <>
            <Skeleton width={40} height={40} />
            <div className={styles["genre-text"]}>
              <Skeleton height={10} />
            </div>
          </>
        ) : (
          <>
            <img
              alt={genre.name}
              src={getCroppedImageURL(genre.image_background)}
            />
            <span
              className={`${styles["genre-text"]} ${
                active ? styles.active : ""
              }`}
            >
              {genre.name}
            </span>
          </>
        )}
      </button>
    </li>
  );
}

export default GenreListItem;
