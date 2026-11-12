import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FiInfo, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router";

import { useDataMode } from "../../hooks/useDataMode";
import useLiveDataUnavailable from "../../hooks/useLiveDataUnavailable";
import APIClient from "../../services/api-client";
import type { Game } from "../../types";
import useGameQueryStore from "../../store";

import styles from "./DataModeBanner.module.css";

const apiClient = new APIClient<Game>("games");

function DataModeBanner() {
  const { dataMode, setDataMode } = useDataMode();
  const liveDataUnavailable = useLiveDataUnavailable();
  const queryClient = useQueryClient();

  const [isRetrying, setIsRetrying] = useState(false);

  const navigate = useNavigate();
  const resetGameQuery = useGameQueryStore((s) => s.resetGameQuery);

  useEffect(() => {
    if (dataMode === "live" && liveDataUnavailable) {
      setDataMode("demo");
    }
  }, [dataMode, liveDataUnavailable, setDataMode]);

  const handleTryLiveMode = async () => {
    if (isRetrying) return;

    setIsRetrying(true);

    try {
      await apiClient.getAll({
        params: {
          page: 1,
          page_size: 1,
        },
      });

      // Clear previous live errors before switching back.
      await queryClient.resetQueries({
        predicate: (query) => {
          const [queryType, mode] = query.queryKey;

          return (
            mode === "live" &&
            ["games", "game", "genres", "platforms"].includes(String(queryType))
          );
        },
      });

      resetGameQuery();
      navigate("/");
      setDataMode("live");
    } catch {
      // Stay in Demo Mode and restore the original message.
    } finally {
      setIsRetrying(false);
    }
  };

  if (dataMode !== "demo") {
    return null;
  }

  return (
    <div className={styles.banner} role="status">
      <div className={styles.message} aria-live="polite">
        {isRetrying ? (
          <>
            <FiLoader aria-hidden="true" className={styles.loadingIcon} />
            <p>Retrying live connection</p>
          </>
        ) : (
          <>
            <FiInfo aria-hidden="true" />
            <p>
              <strong>Demo Mode: </strong>
              Showing sample games while live data is unavailable.
            </p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleTryLiveMode}
          aria-busy={isRetrying}
          className={isRetrying ? styles.hiddenButton : undefined}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default DataModeBanner;
