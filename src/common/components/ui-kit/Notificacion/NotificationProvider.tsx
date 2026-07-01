import { useEffect, useState } from "react";
import { notificationStore } from "./NotificationStore";
import { NotificationContainer } from "./NotificationContainer";
import type { NotificationItem } from "./Types";

interface Props {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    return notificationStore.subscribe(setNotifications);
  }, []);

  return (
    <>
      {children}

      <NotificationContainer notifications={notifications} />
    </>
  );
}
