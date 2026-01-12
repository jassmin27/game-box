import type { Game } from "../../types";
import CriticScore from "../CriticScore/CriticScore";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GameCard.module.css";
import Skeleton from "react-loading-skeleton";
import Emoji from "../Emoji/Emoji";

interface Props {
  game: Game;
  loading?: boolean;
}

function GameCard({ game, loading = false }: Props) {
  return (
    <div className={styles["game-card"]}>
      {loading ? (
        <Skeleton width="100%" height={190} />
      ) : (
        <img
          className={styles["game-card__img"]}
          src={getCroppedImageURL(game.background_image)}
          alt={game.name}
        />
      )}

      <div className={styles["game-card__info"]}>
        <div className={styles["game-card__header"]}>
          {loading ? (
            <Skeleton width={70} height={20} />
          ) : (
            /* Always default arrays when passing to child components to avoid crashes during loading */
            <PlatformIconList platforms={game.parent_platforms ?? []} />
          )}
          {loading ? (
            <Skeleton width={35} height={20} />
          ) : game.metacritic ? (
            <CriticScore score={game.metacritic} />
          ) : null}
        </div>
        {loading ? (
          <Skeleton height={20} />
        ) : (
          <div className={styles["game-card__footer"]}>
            <span className={styles["game-card__title"]}>
              <h3>{game.name}</h3> <Emoji rating={game.rating_top} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameCard;
