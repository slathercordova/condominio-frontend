import { useState } from "react";
import { CalcularDeudaWs } from "../services/building-service";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { handleApiError } from "../../../common/security/handleApiError";

export function useCalcularDeuda() {
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calcularDeuda = (idEdificio: string) => {
    setCalculating(true);
    setError(null);

    return CalcularDeudaWs(idEdificio)
      .then((response) => {
        if (response.data) {
          notification.success({ title: response.message });
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setCalculating(false);
      });
  };

  return {
    calcularDeuda,
  };
}
