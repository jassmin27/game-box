import type { Platform } from "../types";
import useData from "./useData";

function usePlatforms() {
  return useData<Platform>("platforms/lists/parents");
}

export default usePlatforms;
