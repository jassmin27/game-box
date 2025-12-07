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
  const { games, error, loading } = useGames(gameQuery);

  if (error) return <p>{error}</p>;
  if (!loading && games.length === 0) return <p>No games found.</p>;

  return <GameGrid games={games} loading={loading}/>;
}

export default GameContainer;
