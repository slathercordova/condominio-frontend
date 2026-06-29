import styles from "./Input.module.css";

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  name?: string;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  readOnly,
  required,
  maxLength,
  autoFocus,
  name,
}: InputProps) {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        autoFocus={autoFocus}
        name={name}
      />
    </div>
  );
}
