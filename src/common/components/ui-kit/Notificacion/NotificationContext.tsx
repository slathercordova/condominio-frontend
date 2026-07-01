import { createContext } from "react";
import type { NotificationItem } from "./Types";

export interface NotificationContextType {
  notifications: NotificationItem[];

  addNotification: (notification: NotificationItem) => void;

  removeNotification: (id: string) => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
