import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { LoginRequest } from "../types/login-request";

export async function loginEP(request: LoginRequest) {
  const response = await ApiUrl.post(API_ENDPOINTS.AUTH.LOGIN, request);
  return response.data;
}

export async function loginEdificioEP(idEdificio: string, token: string) {
  const response = await ApiUrl.post(
    `${API_ENDPOINTS.AUTH.LOGIN_EDIFICIO}/${idEdificio}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
