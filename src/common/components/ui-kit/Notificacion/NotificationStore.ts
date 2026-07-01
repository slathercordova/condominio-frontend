import type { NotificationItem } from "./Types";

type Listener = (notifications: NotificationItem[]) => void;

class NotificationStore {
  private notifications: NotificationItem[] = [];
  private listeners: Listener[] = [];
  private maxVisible = 5;

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener(this.notifications);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.notifications));
  }

  add(notification: NotificationItem) {
    // this.notifications = [...this.notifications, notification];
    // this.notify();
    const updated = [...this.notifications, notification];

    this.notifications = updated.slice(-this.maxVisible);

    this.notify();
  }

  remove(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);

    this.notify();
  }

  setMaxVisible(max: number) {
    this.maxVisible = max;
  }
}

export const notificationStore = new NotificationStore();
