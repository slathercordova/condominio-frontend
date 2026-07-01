import styles from "./Switch.module.css";

interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: string;
  labelPosition?: "left" | "right";
}

export function Switch({
  label,
  checked,
  onChange,
  disabled,
  required,
  helperText,
  error,
  labelPosition = "left",
}: SwitchProps) {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.switchLabel} ${
          labelPosition === "left" ? styles.left : styles.right
        }`}
      >
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>

        <span className={styles.switchControl}>
          <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </span>
      </label>

      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        helperText && <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
}
