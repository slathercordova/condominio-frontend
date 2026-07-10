import { useEffect, useState } from "react";
import { useAuthStore } from "../../auth/store/auth-store";
import { MyUnitsWs } from "../services/units-service";
import type { UnidadUsuarioType } from "../types/unit-types";
import { UnidadCard } from "../component/unit-card";
import { Loading } from "../../../common/components/ui-kit/Loading/Loading";
import { Skeleton } from "../../../common/components/ui-kit/Skeleton/Skeleton";
import { EmptyState } from "../../../common/components/ui-kit/EmptyState/EmptyState";

export function MyUnitsPage() {
  //  sesion
  const usuario = useAuthStore((state) => state.usuario);
  const accessToken = usuario?.accessToken;
  const usuarioId = usuario?.idUsuario;

  //  variables a utilizar
  const [unidades, setUnidades] = useState<UnidadUsuarioType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarUnidades() {
      if (!accessToken || !usuarioId) {
        return;
      }

      try {
        const data = await MyUnitsWs(accessToken, usuarioId);

        if (data.success && data.data) {
          setUnidades(data.data);
        } else {
          setUnidades([]);
        }
      } catch (error) {
        console.error("Error al cargar unidades", error);
      } finally {
        setLoading(false);
      }
    }

    cargarUnidades();
  }, [accessToken, usuarioId]);

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
          />
        ))}
      </div>
    </div>
  );
}
