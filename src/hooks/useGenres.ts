import { useEffect, useState } from "react";
import type { Genre } from "../types";
import apiClient from "../services/api-client";

function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    apiClient
      .get("genres")
      .then((res) => setGenres(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { genres, error, loading };
}

export default useGenres;
