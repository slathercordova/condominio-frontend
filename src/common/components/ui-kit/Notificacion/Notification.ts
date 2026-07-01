import { notificationStore } from "./NotificationStore";
import type { NotificationOptions, NotificationType } from "./Types";

function createNotification(
  type: NotificationType,
  options: NotificationOptions,
) {
  notificationStore.add({
    id: crypto.randomUUID(),
    type,
    duration: 3000,
    position: "top-right",
    ...options,
  });
}

export const notification = {
  success(options: NotificationOptions) {
    createNotification("success", options);
  },

  error(options: NotificationOptions) {
    createNotification("error", options);
  },

  warning(options: NotificationOptions) {
    createNotification("warning", options);
  },

  info(options: NotificationOptions) {
    createNotification("info", options);
  },

  show(options: NotificationOptions) {
    createNotification(options.type ?? "info", options);
  },
};
