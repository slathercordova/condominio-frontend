export interface BuildingFilters {
  idEmpresa?: string;
  id?: string;
  nombre?: string;
  ruc?: string;
  estado?: boolean;

  page?: number;
  size?: number;
}

export interface BuildingDetailResponse {
  idEmpresa: string;
  id: string;
  nombre: string;
  logoUrl: string;
  direccion: string;
  ruc: string;
  contingencia: number;
  tipoCobro: string;
  aplicaMora: boolean;
  montoMora: number;
  periodoMora: string;
  diaGeneracion: number;
  diaVencimiento: number;
  diaGracia: number;
  estado: boolean;
}

export interface BuildingRequest {
  idEmpresa: string;
  nombre: string;
  logoUrl: string;
  direccion: string;
  ruc: string;
  contingencia: number;
  tipoCobro: string;
  aplicaMora: boolean;
  montoMora: number;
  periodoMora: string;
  diaGeneracion: number;
  diaVencimiento: number;
  diaGracia: number;
}

export interface BuildingResponse {
  id: string;
  nombre: string;
  direccion: string;
}
