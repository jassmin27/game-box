import type { Genre } from "../../types";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GenreListItem.module.css";

interface Props {
  genre: Genre;
}

function GenreListItem({ genre }: Props) {
  return (
    <li className={styles["genre-item"]}>
      <img alt={genre.name} src={getCroppedImageURL(genre.image_background)} />
      {genre.name}
    </li>
  );
}

export default GenreListItem;
