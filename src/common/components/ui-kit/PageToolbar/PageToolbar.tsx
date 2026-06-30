import styles from "./PageToolbar.module.css";

interface PageToolbarProps {
  title: string;
  onCreate?: () => void;
  createLabel?: string;
  onRefresh?: () => void;
  onExport?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageToolbar({
  title,
  onCreate,
  createLabel = "Nuevo",
  onRefresh,
  onExport,
  searchValue,
  onSearchChange,
  filters,
  actions,
  children,
}: PageToolbarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.center}>
        {onSearchChange && (
          <input
            className={styles.search}
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}

        {filters}
      </div>

      <div className={styles.right}>
        {onRefresh && (
          <button className={styles.button} onClick={onRefresh}>
            ⟳
          </button>
        )}

        {onExport && (
          <button className={styles.button} onClick={onExport}>
            ⬇
          </button>
        )}

        {actions}

        {onCreate && (
          <button className={styles.primaryButton} onClick={onCreate}>
            + {createLabel}
          </button>
        )}
      </div>

      {children && <div className={styles.bottom}>{children}</div>}
    </div>
  );
}
