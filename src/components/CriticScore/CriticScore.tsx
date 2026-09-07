import styles from "./CriticScore.module.css";

interface Props {
  score: number;
}
function CriticScore({ score }: Props) {
  if (score == null) {
    return <span className={styles["not-available"]}>Not available</span>;
  }

  const scoreRange = score > 75 ? "high" : score > 60 ? "mid" : "";
  return (
    <div
      className={`${styles["critic-score"]} ${
        scoreRange ? styles[scoreRange] : ""
      }`}
    >
      {score}
    </div>
  );
}

export default CriticScore;
