import type { Genre } from "../../types";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GenreListItem.module.css";
import Skeleton from "react-loading-skeleton";

interface Props {
  genre: Genre;
  loading?: boolean;
  onGenreSelect: (genre: Genre) => void;
}

function GenreListItem({ genre, loading = false, onGenreSelect }: Props) {
  return (
    <li className={styles["genre-item"]}>
      <button
        type="button"
        className={styles["genre-button"]}
        onClick={() => onGenreSelect(genre)}
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
            <span className={styles["genre-text"]}>{genre.name}</span>
          </>
        )}
      </button>
    </li>
  );
}

export default GenreListItem;
