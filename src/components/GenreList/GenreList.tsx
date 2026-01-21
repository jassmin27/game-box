import useGenres from "../../hooks/useGenres";
import type { GameQuery, Genre } from "../../types";
import GenreListItem from "../GenreListItem/GenreListItem";
import styles from "./GenreList.module.css";

const placeholderGenre: Genre = {
  id: 0,
  name: "",
  image_background: "",
};

interface Props {
  gameQuery: GameQuery;
  onGenreSelect: (genre: Genre) => void;
  horizontal?: boolean;
}

function GenreList({ gameQuery, onGenreSelect, horizontal = false }: Props) {
  // Using `isPending` instead of `isLoading` so skeletons show on both initial load and refetches
  const { data, error, isPending } = useGenres();

  if (error) return <p>{error.message}</p>;

  return (
    <ul className={horizontal ? styles.horizontal : ""}>
      {isPending
        ? Array.from({ length: 10 }).map((_, i) => (
            <GenreListItem
              key={i}
              genre={placeholderGenre}
              loading
              onGenreSelect={onGenreSelect}
            />
          ))
        : data?.results.map((genre) => (
            <GenreListItem
              key={genre.id}
              genre={genre}
              onGenreSelect={onGenreSelect}
              active={gameQuery.genre?.name === genre.name}
            />
          ))}
    </ul>
  );
}

export default GenreList;
