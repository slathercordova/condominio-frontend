import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import { useAuthStore } from "../../auth/store/auth-store";

export async function CalcularParticipacionWs(
  idEdificio: string,
): Promise<ApiResponse<void>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.post<ApiResponse<void>>(
    API_ENDPOINTS.EDIFICIO.CALCULAR_PARTICIPACION(idEdificio),
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
