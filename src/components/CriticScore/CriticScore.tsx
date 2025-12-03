import styles from "./CriticScore.module.css";

function CriticScore({ score }: { score: number }) {
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
