import type { Genre } from "../types";
import useData from "./useData";

function useGenres() {
  return useData<Genre>("genres");
}

export default useGenres;
