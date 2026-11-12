import APIClient from "../services/api-client";
import type { Platform } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllPlatforms } from "../demo/services/demoService";
import { useDataMode } from "./useDataMode";

const apiClient = new APIClient<Platform>("platforms/lists/parents");

function usePlatforms() {
  const { dataMode } = useDataMode();

  return useQuery({
    queryKey: ["platforms", dataMode],
    networkMode: dataMode === "demo" ? "always" : "online",
    queryFn: ({ signal }) =>
      dataMode === "demo" ? getAllPlatforms() : apiClient.getAll({ signal }),
  });
}

export default usePlatforms;
