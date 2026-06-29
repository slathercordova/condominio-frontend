import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/auth-store";
import { CircleUser, LogOut } from "lucide-react";
import styles from "./UserMenu.module.css";
import { DropdownCom } from "../ui-kit/DropDown/Dropdown";

export function UserMenuCom() {
  const usuario = useAuthStore(state => state.usuario);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // TODO: debería de llamar al endpoint que invalida el refresh token
    logout();
    localStorage.removeItem("auth-storage");
    navigate("/login", { replace: true });
  };

  return (
    <DropdownCom trigger={<CircleUser className={styles.user} size={30} />}>
      <div className={styles.header}>
        <strong>{usuario?.nombreCompleto}</strong>
        <span>{usuario?.roles.map(r=> r.nombre).join(" | ")}</span>
        <span>{usuario?.nombreEdificio}</span>
      </div>

      <hr className="divider" />

      <div className={styles.item}>Mi perfil</div>
      <div className={styles.item}>Cambiar contraseña</div>

      <hr className="divider" />

      <div className={styles.item} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </div>
    </DropdownCom>
  );
}
