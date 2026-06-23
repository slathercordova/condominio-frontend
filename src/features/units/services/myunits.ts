import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { UnidadUsuarioType } from "../types/mis-unidades";

export async function misUnidadesEP(token: string, idUsuario: string): Promise<ApiResponse<UnidadUsuarioType[]>> {
  const response = await ApiUrl.get(
    `${API_ENDPOINTS.USUARIO_UNIDAD.MY_UNITS}/${idUsuario}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
