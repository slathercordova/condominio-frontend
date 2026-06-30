import { LoaderCircle } from "lucide-react";
import styles from "./Loading.module.css";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "inline" | "centered";
}

const sizeMap = {
  sm: 18,
  md: 28,
  lg: 40,
};

export function Loading({
  text = "Cargando...",
  size = "md",
  variant = "centered",
}: LoadingProps) {
  return (
    <div
      className={`${styles.container} ${
        variant === "centered" ? styles.centered : styles.inline
      }`}
    >
      <LoaderCircle size={sizeMap[size]} className={styles.spinner} />

      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}
