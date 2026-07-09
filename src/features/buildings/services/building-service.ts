import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { PageResponse } from "../../../common/types/pagination";
import { useAuthStore } from "../../auth/store/auth-store";
import type {
  BuildingDetailResponse,
  BuildingFilters,
  BuildingRequest,
  BuildingResponse,
} from "../types/building-types";

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

export async function listBuildingsWs(
  params?: BuildingFilters,
): Promise<ApiResponse<PageResponse<BuildingDetailResponse>>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<
    ApiResponse<PageResponse<BuildingDetailResponse>>
  >(API_ENDPOINTS.EDIFICIO.GET_FILTERS, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteBuildingWs(id: string): Promise<ApiResponse<void>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.delete<ApiResponse<void>>(
    API_ENDPOINTS.EDIFICIO.DELETE(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function postBuildingWs(
  data?: BuildingRequest,
): Promise<ApiResponse<BuildingResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.post<ApiResponse<BuildingResponse>>(
    API_ENDPOINTS.EDIFICIO.POST(),
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function putBuildingWs(
  id: string,
  data?: BuildingRequest,
): Promise<ApiResponse<BuildingDetailResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.put<ApiResponse<BuildingDetailResponse>>(
    API_ENDPOINTS.EDIFICIO.PUT(id),
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
