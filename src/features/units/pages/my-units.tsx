import { UnidadCard } from "../component/unit-card";
import { Loading } from "../../../common/components/ui-kit/Loading/Loading";
import { Skeleton } from "../../../common/components/ui-kit/Skeleton/Skeleton";
import { EmptyState } from "../../../common/components/ui-kit/EmptyState/EmptyState";
import { useMyUnits } from "../hooks/useMyUnits";

export function MyUnitsPage() {
  const { loading, unidades, pagarRecibo, pagandoUnidad } =
    useMyUnits();

  if (loading)
    return (
      <>
        <Loading text="Consultando mis unidades..." />{" "}
        <Skeleton type="table" rows={5} height={35} />
      </>
    );

  if (unidades.length === 0)
    return (
      <>
        <EmptyState
          title="No hay datos"
          description="No tienes unidades registradas en este edificio."
        />
      </>
    );

  return (
    <div className="page-content">
      <h2>Bienvenido, {unidades[0]?.personaNombre}</h2>
      <p>Estas son las unidades asociadas a tu cuenta:</p>

      {/* 🚀 MAPEO DE LA COLECCIÓN EN CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "15px",
        }}
      >
        {unidades.map((item) => (
          <UnidadCard
            key={item.idPersonaUnidad} // Llave única requerida por React para optimizar el DOM
            unidad={item} // Pasamos el objeto completo como prop
            onPagar={pagarRecibo}
            pagandoUnidad={pagandoUnidad}
          />
        ))}
      </div>
    </div>
  );
}
