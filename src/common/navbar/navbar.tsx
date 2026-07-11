import { Building, Building2, DoorOpen, Heart, House } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../images/edificio_logo.png";
import { UserMenuCom } from "../components/UserMenu/UserMenu";
import { AdministracionMenu } from "../components/AdministracionMenu/AdministracionMenu";
import { useAuthStore } from "../../features/auth/store/auth-store";

export function NavBar() {
  //  TODO: poner el logo del edificio luego de BD
  //  TODO: poner el nombre del edificio luego de BD
  //  TODO: mensajes son TODO FIXME BUG HACK
  const usuario = useAuthStore((state) => state.usuario);
  const esAdmin =
    usuario?.roles.some(
      (item) =>
        item.nombre === "ADMINISTRADOR" || item.nombre === "ADMINISTRACION",
    ) ?? false;

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Building2 color="white" size={40}/>
        {/* <img src={logo} alt="Ícono de aplicación" className={styles.logo} /> */}

        <h1>App edificio - {usuario?.nombreEdificio}</h1>
      </div>

      <nav className={styles.nav}>
        <Link to="/landing" /*className={styles.link}*/>
          <House size={20} />
          Home
        </Link>

        {esAdmin && <AdministracionMenu />}

        <Link to="/buildings" /*className={styles.highlight}*/>
          <Building size={20} />
          MIS EDIFICIOS
        </Link>

        <Link to="/my-units" className={styles.highlight}>
          <DoorOpen size={20} />
          MIS UNIDADES
        </Link>

        <Link to="/favorites" /*className={styles.link}*/>
          <Heart size={20} />
          FAVORITOS
        </Link>

        <UserMenuCom />
      </nav>
    </header>
  );
}
