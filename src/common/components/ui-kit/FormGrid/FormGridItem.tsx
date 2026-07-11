import type { ReactNode } from "react";
import styles from "./FormGridItem.module.css";

interface FormItemProps {
  children: ReactNode;
  colSpan?: number;
}

export function FormGridItem({ children, colSpan = 1 }: FormItemProps) {
  const safeColSpan = Math.min(Math.max(colSpan, 1), 12);
  return (
    <div
      className={styles.item}
      style={{
        gridColumn: `span ${safeColSpan}`,
      }}
    >
      {children}
    </div>
  );
}
