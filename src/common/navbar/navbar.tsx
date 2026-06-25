import { Building, DoorOpen, Heart, House, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../images/edificio_logo.png";
import { useAuthStore } from "../../features/auth/store/auth-store";

export function NavBar() {
  //  TODO: poner el logo del edificio luego de BD
  //  TODO: poner el nombre del edificio luego de BD
  //  TODO: mensajes son TODO FIXME BUG HACK

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // TODO: debería de llamar al endpoint que invalida el refresh token
    logout();
    localStorage.removeItem('auth-storage');
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src={logo} alt="Ícono de aplicación" className={styles.logo} />

        <h1>App edificio - nombre</h1>
      </div>

      <nav className={styles.nav}>
        <Link to="/landing" /*className={styles.link}*/>
          <House size={20} />
          Home
        </Link>

        <Link to="/buildings" /*className={styles.highlight}*/>
          <Building size={20} />
          EDIFICIOS
        </Link>

        <Link to="/units" className={styles.highlight}>
          <DoorOpen size={20} />
          UNIDADES
        </Link>

        <Link to="/favorites" /*className={styles.link}*/>
          <Heart size={20} />
          FAVORITOS
        </Link>

        <button type="button" onClick={handleLogout}>
          <LogOut size={20} />
          LOG-OUT
        </button>
      </nav>
    </header>
  );
}
