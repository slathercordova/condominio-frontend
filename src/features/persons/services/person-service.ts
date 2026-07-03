import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { PageResponse } from "../../../common/types/pagination";
import { useAuthStore } from "../../auth/store/auth-store";
import type { PersonDto, PersonFilters } from "../types/person-types";

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
