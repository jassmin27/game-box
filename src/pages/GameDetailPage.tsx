import DOMPurify from "dompurify";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import styles from "./GameDetailPage.module.css";
import GameAttributes from "../components/GameAttributes/GameAttributes";
import noImage from "../assets/no-image-placeholder.webp";

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
      <div className={styles["game-detail__content"]}>
        <h1>{gameDetail.name}</h1>

        <div
          className={styles["game-description"]}
          dangerouslySetInnerHTML={{ __html: cleanDescription }}
        />

        <GameAttributes gameDetail={gameDetail} />
      </div>

      <img
        className={styles["game-detail__image"]}
        src={gameDetail.background_image || noImage}
        alt=""
      />
    </div>
  );
}

export default GameDetailPage;
