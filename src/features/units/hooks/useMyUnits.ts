import { useEffect, useState } from "react";
import { MyUnitsWs, PagarReciboUnidadWs } from "../services/units-service";
import { useAuthStore } from "../../auth/store/auth-store";
import type { UnidadUsuarioType } from "../types/unit-types";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { handleApiError } from "../../../common/security/handleApiError";

export function useMyUnits() {
  //  sesion
  const usuario = useAuthStore((state) => state.usuario);
  const accessToken = usuario?.accessToken;
  const usuarioId = usuario?.idUsuario;

  //  variables a utilizar
  const [unidades, setUnidades] = useState<UnidadUsuarioType[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarUnidades = async () => {
    if (!accessToken || !usuarioId) {
      return;
    }
    try {
      setLoading(true);
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
  };

  useEffect(() => {
    cargarUnidades();
  }, [accessToken, usuarioId]);

  const [pagandoUnidad, setPagandoUnidad] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const pagarRecibo = (id: string) => {
    setPagandoUnidad(true);
    setError(null);
    return PagarReciboUnidadWs(id)
      .then(async (response) => {
        notification.success({ title: response.message });
        await cargarUnidades();
      })
      .catch((error) => {
        setError(error);
        handleApiError(error);
      })
      .finally(() => setPagandoUnidad(false));
  };

  return {
    loading,
    unidades,
    pagarRecibo,
    pagandoUnidad,
  };
}
