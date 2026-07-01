import styles from "./Separator.module.css";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  spacing?: "sm" | "md" | "lg";
  variant?: "solid" | "dashed" | "dotted";
  color?: "default" | "primary" | "success" | "warning" | "danger";
}

export function Separator({
  orientation = "horizontal",
  label,
  spacing = "md",
  variant = "solid",
  color = "default",
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`${styles.vertical} ${styles[variant]} ${styles[color]} ${styles[spacing]}`}
      />
    );
  }

  if (!label) {
    return (
      <hr
        className={`${styles.separator} ${styles[variant]} ${styles[color]} ${styles[spacing]}`}
      />
    );
  }

  return (
    <div className={`${styles.withLabel} ${styles[spacing]}`}>
      <hr className={`${styles.line} ${styles[variant]} ${styles[color]}`} />

      <span className={`${styles.label} ${styles[color]}`}>{label}</span>

      <hr className={`${styles.line} ${styles[variant]} ${styles[color]}`} />
    </div>
  );
}
