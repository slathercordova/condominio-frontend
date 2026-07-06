import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../app/auth/sign-in";
import { Landing } from "../app/landing/landing";
import { MainLayout } from "../common/layouts/main-layout";
import { BuildingApp } from "../app/buildings/buildings";
import { FavoritesApp } from "../app/favorites/favorites";
import { ProtectedRouter } from "../common/security/protected-router";
import { ResetPassword } from "../app/auth/reset-password";
import { EstilosGeneralesApp } from "../app/Utilitarios/EstilosGenerales";
import { PersonsApp } from "../app/persons/persons";
import { MyUnitsApp } from "../app/units/my-units";
import { UnitFormApp } from "../app/units/UnitForm";
import { UnitPageApp } from "../app/units/UnitPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: SignIn,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/landing",
            Component: Landing,
          },
          {
            path: "/my-units",
            Component: MyUnitsApp,
          },
          {
            path: "/buildings",
            Component: BuildingApp,
          },
          {
            path: "/favorites",
            Component: FavoritesApp,
          },
          {
            path: "/unit/:idUnidad",
            Component: UnitFormApp,
          },
          {
            path: "/persons",
            Component: PersonsApp,
          },
          {
            path: "/utilitarios",
            Component: EstilosGeneralesApp,
          },
          {
            path: "/units",
            Component: UnitPageApp,
          },
        ],
      },
    ],
  },
]);
