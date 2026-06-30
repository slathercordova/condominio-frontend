import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorState({
  title = "Ocurrió un error",
  message = "No fue posible cargar la información.",
  onRetry,
  retryText = "Reintentar",
}: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠</div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.message}>{message}</p>

      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          {retryText}
        </button>
      )}
    </div>
  );
}
