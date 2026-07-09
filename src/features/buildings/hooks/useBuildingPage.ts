import { useState } from "react";
import {
  deleteBuildingWs,
  listBuildingsWs,
  postBuildingWs,
  putBuildingWs,
} from "../services/building-service";
import { handleApiError } from "../../../common/security/handleApiError";
import type {
  BuildingDetailResponse,
  BuildingFilters,
  BuildingRequest,
} from "../types/building-types";
import type { Pagination } from "../../../common/types/pagination";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { FORM_MODE } from "../../../common/constants/formMode";
import { useAuthStore } from "../../auth/store/auth-store";
import { useCalcularParticipacion } from "./useCalcularPartic";

export function useBuildingPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const idEdificio = usuario?.idEdificio;

  const DEFAULT_PAGE_SIZE = 10;
  const [modo, setModo] = useState("");
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deletingBuilding, setDeletingBuilding] = useState(false);
  const [creatingBuilding, setCreatingBuilding] = useState(false);
  const [updatingBuilding, setUpdatingBuilding] = useState(false);
  const [oneBuilding, setOneBuilding] = useState<BuildingDetailResponse | null>(
    null,
  );
  const [listBuildings, setListBuildings] = useState<BuildingDetailResponse[]>(
    [],
  );

  const [pagination, setPagination] = useState<Pagination | null>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
  });

  const { CalcularParticipacion } = useCalcularParticipacion();

  const loadBuildings = (filter: BuildingFilters) => {
    setLoadingBuildings(true);
    setError(null);

    return listBuildingsWs(filter)
      .then((response) => {
        if (response.data) {
          setListBuildings(response.data.content);
          setPagination(response.data.pagination);
        }
      })
      .catch(handleApiError)
      .finally(() => setLoadingBuildings(false));
  };

  const [isCrudModal, setIsCrudModal] = useState(false);
  const openCrudModal = () => {
    setModo(FORM_MODE.INSERT);
    setIsCrudModal(true);
  };

  const handleCloseCrudModal = () => {
    setOneBuilding(null);
    setModo("");
    setIsCrudModal(false);
  };

  const openDisplayModal = (id: string) => {
    setModo(FORM_MODE.DISPLAY);
    getBuilding(id);
    setIsCrudModal(true);
  };

  const openEditModal = (id: string) => {
    setModo(FORM_MODE.UPDATE);
    getBuilding(id);
    setIsCrudModal(true);
  };

  const deleteBuilding = (id: string) => {
    setDeletingBuilding(true);
    setError(null);
    return deleteBuildingWs(id)
      .then(() => {
        notification.success({ title: "Edificio eliminado correctamente" });
        refreshCurrentPage();
      })
      .catch((error) => {
        setError(error);
        handleApiError(error);
      })
      .finally(() => setDeletingBuilding(false));
  };

  const createBuilding = (data: BuildingRequest) => {
    setCreatingBuilding(true);
    setError(null);
    return postBuildingWs(data)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Se creó el edificio correctamente" });
          refreshCurrentPage();
          handleCloseCrudModal();
        }
      })
      .catch((error) => {
        setError(error);
        handleApiError(error);
      })
      .finally(() => setCreatingBuilding(false));
  };

  const getBuilding = (id: string) => {
    const filter: BuildingFilters = { id: id };
    return listBuildingsWs(filter)
      .then((response) => {
        if (response.data?.content[0]) {
          setOneBuilding(response.data.content[0]);
        }
      })
      .catch(handleApiError)
      .finally(() => setLoadingBuildings(false));
  };

  const updateBuilding = (id: string, data: BuildingRequest) => {
    setUpdatingBuilding(true);
    setError(null);
    return putBuildingWs(id, data)
      .then((response) => {
        if (response.data) {
          notification.success({
            title: "Se actualizó el edificio correctamente",
          });
          refreshCurrentPage();
          handleCloseCrudModal();
        }
      })
      .catch((error) => {
        setError(error);
        handleApiError(error);
      })
      .finally(() => setUpdatingBuilding(false));
  };

  const refreshCurrentPage = () => {
    loadBuildings({
      page: pagination?.page ?? 0,
      size: pagination?.size ?? DEFAULT_PAGE_SIZE,
    });
  };

  const handleCalcularParticipacion = async () => {
    await CalcularParticipacion(idEdificio ?? "");
    refreshCurrentPage();
  };

  return {
    openCrudModal,
    loadBuildings,
    pagination,
    listBuildings,
    loadingBuildings,
    error,
    handleCalcularParticipacion,
    openDisplayModal,
    openEditModal,
    deleteBuilding,
    isCrudModal,
    modo,
    handleCloseCrudModal,
    createBuilding,
    oneBuilding,
    updateBuilding,
  };
}
