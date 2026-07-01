export type NotificationType = "success" | "error" | "warning" | "info";

export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface NotificationOptions {
  title: string;
  description?: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  showProgress?: boolean;
}

export interface NotificationItem extends NotificationOptions {
  id: string;
}
