import APIClient from "../services/api-client";
import type { Genre } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../demo/services/demoService";
import { useDataMode } from "./useDataMode";

const apiClient = new APIClient<Genre>("genres");

function useGenres() {
  const { dataMode } = useDataMode();

  return useQuery({
    queryKey: ["genres", dataMode],
    networkMode: dataMode === "demo" ? "always" : "online",
    queryFn: ({ signal }) =>
      dataMode === "demo" ? getAllGenres() : apiClient.getAll({ signal }),
  });
}

export default useGenres;
