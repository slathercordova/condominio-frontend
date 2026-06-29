import styles from "./Alert.module.css";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
}

const typeMap: Record<AlertType, string> = {
  success: styles.success,
  error: styles.error,
  info: styles.info,
};

export function Alert({ type, message }: AlertProps) {
  return <div className={`${styles.alert} ${typeMap[type]}`}>{message}</div>;
}
