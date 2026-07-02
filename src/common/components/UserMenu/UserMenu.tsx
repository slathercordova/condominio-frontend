import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/auth-store";
import { LogOut } from "lucide-react";
import styles from "./UserMenu.module.css";
import { DropdownCom } from "../ui-kit/DropDown/Dropdown";
import { Separator } from "../ui-kit/Separator/Separator";
import { Avatar } from "../ui-kit/Avatar/Avatar";

export function UserMenuCom() {
  const usuario = useAuthStore((state) => state.usuario);
  const initials = `${usuario?.nombres?.[0] ?? ""}${usuario?.apellidoPaterno?.[0] ?? ""}`;
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // TODO: debería de llamar al endpoint que invalida el refresh token
    logout();
    localStorage.removeItem("auth-storage");
    navigate("/login", { replace: true });
  };

  return (
    <DropdownCom
      trigger={<Avatar initials={initials} size="md" status="online" />}
    >
      <div className={styles.header}>
        <strong>{usuario?.nombreCompleto}</strong>
        <span>{usuario?.roles.map((r) => r.nombre).join(" | ")}</span>
        <span>{usuario?.nombreEdificio}</span>
      </div>

      <Separator variant="solid" />

      <div className={styles.item}>Mi perfil</div>
      <div className={styles.item}>Cambiar contraseña</div>

      <Separator variant="solid" />

      <div className={styles.item} onClick={handleLogout}>
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </div>
    </DropdownCom>
  );
}
