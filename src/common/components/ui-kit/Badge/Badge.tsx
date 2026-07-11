import type { ReactNode } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: ReactNode;

  color?: "success" | "danger" | "warning" | "info";
}

export function Badge({
  children,
  color = "info",
}: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>;
}
