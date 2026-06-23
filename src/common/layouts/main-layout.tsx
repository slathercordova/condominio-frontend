import { Outlet } from "react-router-dom";
import { NavBar } from "../navbar/navbar";

export function MainLayout() {
  return (
    <div>
      <NavBar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
