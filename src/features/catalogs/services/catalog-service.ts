import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import { useAuthStore } from "../../auth/store/auth-store";
import type { CatalogResponse } from "../types/catalog-type";

export async function ListTipoUnidadWs(): Promise<
  ApiResponse<CatalogResponse[]>
> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<CatalogResponse[]>>(
    API_ENDPOINTS.CATALOGO.TIPO_UNIDAD,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function ListTipoAlquilerWs(): Promise<
  ApiResponse<CatalogResponse[]>
> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<CatalogResponse[]>>(
    API_ENDPOINTS.CATALOGO.TIPO_ALQUILER,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function ListTipoPropiedadWs(): Promise<
  ApiResponse<CatalogResponse[]>
> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<CatalogResponse[]>>(
    API_ENDPOINTS.CATALOGO.TIPO_PROPIEDAD,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function ListTipoCobroWs(): Promise<
  ApiResponse<CatalogResponse[]>
> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<CatalogResponse[]>>(
    API_ENDPOINTS.CATALOGO.TIPO_COBRO,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function ListPeriodoMoraWs(): Promise<
  ApiResponse<CatalogResponse[]>
> {
  const token = useAuthStore.getState().usuario?.accessToken;

  const response = await ApiUrl.get<ApiResponse<CatalogResponse[]>>(
    API_ENDPOINTS.CATALOGO.PERIODO_MORA,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
