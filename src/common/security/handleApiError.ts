import axios from "axios";
import { notification } from "../components/ui-kit/Notificacion/Notification";
import type { ApiResponse, ValidationErrors } from "../types/api-response";

export function handleApiError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    notification.error({
      title: "Ocurrió un error inesperado",
    });
    return;
  }

  const response = error.response?.data as ApiResponse<ValidationErrors>;

  if (response?.data) {
    Object.values(response.data).forEach((messages) => {
      messages.forEach((message) =>
        notification.error({
          title: message,
        }),
      );
    });

    return;
  }

  notification.error({
    title: response?.message ?? "Ocurrió un error inesperado",
  });
}
