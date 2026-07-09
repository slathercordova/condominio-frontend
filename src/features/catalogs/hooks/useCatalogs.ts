import { useState } from "react";
import type { CatalogResponse } from "../types/catalog-type";
import {
  ListPeriodoMoraWs,
  ListTipoAlquilerWs,
  ListTipoCobroWs,
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

  const [loadingTipoCobro, setLoadingTipoCobro] = useState(false);
  const [errorTipoCobro, setErrorTipoCobro] = useState<Error | null>(null);
  const [listTipoCobro, setListTipoCobro] = useState<CatalogResponse[]>([]);

  const fetchTipoCobro = () => {
    setLoadingTipoCobro(true);
    setErrorTipoCobro(null);

    ListTipoCobroWs()
      .then((response) => {
        if (response.data) {
          setListTipoCobro(response.data);
        }
      })
      .catch((error) => {
        setErrorTipoCobro(error);
        handleApiError(error);
      })
      .finally(() => {
        setLoadingTipoCobro(false);
      });
  };

  const [loadingPeriMora, setLoadingPeriMora] = useState(false);
  const [errorPeriMora, setErrorPeriMora] = useState<Error | null>(null);
  const [listPeriMora, setListPeriMora] = useState<CatalogResponse[]>([]);

  const fetchPeriodoMora = () => {
    setLoadingPeriMora(true);
    setErrorPeriMora(null);

    ListPeriodoMoraWs()
      .then((response) => {
        if (response.data) {
          setListPeriMora(response.data);
        }
      })
      .catch((error) => {
        setErrorPeriMora(error);
        handleApiError(error);
      })
      .finally(() => {
        setLoadingPeriMora(false);
      });
  };

  return {
    fetchTipoUnidad,
    listCatalogs,
    fetchTipoAlquiler,
    listTipoAlquiler,
    fetchTipoPropiedad,
    listTipoProp,
    loadingCatalog,
    errorCatalog,
    loadingTipoAlquiler,
    errorTipoAlquiler,
    loadingTipoProp,
    errorTipoProp,
    fetchPeriodoMora,
    fetchTipoCobro,
    listPeriMora,
    listTipoCobro,
  };
}
