import type { Game } from "../../types";
import CriticScore from "../CriticScore/CriticScore";
import PlatformIconList from "../PlatformIconList/PlatformIconList";
import getCroppedImageURL from "../../services/cropped-image-url";
import styles from "./GameCard.module.css";
import Skeleton from "react-loading-skeleton";
import Emoji from "../Emoji/Emoji";
import { Link } from "react-router";

interface Props {
  game: Game;
  loading?: boolean;
}

function GameCardSkeleton() {
  return (
    <div className={styles["game-card"]}>
      <div className={styles["game-card__img-skeleton"]}>
        <Skeleton width="100%" height="100%" />
      </div>

      <div className={styles["game-card__info"]}>
        <div className={styles["game-card__header"]}>
          <Skeleton width={70} height={20} />
          <Skeleton width={35} height={20} />
        </div>

        <Skeleton height={20} />
      </div>
    </div>
  );
}

function GameCard({ game, loading = false }: Props) {
  if (loading) {
    return <GameCardSkeleton />;
  }

  return (
    <Link className={styles["game-card"]} to={`/games/${game.slug}`}>
      <img
        className={styles["game-card__img"]}
        src={getCroppedImageURL(game.background_image)}
        alt=""
      />

      <div className={styles["game-card__info"]}>
        <div className={styles["game-card__header"]}>
          <PlatformIconList platforms={game.parent_platforms ?? []} />
          {game.metacritic ? <CriticScore score={game.metacritic} /> : null}
        </div>

        <div className={styles["game-card__footer"]}>
          <div className={styles["game-card__title"]}>
            <h2>{game.name}</h2>
            <Emoji rating={game.rating_top} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
