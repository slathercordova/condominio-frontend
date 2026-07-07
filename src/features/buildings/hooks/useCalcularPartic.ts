import { useState } from "react";
import { CalcularParticipacionWs } from "../services/building-service";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { handleApiError } from "../../../common/security/handleApiError";

export function useCalcularParticipacion() {
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const CalcularParticipacion = (idEdificio: string) => {
    setCalculating(true);
    setError(null);

    return CalcularParticipacionWs(idEdificio)
      .then((response) => {
        if (response.data) {
          notification.success({ title: response.message });
          //   refreshCurrentPage();
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setCalculating(false);
      });
  };

  return {
    CalcularParticipacion,
  };
}
