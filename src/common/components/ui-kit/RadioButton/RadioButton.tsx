import styles from "./RadioButton.module.css";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: string;
  direction?: "vertical" | "horizontal";
  name?: string;
}

export function RadioButton({
  label,
  value,
  options,
  onChange,
  required,
  disabled,
  helperText,
  error,
  direction = "vertical",
  name,
}: RadioGroupProps) {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.groupLabel}>
          {label}

          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div
        className={`${styles.options} ${
          direction === "horizontal" ? styles.horizontal : styles.vertical
        }`}
      >
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled || option.disabled}
              onChange={() => onChange(option.value)}
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        helperText && <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
}
