export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  primeraVez: boolean;
  edificioSeleccionado: boolean;
}

export interface Role {
  id: string;
  nombre: string;
  estado: boolean;
}

export interface LoginEdificioResponse {
  accessToken: string | null;
  refreshToken: string | null;
  idUsuario: string | null;
  primeraVez: boolean;
  edificioSeleccionado: boolean;
  idPersona: string | null;
  nombres: string | null;
  apellidoPaterno: string | null;
  apellidoMaterno: string | null;
  nombreCompleto: string | null;
  sexo: string | null;
  roles: Role[];
  idEdificio: string | null;
  nombreEdificio: string | null;
}
