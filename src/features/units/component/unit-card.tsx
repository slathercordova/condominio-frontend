import { type UnidadUsuarioType } from "../types/unit-types";
import {
  Building2,
  CarFront,
  MapPin,
  Percent,
  Ruler,
  RulerDimensionLine,
} from "lucide-react";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import styles from "./unit-card.module.css";
import { Badge } from "../../../common/components/ui-kit/Badge/Badge";

interface UnidadCardProps {
  unidad: UnidadUsuarioType;
  onPagar: (id: string) => void;
  pagandoUnidad?: boolean;
}

export function UnidadCard({
  unidad,
  onPagar,
  pagandoUnidad,
}: UnidadCardProps) {
  const estadoRecibo = {
    PAGADO: {
      color: "success" as const,
      texto: "Pagado",
    },
    PENDIENTE: {
      color: "warning" as const,
      texto: "Pendiente",
    },
    VENCIDO: {
      color: "danger" as const,
      texto: "Vencido",
    },
  };

  const estado = estadoRecibo[unidad.estadoRecibo];

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

        {/* <Heart className={styles.favorite} size={22} /> */}
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
            <RulerDimensionLine size={18} />
            {unidad.metraje} m²
          </strong>
        </div>

        <div>
          <small>Porcentaje</small>
          <strong>
            <Ruler size={15} />
            {unidad.porcentaje}
            <Percent size={15} />
          </strong>
        </div>

        <div>
          <small>Estado</small>
          <Badge color={estado.color}>{estado.texto}</Badge>
          {/* <span
            className={tieneDeuda ? styles.badgeDanger : styles.badgeSuccess}
          >
            {tieneDeuda ? "Deuda pendiente" : "Al día"}
          </span> */}
        </div>
      </div>

      <div className={styles.deuda}>
        <small>Deuda pendiente</small>
        <strong>S/ {unidad.deudaTmp?.toFixed(2) ?? "0.00"}</strong>
      </div>

      <Button
        desc="Pagar recibo"
        modo="UPD"
        onClick={() => onPagar(unidad.idUnidad)}
        type="button"
        title="Pagar recibo"
        disabled={pagandoUnidad}
        fullWidth
      />
    </div>
  );
}
