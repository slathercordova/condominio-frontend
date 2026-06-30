import styles from "./NoResults.module.css";

interface NoResultsProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
  clearLabel?: string;
}

export function NoResults({
  title = "Sin resultados",
  description = "No se encontraron coincidencias con tu búsqueda.",
  onClearFilters,
  clearLabel = "Limpiar filtros",
}: NoResultsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>🔍</div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      {onClearFilters && (
        <button className={styles.button} onClick={onClearFilters}>
          {clearLabel}
        </button>
      )}
    </div>
  );
}
