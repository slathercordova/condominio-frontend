import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { PageResponse } from "../../../common/types/pagination";
import { useAuthStore } from "../../auth/store/auth-store";
import type {
  DocumentDetailResponse,
  DocumentFilters,
} from "../types/document-types";
import type {
  PersonaResponse,
  PersonDto,
  PersonFilters,
  personPostRequest,
} from "../types/person-types";

export async function personaList(
  params?: PersonFilters,
): Promise<ApiResponse<PageResponse<PersonDto>>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<PageResponse<PersonDto>>>(
    API_ENDPOINTS.PERSONA.GET,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function getAllTipoDocumento(
  params?: DocumentFilters,
): Promise<ApiResponse<PageResponse<DocumentDetailResponse>>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<
    ApiResponse<PageResponse<DocumentDetailResponse>>
  >(API_ENDPOINTS.TIPO_DOCUMENTO.GET, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postPersona(
  data: personPostRequest,
): Promise<ApiResponse<PersonaResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.post<ApiResponse<PersonaResponse>>(
    API_ENDPOINTS.PERSONA.POST,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deletePersona(
  id: string,
): Promise<ApiResponse<PersonaResponse>> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.delete(
    `${API_ENDPOINTS.PERSONA.DELETE}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
