export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGIN_EDIFICIO: "/auth/login/edificio/",
    REFRESH: "/auth/refresh",
    LOG_OUT: "/auth/logout",
    LOG_OUT_ALL: "/auth/logout-all",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    TEST: "/auth/test",
  },

  USUARIO_EDIFICIO: {
    MY_BUILDINGS: "/edificio/usuario/mis-edificios",
  },

  USUARIO_UNIDAD: {
    MY_UNITS: "/unidad/mis-unidades/",
  },

  PERSONA: {
    POST: "/persona",
    GET: "/persona",
    PUT: "/persona",
    DELETE: "/persona",
  },

  TIPO_DOCUMENTO: {
    GET: "/tipo-documento",
  },

  UNIDAD: {
    POST: "/unidad",
    GET: "/unidad",
    PUT: "/unidad",
    DELETE: "/unidad",
  },
};
