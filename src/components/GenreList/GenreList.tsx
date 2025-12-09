import useGenres from "../../hooks/useGenres";
import GenreListItem from "../GenreListItem/GenreListItem";

function GenreList() {
  const { genres, error, loading } = useGenres();

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading</p>;

  return (
    <ul>
      {genres.map((genre) => (
        <GenreListItem key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}

export default GenreList;
