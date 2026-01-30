import useGenres from "./useGenres";

function useGenre(id: number | null) {
  const { data: genres } = useGenres();
  return genres?.results.find(genre => genre.id === id);
}

export default useGenre;
