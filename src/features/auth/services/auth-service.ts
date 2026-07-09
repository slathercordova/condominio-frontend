import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";
import type { ApiResponse } from "../../../common/types/api-response";
import type {
  ForgotPasswordRequest,
  ResetPassWord,
} from "../../units/types/forgotpassword";
import type {
  LoginEdificioResponse,
  LoginRequest,
  LoginResponse,
} from "../types/login-types";

export async function loginEP(
  request: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  const response = await ApiUrl.post<ApiResponse<LoginResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    request,
  );
  return response.data;
}

export async function loginEdificioEP(
  idEdificio: string,
  token: string,
): Promise<ApiResponse<LoginEdificioResponse>> {
  const response = await ApiUrl.post<ApiResponse<LoginEdificioResponse>>(
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
  const response = await ApiUrl.put<ApiResponse<void>>(
    `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
    request,
  );
  return response.data;
}

export async function resetPasswordEP(
  request: ResetPassWord,
): Promise<ApiResponse<void>> {
  const response = await ApiUrl.put<ApiResponse<void>>(
    `${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
    request,
  );
  return response.data;
}
