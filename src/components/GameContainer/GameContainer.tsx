/* 
  GameContainer is a smart/container component.
  - Reads the current gameQuery from the Zustand store.
  - Uses useGames hook to fetch games based on the query.
  - Handles loading and error states.
  - Passes the fetched games to GameGrid (presentational component) for rendering.
*/
import { useSearchParams } from "react-router";
import useGames from "../../hooks/useGames";
import useGameQueryStore from "../../store";
import GameGrid from "../GameGrid/GameGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./GameContainer.module.css";

function GameContainer() {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  const {
    data,
    isPending,
    isSuccess,
    isLoadingError,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGames(gameQuery, searchText);

  if (isLoadingError)
    return (
      <div className={styles.error}>
        <ErrorMessage
          message="Unable to load games."
          onRetry={() => refetch()}
        />
      </div>
    );

  const games = data?.pages.flatMap((page) => page.results) ?? [];

  if (isSuccess && games.length === 0) {
    return <p>No games found.</p>;
  }

  return (
    <>
      <GameGrid games={games} showSkeletons={isPending} />

      {hasNextPage && (
        <div className={styles["load-more-wrapper"]}>
          {isFetchNextPageError && !isFetchingNextPage && (
            <ErrorMessage message="Unable to load more games." />
          )}

          <button
            type="button"
            className={styles["load-more-btn"]}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading..."
              : isFetchNextPageError
                ? "Retry Loading More"
                : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}

export default GameContainer;
