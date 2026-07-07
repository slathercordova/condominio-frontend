export interface UnidadUsuarioType {
  idPersonaUnidad: string;
  idPersona: string;
  personaNombre: string;
  idUnidad: string;
  codigo: string;
  metraje: number;
  porcentaje: number;
  tipoUnidad: string;
  idEdificio: string;
  edificioNombre: string;
  edificioDireccion: string;
}

export interface UnitFilter {
  idEdificio: string;
  id?: string;
  codigo?: string;
  piso?: number;
  metraje?: number;
  tipoUnidad?: string;
  tipoAlquiler?: string;
  estado?: string;

  page?: number;
  size?: number;
}

export interface UnitDetailResponse {
  idEdificio: string;
  id: string;
  codigo: string;
  logoUrl: string;
  piso: number;
  torre: string;
  metraje: number;
  porcentaje: number;
  tipoUnidad: string;
  tipoAlquiler: string;
  estado: boolean;
}

export interface UnitRequest {
  idEdificio: string;
  codigo: string;
  logoUrl?: string | null;
  piso: number;
  torre: string;
  metraje: number;
  porcentaje: number;
  tipoUnidad: string;
  tipoAlquiler?: string | null;
  estado: boolean;
}
