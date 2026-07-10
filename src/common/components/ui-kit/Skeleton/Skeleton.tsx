import styles from "./Skeleton.module.css";

interface SkeletonProps {
  rows?: number;
  height?: number;
  type?: "text" | "table";
}

export function Skeleton({
  rows = 3,
  height = 16,
  type = "text",
}: SkeletonProps) {
  if (type === "table") {
    return (
      <div className={styles.table}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={styles.tableRow}>
            <div className={styles.cell} style={{ height }}></div>
            <div className={styles.cell} style={{ height }}></div>
            <div className={styles.cell} style={{ height }}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.text}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.line} style={{ height }} />
      ))}
    </div>
  );
}
