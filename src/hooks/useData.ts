import type { AxiosRequestConfig } from "axios";
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
      // Reset loading state before each new fetch
      setLoading(true);

      apiClient
        .get(endpoint, {
          params: requestConfig?.params,
        })
        .then((res) => {
          setData(res.data.results);
          setError("");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },
    deps ? [...deps] : []
  );

  return { data, error, loading };
}

export default useData;
