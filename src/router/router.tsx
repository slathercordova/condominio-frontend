import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../app/auth/sign-in";
import { Landing } from "../app/landing/landing";
import { MainLayout } from "../common/layouts/main-layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: SignIn,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "landing",
        Component: Landing
      },
      /*{
        path: "units/:id",
        Component: UnitDetailPage
      }*/
    ]
  }
]);
