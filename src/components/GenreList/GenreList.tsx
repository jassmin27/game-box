import useGenres from "../../hooks/useGenres";

function GenreList() {
  const { genres, error, loading } = useGenres();

  if(error) return <p>{error}</p>
  if(loading) return <p>Loading</p>
  
  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
}

export default GenreList;
