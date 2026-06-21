import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <header>
        Navbar aquí
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}