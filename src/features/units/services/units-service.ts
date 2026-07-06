import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { PageResponse } from "../../../common/types/pagination";
import { useAuthStore } from "../../auth/store/auth-store";
import type {
  UnidadUsuarioType,
  UnitDetailResponse,
  UnitFilter,
  UnitRequest,
} from "../types/mis-unidades";

export async function MyUnitsWs(
  token: string,
  idUsuario: string,
): Promise<ApiResponse<UnidadUsuarioType[]>> {
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

export async function unitListWs(
  params?: UnitFilter,
): Promise<ApiResponse<PageResponse<UnitDetailResponse>>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<
    ApiResponse<PageResponse<UnitDetailResponse>>
  >(API_ENDPOINTS.UNIDAD.GET, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postUnitWs(
  data: UnitRequest,
): Promise<ApiResponse<UnitDetailResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.post<ApiResponse<UnitDetailResponse>>(
    API_ENDPOINTS.UNIDAD.POST,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
