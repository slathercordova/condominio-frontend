import type { ReactNode } from "react";
import styles from "./ActionBar.module.css";

interface ActionBarProps {
  children: ReactNode;
}

export function ActionBar({ children }: ActionBarProps) {
  return <div className={styles.actionBar}>{children}</div>;
}
