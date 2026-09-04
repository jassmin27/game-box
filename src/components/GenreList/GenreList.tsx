import useGenres from "../../hooks/useGenres";
import type { Genre } from "../../types";
import GenreListItem from "../GenreListItem/GenreListItem";
import useGameQueryStore from "../../store";
import styles from "./GenreList.module.css";

const placeholderGenre: Genre = {
  id: 0,
  name: "",
  image_background: "",
};

interface Props {
  horizontal?: boolean;
}

function GenreList({ horizontal = false }: Props) {
  const { data, error, isLoading } = useGenres();
  const selectedGenreId = useGameQueryStore(s => s.gameQuery.genreId);

  if (error) return <p>{error.message}</p>;

  return (
    <ul className={horizontal ? styles.horizontal : ""}>
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <GenreListItem
              key={i}
              genre={placeholderGenre}
              loading
            />
          ))
        : data?.results.map((genre) => (
            <GenreListItem
              key={genre.id}
              genre={genre}
              active={selectedGenreId === genre.id}
            />
          ))}
    </ul>
  );
}

export default GenreList;
