import DOMPurify from "dompurify";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import styles from "../App.module.css";
import GameAttributes from "../components/GameAttributes/GameAttributes";

function GameDetailPage() {
  const { slug } = useParams();
  const { data: gameDetail, isLoading, error } = useGame(slug);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading page.</p>;
  }

  if (!gameDetail) {
    return <p>Game details not found.</p>;
  }

  const cleanDescription = DOMPurify.sanitize(gameDetail.description, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className={styles["game-detail"]}>
      <h1>{gameDetail.name}</h1>
      <div
        className={styles["game-description"]}
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
      <GameAttributes gameDetail={gameDetail} />
    </div>
  );
}

export default GameDetailPage;
