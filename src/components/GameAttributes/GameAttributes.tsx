import type { GameDetail } from "../../types";
import AttributeItem from "../AttributeItem/AttributeItem";
import CriticScore from "../CriticScore/CriticScore";
import styles from "./GameAttributes.module.css";

interface Props {
  gameDetail: GameDetail;
}

function GameAttributes({ gameDetail }: Props) {
  return (
    <dl className={styles["game-attributes"]}>
      <AttributeItem label="Platforms">
        {gameDetail.platforms.map(({ platform }) => platform.name).join(", ")}
      </AttributeItem>

      <AttributeItem label="Metascore">
        <CriticScore score={gameDetail.metacritic} />
      </AttributeItem>

      <AttributeItem label="Genres">
        {gameDetail.genres.map((genre) => genre.name).join(", ")}
      </AttributeItem>

      <AttributeItem label="Publishers">
        {gameDetail.publishers.map((publisher) => publisher.name).join(", ")}
      </AttributeItem>
    </dl>
  );
}

export default GameAttributes;
