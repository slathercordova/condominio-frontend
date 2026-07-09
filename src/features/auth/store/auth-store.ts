import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginEdificioResponse } from "../types/login-types";

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
      name: "auth-storage", // Nombre de la clave en localStorage
    },
  ),
);
