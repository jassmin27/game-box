import { useEffect, useState } from "react";
import type { Platform } from "../types";
import apiClient from "../services/api-client";

function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    apiClient
      .get("platforms/lists/parents")
      .then((res) => setPlatforms(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { platforms, error, loading };
}

export default usePlatforms;
