import type { ReactNode } from "react";
import styles from "./ActionSection.module.css";

interface ActionSectionProps {
  title?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
}

export function ActionSection({
  title,
  children,
  align = "start",
}: ActionSectionProps) {
  return (
    <section className={styles.section}>
      {title && <h3>{title}</h3>}
      <div className={`${styles.buttons} ${styles[align]}`}>{children}</div>
    </section>
  );
}
