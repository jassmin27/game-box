import { FiAlertCircle } from "react-icons/fi";
import styles from "./ErrorMessage.module.css";

interface Props {
  message: string;
  onRetry?: () => void;
  compact?: boolean;
}

const ErrorMessage = ({ message, onRetry, compact = false }: Props) => {
  return (
    <div className={`${styles.errorMessage} ${compact ? styles.compact : ""}`}>
      <FiAlertCircle className={styles.errorIcon} />

      <div className={styles.errorContent}>
        <p>{message}</p>

        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            {compact ? "Retry" : "Try again"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
