import { useNavigate } from "react-router-dom";
import { type UnidadUsuarioType } from "../types/unit-types";
import { Building2, CarFront, Heart, MapPin, Ruler } from "lucide-react";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import styles from "./unit-card.module.css";

interface UnidadCardProps {
  unidad: UnidadUsuarioType;
}

export function UnidadCard({ unidad }: UnidadCardProps) {
  const navigate = useNavigate();

  const handleUnidad = () => {
    navigate(`/unit/${unidad.idUnidad}`);
  };

  const tieneDeuda = (unidad.deudaTmp ?? 0) > 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          {unidad.tipoUnidad === "COCHERA" ? (
            <CarFront size={34} />
          ) : (
            <Building2 size={34} />
          )}

          <div>
            <h3>{unidad.codigo}</h3>
            <span>{unidad.tipoUnidad}</span>
          </div>
        </div>

        <Heart className={styles.favorite} size={22} />
      </div>

      <div className={styles.info}>
        <p>
          <Building2 size={16} />
          {unidad.edificioNombre}
        </p>

        <p>
          <MapPin size={16} />
          {unidad.edificioDireccion}
        </p>
      </div>

      <div className={styles.stats}>
        <div>
          <small>Metraje</small>
          <strong>
            <Ruler size={15} />
            {unidad.metraje} m²
          </strong>
        </div>

        <div>
          <small>Estado</small>

          <span
            className={tieneDeuda ? styles.badgeDanger : styles.badgeSuccess}
          >
            {tieneDeuda ? "Pendiente" : "Al día"}
          </span>
        </div>
      </div>

      <div className={styles.deuda}>
        <small>Deuda pendiente</small>
        <strong>S/ {unidad.deudaTmp?.toFixed(2) ?? "0.00"}</strong>
      </div>

      <Button
        desc="Gestionar unidad"
        modo="UPD"
        onClick={handleUnidad}
        type="button"
        title="Gestionar unidad"
        fullWidth
      />
    </div>
  );
}
