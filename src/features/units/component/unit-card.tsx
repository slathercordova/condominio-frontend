import { useNavigate } from "react-router-dom";
import { type UnidadUsuarioType} from "../types/mis-unidades";

interface UnidadCardProps {
  unidad: UnidadUsuarioType;
}

export function UnidadCard({ unidad }: UnidadCardProps) {

  const navigate = useNavigate();
  
  const handleUnidad = () => {
    navigate(`/unit/${unidad.idUnidad}`)
  }


  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      {/* Visual Anchor: Un emoji o icono según el tipo de unidad */}
      <h3>
        {unidad.tipoUnidad === "COCHERA" ? "🚗" : "🏢"} {unidad.tipoUnidad}: {unidad.codigo}
      </h3>
      
      <p><strong>Edificio:</strong> {unidad.edificioNombre}</p>
      <p><strong>Dirección:</strong> {unidad.edificioDireccion}</p>
      <p><strong>Metraje:</strong> {unidad.metraje} m²</p>
      
      <button 
        onClick={handleUnidad}
        style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}
      >
        Gestionar Unidad
      </button>
    </div>
  );
}