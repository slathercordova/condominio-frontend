import axios from "axios";
import { notification } from "../components/ui-kit/Notificacion/Notification";

export const ApiUrl = axios.create({
  baseURL: "http://localhost:9090/api/v1"
});

ApiUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 401:
        notification.error({
          title: "Debe iniciar sesión nuevamente",
        });
        break;

      case 403:
        notification.error({
          title: "No tiene permisos para realizar esta operación",
        });
        break;

      case 500:
        notification.error({
          title: "Error interno del servidor",
        });
        break;
    }

    return Promise.reject(error);
  },
);