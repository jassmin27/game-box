/* 
  GameContainer is a smart/container component.
  - Receives the current gameQuery from App.
  - Uses useGames hook to fetch games based on the query.
  - Handles loading and error states.
  - Passes the fetched games to GameGrid (presentational component) for rendering.
*/

import useGames from "../../hooks/useGames";
import type { GameQuery } from "../../types";
import GameGrid from "../GameGrid/GameGrid";
import styles from "./GameContainer.module.css";

interface Props {
  gameQuery: GameQuery;
}

function GameContainer({ gameQuery }: Props) {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGames(gameQuery);

  if (error) return <p>{error.message}</p>;

  const games = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <>
      <GameGrid games={games} isLoading={isLoading} />
      {hasNextPage && (
        <div className={styles["load-more-wrapper"]}>
          <button
            className={styles["load-more-btn"]}
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}

export default GameContainer;
