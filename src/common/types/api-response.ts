//import type { UnidadUsuarioType } from "../../features/units/types/mis-unidades";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // Usamos un genérico <T> para que sirva con cualquier modelo
}