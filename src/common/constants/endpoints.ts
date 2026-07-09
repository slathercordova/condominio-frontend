import type { BuildingFilters } from "../../features/buildings/types/building-types";

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
    ASIGNAR_UNIDAD: "/unidad/asignar-persona",
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

  CATALOGO: {
    TIPO_UNIDAD: "/catalogos/tipos-unidad",
    TIPO_ALQUILER: "/catalogos/tipos-alquiler",
    TIPO_PROPIEDAD: "/catalogos/tipos-propiedad",
    TIPO_COBRO: "/catalogos/tipos-cobro",
    PERIODO_MORA: "/catalogos/periodo-mora",
  },

  EDIFICIO: {
    CALCULAR_PARTICIPACION: (idEdificio: string) =>
      `/edificio/${idEdificio}/calcular-porcentajes`,
    GET_FILTERS: "/edificio",
    DELETE: (id: string) => `/edificio/${id}`,
    POST: () => `/edificio`,
    PUT: (id: string) => `/edificio/${id}`,
  },
};
