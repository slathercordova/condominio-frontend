import styles from "./Slider.module.css";

interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  showValue?: boolean;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  helperText,
  error,
  disabled,
  showValue = true,
}: SliderProps) {
  const percentage = ((value - min) * 100) / (max - min);

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={styles.slider}
        style={{
          background: `linear-gradient(
                        to right,
                        var(--color-primary) 0%,
                        var(--color-primary) ${percentage}%,
                        #d6dbe3 ${percentage}%,
                        #d6dbe3 100%
                        )`,
        }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      {showValue && (
        <div className={styles.values}>
          <span>{min}</span>
          <span className={styles.current}>{value}</span>
          <span>{max}</span>
        </div>
      )}

      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        helperText && <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
}
