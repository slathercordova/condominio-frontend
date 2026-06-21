import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  usuarioId: string | null;
  edificioSeleccionado: boolean;
  primeraVez: boolean;
  
  setLoginSuccess: (data: {
    accessToken: string;
    refreshToken: string;
    id: string;
    edificioSeleccionado: boolean;
    primeraVez: boolean;
  }) => void;
  
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      usuarioId: null,
      edificioSeleccionado: false,
      primeraVez: false,

      setLoginSuccess: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken, // ⚠️ Temporal en localStorage si usas 'persist'
          usuarioId: data.id,
          edificioSeleccionado: data.edificioSeleccionado,
          primeraVez: data.primeraVez,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          usuarioId: null,
          edificioSeleccionado: false,
          primeraVez: false,
        }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);