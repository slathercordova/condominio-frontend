import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Roles {
  id: string;
  nombre: string;
  estado: boolean;
}

interface LoginEdificioResponse {
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
  roles: Roles[];
  idEdificio: string | null;
  nombreEdificio: string | null;
}

interface AuthState {
  usuario: LoginEdificioResponse | null;
  
  setLoginSuccess: (data: LoginEdificioResponse) => void;
  
  logout: () => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,

      setLoginSuccess: (data) =>
        set({
          usuario: data,
        }),

      logout: () =>
        set({
          usuario: null,
        }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);