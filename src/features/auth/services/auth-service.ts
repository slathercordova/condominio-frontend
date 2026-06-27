import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type { ForgotPasswordRequest, ResetPassWord } from "../../units/types/forgotpassword";
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

export async function forgotPasswordEP(
  request: ForgotPasswordRequest,
): Promise<ApiResponse<void>> {
  const response = await ApiUrl.put(
    `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
    request,
  );
  return response.data;
}

export async function resetPasswordEP(request: ResetPassWord): Promise<ApiResponse<void>> {
  const response = await ApiUrl.put(
    `${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
    request,
  );
  return response.data;
}
