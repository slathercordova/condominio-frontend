export interface PersonDto {
  id: string;
  tipoDocumentoId: string;
  tipoDocumentoNombre: string;
  numeroDocumento: string;
  nacimiento: string;
  celular?: string;
  celular2?: string;
  correo?: string;
  correo2?: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  estado: boolean;
}

export interface PersonFilters {
  numeroDocumento?: string;
  nombres?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  estado?: boolean;

  page?: number;
  size?: number;
}

export interface personPostRequest {
  tipoDocumento: string;
  numeroDocumento: string;
  nacimiento: string;
  celular?: string | null;
  celular2?: string | null;
  correo?: string | null;
  correo2?: string | null;
  nombres?: string  | null;
  apellidoPaterno?: string  | null;
  apellidoMaterno?: string  | null;
  sexo: string;
  estado: boolean;
}

export interface PersonaResponse {
  id: string;
  tipoDocumentoId: string;
  tipoDocumentoNombre: string;
  numeroDocumento: string;
}
