import { useCallback, useSyncExternalStore } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ESSENTIAL_QUERIES = ["games", "game", "genres", "platforms"];

function isAvailabilityError(error: unknown): boolean {
  if (!axios.isAxiosError(error) || axios.isCancel(error)) {
    return false;
  }

  // Network failures and timeouts
  if (!error.response) {
    return true;
  }

  // Server errors, including 522
  return error.response.status >= 500;
}

function useLiveDataUnavailable() {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const subscribe = useCallback(
    (notify: () => void) => queryCache.subscribe(notify),
    [queryCache],
  );

  const getSnapshot = useCallback(
    () =>
      queryCache.getAll().some((query) => {
        const [queryType, mode] = query.queryKey;

        return (
          ESSENTIAL_QUERIES.includes(String(queryType)) &&
          mode === "live" &&
          query.getObserversCount() > 0 &&
          query.state.status === "error" &&
          isAvailabilityError(query.state.error)
        );
      }),
    [queryCache],
  );

  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useLiveDataUnavailable;
