import DOMPurify from "dompurify";
import { useParams } from "react-router";
import useGame from "../hooks/useGame";
import styles from "./GameDetailPage.module.css";
import GameAttributes from "../components/GameAttributes/GameAttributes";
import noImage from "../assets/no-image-placeholder.webp";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useDataMode } from "../hooks/useDataMode";

function GameDetailPage() {
  const { slug } = useParams();
  const { data: gameDetail, isLoading, error, refetch } = useGame(slug);
  const { dataMode } = useDataMode();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <ErrorMessage
          message="Unable to load game details."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!gameDetail) {
    return <p>Game details not found.</p>;
  }

  const cleanDescription = DOMPurify.sanitize(gameDetail.description, {
    USE_PROFILES: { html: true },
  });

  const imageUrl =
    dataMode === "demo"
      ? gameDetail.background_image
        ? `/demo/games/full/${gameDetail.background_image}.webp`
        : noImage
      : gameDetail.background_image || noImage;

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

      <img className={styles["game-detail__image"]} src={imageUrl} alt="" />
    </div>
  );
}

export default GameDetailPage;
