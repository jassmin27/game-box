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
    <li className={styles["genre-item"]}>
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
    <li className={styles["genre-item"]}>
      <button
        type="button"
        className={styles["genre-button"]}
        onClick={() => {
          setGenreId(genre.id);
          navigate("/");
        }}
      >
        <img
          alt={genre.name}
          src={getCroppedImageURL(genre.image_background)}
        />
        <span
          className={`${styles["genre-text"]} ${active ? styles.active : ""}`}
        >
          {genre.name}
        </span>
      </button>
    </li>
  );
}

export default GenreListItem;
