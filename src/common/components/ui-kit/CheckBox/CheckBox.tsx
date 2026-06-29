import styles from "./CheckBox.module.css"

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}