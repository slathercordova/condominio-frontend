import type { ReactNode } from "react";
import styles from "./FormGrid.module.css";

interface FormGridProps {
  children: ReactNode;
  gap?: number;
}

export function FormGrid({ children = 2, gap = 16 }: FormGridProps) {
  return (
    <div
      className={styles.grid}
      style={{
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
