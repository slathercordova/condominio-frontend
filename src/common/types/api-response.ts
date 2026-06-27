//import type { UnidadUsuarioType } from "../../features/units/types/mis-unidades";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  errorCode: string | null;
  data: T | null;
}

export type ValidationErrors = Record<string, string[]>;