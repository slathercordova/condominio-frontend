export interface PersonDto {
  id: string;
  tipoDocumentoId: string;
  tipoDocumentoNombre: string;
  numeroDocumento: string;
  nacimiento: string;
  celular: string;
  celular2?: string;
  correo: string;
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
