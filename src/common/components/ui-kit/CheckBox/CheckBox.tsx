import styles from "./CheckBox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  helperText,
  error,
  required,
}: CheckboxProps) {
  return (
    <div className={styles.container}>
      <label className={styles.checkbox}>
        <input
          className={styles.input}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />

        {label && (
          <span className={styles.label}>
            {label}

            {required && <span className={styles.required}>*</span>}
          </span>
        )}
      </label>

      {!error && helperText && (
        <span className={styles.helper}>{helperText}</span>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
