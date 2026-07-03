import type React from "react";
import styles from "./Input.module.css";
import { useState } from "react";
import { Check, Copy, Eye, EyeOff, X } from "lucide-react";

interface InputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  name?: string;
  helperText?: string;
  status?: "default" | "success" | "warning" | "error";
  messageStatus?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  showCounter?: boolean;
  clearable?: boolean;
  copyable?: boolean;
}

const borderStatusClass = {
  default: styles.stateDefault,
  success: styles.stateSuccess,
  warning: styles.stateWarning,
  error: styles.stateError,
};

const messageStatusClass = {
  default: styles.messageDefault,
  success: styles.messageSuccess,
  warning: styles.messageWarning,
  error: styles.messageError,
};

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  readOnly,
  required,
  autoFocus,
  maxLength,
  name,
  helperText,
  status = "default",
  messageStatus,
  startAdornment,
  endAdornment,
  showCounter,
  clearable,
  copyable,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [isCopied, setIsCopied] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleCopy = async () => {
    try {
      setIsCopied(true);
      await navigator.clipboard.writeText(value);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch {
      console.error("No se pudo copiar el texto.");
    }
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div
        className={`${styles.inputWrapper} ${borderStatusClass[status]} ${disabled ? styles.disabled : ""} ${readOnly ? styles.readOnly : ""}`}
      >
        {startAdornment && (
          <span className={styles.icon}>{startAdornment}</span>
        )}

        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={inputType}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          maxLength={maxLength}
          name={name}
        />

        {clearable && value && (
          <button
            type="button"
            className={styles.action}
            onClick={() => onChange("")}
          >
            <X size={18} />
          </button>
        )}

        {copyable && value && (
          <button type="button" className={styles.action} onClick={handleCopy}>
            {isCopied ? (
              <Check size={18} className={styles.copied} />
            ) : (
              <Copy size={18} />
            )}
          </button>
        )}

        {type === "password" && (
          <button
            type="button"
            className={styles.action}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {endAdornment && <span className={styles.icon}>{endAdornment}</span>}
      </div>

      {messageStatus ? (
        <span className={messageStatusClass[status]}>{messageStatus}</span>
      ) : (
        helperText && <span className={styles.helper}>{helperText}</span>
      )}

      {showCounter && maxLength && (
        <span className={styles.counter}>
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
