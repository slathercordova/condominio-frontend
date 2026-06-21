import { API_ENDPOINTS } from "../../../common/constants/endpoints";
import { ApiUrl } from "../../../common/security/api";

export async function misEdificiosEP(token: string) {
  const response = await ApiUrl.get(API_ENDPOINTS.USUARIO_EDIFICIO.MY_UNITS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
