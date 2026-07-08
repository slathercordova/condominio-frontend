import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { PageResponse } from "../../../common/types/pagination";
import { useAuthStore } from "../../auth/store/auth-store";
import type {
  PersonaUnidadRequest,
  PersonaUnidadResponse,
  UnidadUsuarioType,
  UnitDetailResponse,
  UnitFilter,
  UnitRequest,
} from "../types/unit-types";

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

export async function deleteUnitWs(id: string): Promise<ApiResponse<void>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.delete(`${API_ENDPOINTS.UNIDAD.DELETE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUnitWs(
  id: string,
): Promise<ApiResponse<UnitDetailResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get(`${API_ENDPOINTS.UNIDAD.GET}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function putUnitWs(
  id: string,
  data: UnitRequest,
): Promise<ApiResponse<UnitDetailResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.put<ApiResponse<UnitDetailResponse>>(
    `${API_ENDPOINTS.UNIDAD.PUT}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function AsignUnitPersonWs(
  data: PersonaUnidadRequest,
): Promise<ApiResponse<PersonaUnidadResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.post<ApiResponse<PersonaUnidadResponse>>(
    API_ENDPOINTS.USUARIO_UNIDAD.ASIGNAR_UNIDAD,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
