export interface DocumentFilters {
  id?: string;
  nombre?: string;
  nombreCorto?: string;
  estado?: boolean;

  page?: number;
  size?: number;
}

export interface DocumentDetailResponse {
  id: string;
  nombre: string;
  nombreCorto: string;
  estado: boolean;
}
