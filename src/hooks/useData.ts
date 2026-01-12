import { CanceledError, type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

function useData<T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const controller = new AbortController();

      // Reset loading state before each new fetch
      setLoading(true);

      apiClient
        .get(endpoint, {
          params: requestConfig?.params,
          signal: controller.signal,
        })
        .then((res) => {
          setData(res.data.results);
          setError("");
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
        })
        .finally(() => {
          // React 18 runs effects twice in development.
          // The first run is cleaned up immediately, which cancels the request.
          // If we update loading state for a canceled request,
          // the loading skeleton disappears too early.
          // So we skip setting loading=false when the request was aborted.
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, loading };
}

export default useData;
