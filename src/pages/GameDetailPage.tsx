import DOMPurify from "dompurify";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import styles from "../App.module.css";

function GameDetailPage() {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading page.</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  const cleanDescription = DOMPurify.sanitize(game.description, {
    USE_PROFILES: { html: true },
  });

  return (
    <>
      <h2>{game.name}</h2>
      <div
        className={styles["game-description"]}
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
    </>
  );
}

export default GameDetailPage;
