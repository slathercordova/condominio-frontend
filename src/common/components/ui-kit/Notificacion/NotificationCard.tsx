import { CheckCircle2, CircleAlert, CircleX, Info, X } from "lucide-react";

import styles from "./Notification.module.css";
import { notificationStore } from "./NotificationStore";
import type { NotificationItem } from "./Types";
import { useEffect } from "react";

interface Props {
  notification: NotificationItem;
}

export function NotificationCard({ notification }: Props) {
  useEffect(() => {
    if (notification.duration === 0) return;

    const timer = setTimeout(() => {
      notificationStore.remove(notification.id);
    }, notification.duration ?? 3000);

    return () => clearTimeout(timer);
  }, []);

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <CircleX size={20} />,
    warning: <CircleAlert size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`${styles.toast} ${styles[notification.type ?? "info"]}`}>
      <div className={styles.icon}>{icons[notification.type ?? "info"]}</div>

      <div className={styles.body}>
        <div className={styles.title}>{notification.title}</div>

        {notification.description && (
          <div className={styles.description}>{notification.description}</div>
        )}

        {notification.showProgress && (
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{
                animationDuration: `${notification.duration}ms`,
              }}
            />
          </div>
        )}
      </div>

      <button
        className={styles.close}
        onClick={() => notificationStore.remove(notification.id)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
