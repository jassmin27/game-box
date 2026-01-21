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

interface Props {
  gameQuery: GameQuery;
}

function GameContainer({ gameQuery }: Props) {
  // Using `isPending` instead of `isLoading` so skeletons show on both initial load and refetches
  const { data, error, isPending } = useGames(gameQuery);

  if (error) return <p>{error.message}</p>;

  return <GameGrid games={data?.results ?? []} isLoading={isPending}/>;
}

export default GameContainer;
