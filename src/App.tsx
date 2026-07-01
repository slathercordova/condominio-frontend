import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { NotificationProvider } from "./common/components/ui-kit/Notificacion/NotificationProvider";

export function App() {
  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}
