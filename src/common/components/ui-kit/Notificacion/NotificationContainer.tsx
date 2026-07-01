import styles from "./Notification.module.css";
import type { NotificationItem, NotificationPosition } from "./Types";

import { NotificationCard } from "./NotificationCard";

interface Props {
  notifications: NotificationItem[];
}

const positions: NotificationPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function NotificationContainer({ notifications }: Props) {
  return (
    <>
      {positions.map((position) => {
        const group = notifications.filter((n) => n.position === position);

        if (group.length === 0) return null;

        return (
          <div
            key={position}
            className={`${styles.container} ${styles[position]}`}
          >
            {group.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
