import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../app/auth/sign-in";
import { Landing } from "../app/landing/landing";
import { MainLayout } from "../common/layouts/main-layout";
import { UnitsApp } from "../app/units/units";
import { BuildingApp } from "../app/buildings/buildings";
import { FavoritesApp } from "../app/favorites/favorites";
import { ProtectedRouter } from "../common/security/protected-router";
import { UnitApp } from "../app/units/unit";
import { ResetPassword } from "../app/auth/reset-password";

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
          Component: Landing
        },
        {
          path: "/units",
          Component: UnitsApp
        },
        {
          path: "/buildings",
          Component: BuildingApp
        },
        {
          path: "/favorites",
          Component: FavoritesApp
        },
        {
          path: "/unit/:idUnidad",
          Component: UnitApp
        },
      ]
    }
  ]
}
]);
