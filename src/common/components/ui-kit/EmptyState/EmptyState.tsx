import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export function EmptyState({
  title = "No hay datos",
  description = "Aún no existen registros para mostrar.",
  actionLabel,
  onAction,
  icon = "📂",
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      {onAction && actionLabel && (
        <button className={styles.button} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
