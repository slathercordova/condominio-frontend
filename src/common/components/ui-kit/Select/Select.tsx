import styles from "./Select.module.css";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string | number;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export function Select({
  label,
  value,
  options,
  placeholder,
  onChange,
  required,
  disabled,
}: SelectProps) {
  return (
    <div className={`${styles.group} ${disabled ? styles.disabled : ""}`}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
