import {
  Building,
  Building2,
  DoorOpen,
  IdCard,
  Paintbrush,
  ShieldCheck,
  TableProperties,
  UserCog,
  Users,
} from "lucide-react";
import { DropdownCom } from "../ui-kit/DropDown/Dropdown";
import styles from "./AdministracionMenu.module.css";
import { useNavigate } from "react-router-dom";

export function AdministracionMenu() {
  const navigate = useNavigate();

  const handlePersonas = () => {
    navigate("/persons", { replace: true });
  };

  const handleEstilos = () => {
    navigate("/utilitarios", { replace: true });
  };

  return (
    <DropdownCom
      trigger={
        <div className={styles.trigger}>
          <TableProperties className={styles.icons} size={30} />
          <span>ADMINISTRACIÓN</span>
        </div>
      }
    >
      <div className={styles.item}>
        <IdCard />
        Tipo Documento
      </div>
      <div className={styles.item} onClick={handlePersonas}>
        <Users />
        Personas
      </div>
      <div className={styles.item}>
        <UserCog />
        Usuarios
      </div>
      <div className={styles.item}>
        <ShieldCheck />
        Roles
      </div>
      <div className={styles.item}>
        <Building2 />
        Empresas
      </div>
      <div className={styles.item}>
        <Building />
        Edificios
      </div>
      <div className={styles.item}>
        <DoorOpen />
        Unidades
      </div>
      <div className={styles.item} onClick={handleEstilos}>
        <Paintbrush/>
        Diseños de prueba
      </div>
    </DropdownCom>
  );
}
