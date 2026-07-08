import { useState } from "react";
import type { CatalogResponse } from "../types/catalog-type";
import {
  ListTipoAlquilerWs,
  ListTipoPropiedadWs,
  ListTipoUnidadWs,
} from "../services/catalog-service";
import { handleApiError } from "../../../common/security/handleApiError";

export function useCatalog() {
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [errorCatalog, setErrorCatalog] = useState<Error | null>(null);
  const [listCatalogs, setListCatalogs] = useState<CatalogResponse[]>([]);

  const fetchTipoUnidad = async () => {
    setLoadingCatalog(true);
    setErrorCatalog(null);

    ListTipoUnidadWs()
      .then((response) => {
        if (response.data) {
          setListCatalogs(response.data);
        }
      })
      .catch((error) => {
        setErrorCatalog(error);
        handleApiError(error);
      })
      .finally(() => {
        setLoadingCatalog(false);
      });
  };

  const [loadingTipoAlquiler, setLoadingTipoAlquiler] = useState(false);
  const [errorTipoAlquiler, setErrorTipoAlquiler] = useState<Error | null>(
    null,
  );
  const [listTipoAlquiler, setListTipoAlquiler] = useState<CatalogResponse[]>(
    [],
  );

  const fetchTipoAlquiler = async () => {
    setLoadingTipoAlquiler(true);
    setErrorTipoAlquiler(null);

    ListTipoAlquilerWs()
      .then((response) => {
        if (response.data) {
          setListTipoAlquiler(response.data);
        }
      })
      .catch((error) => {
        setErrorTipoAlquiler(error);
        handleApiError(error);
      })
      .finally(() => {
        setLoadingTipoAlquiler(false);
      });
  };

  const [loadingTipoProp, setLoadingTipoProp] = useState(false);
  const [errorTipoProp, setErrorTipoProp] = useState<Error | null>(null);
  const [listTipoProp, setListTipoProp] = useState<CatalogResponse[]>([]);

  const fetchTipoPropiedad = () => {
    setLoadingTipoProp(true);
    setErrorTipoProp(null);

    ListTipoPropiedadWs()
      .then((response) => {
        if (response.data) {
          setListTipoProp(response.data);
        }
      })
      .catch((error) => {
        setErrorTipoProp(error);
        handleApiError(error);
      })
      .finally(() => {
        setLoadingTipoProp(false);
      });
  };

  return {
    fetchTipoUnidad,
    listCatalogs,
    fetchTipoAlquiler,
    listTipoAlquiler,
    fetchTipoPropiedad,
    listTipoProp,
  };
}
