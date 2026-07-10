import { useState } from "react";
import type {
  PersonaUnidadRequest,
  UnitDetailResponse,
  UnitFilter,
  UnitRequest,
} from "../types/unit-types";
import {
  AsignUnitPersonWs,
  deleteUnitWs,
  getUnitWs,
  postUnitWs,
  putUnitWs,
  unitListWs,
} from "../services/units-service";
import type { Pagination } from "../../../common/types/pagination";
import { handleApiError } from "../../../common/security/handleApiError";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { useAuthStore } from "../../auth/store/auth-store";
import { FORM_MODE } from "../../../common/constants/formMode";
import { useCalcularParticipacion } from "../../buildings/hooks/useCalcularPartic";

export function useUnitPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const idEdificio = usuario?.idEdificio;
  const [modo, setModo] = useState("");

  const DEFAULT_PAGE_SIZE = 10;

  const [loadingUnits, setLoadingUnits] = useState(false);
  const [units, setUnits] = useState<UnitDetailResponse[]>([]);

  const [savingUnit, setSavingUnit] = useState(false);
  const [gettingUnit, setGettingUnit] = useState(false);
  const [updatingUnit, setUpdatingUnit] = useState(false);
  const [deletingUnit, setDeletingUnit] = useState(false);

  const [loadingAsign, setLoadingAsign] = useState(false);

  const [selectedRow, setSelectedRow] = useState<UnitDetailResponse | null>(
    null,
  );

  const [selectedUnit, setSelectedUnit] = useState<UnitDetailResponse | null>(
    null,
  );

  const { CalcularParticipacion } = useCalcularParticipacion();

  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  //  Confirm deletet
  const [isDialogDelete, setIsDialogDelete] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState<UnitDetailResponse | null>(
    null,
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

  const loadUnits = async (filter?: UnitFilter) => {
    setLoadingUnits(true);
    setError(null);

    unitListWs(filter)
      .then((response) => {
        if (response.data) {
          setUnits(response.data.content);
          setPagination(response.data.pagination);
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setLoadingUnits(false);
      });
  };

  const createUnit = async (request: UnitRequest) => {
    setSavingUnit(true);
    setError(null);

    postUnitWs(request)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Unidad creada correctamente" });
          handleCloseModal();
          refreshCurrentPage();
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setSavingUnit(false);
      });
  };

  const getUnit = async (id: string) => {
    setSelectedUnit(null);
    setGettingUnit(true);
    setError(null);

    getUnitWs(id)
      .then((response) => {
        if (response.data) {
          setSelectedUnit(response.data);
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setGettingUnit(false);
      });
  };

  const updateUnit = async (id: string, request: UnitRequest) => {
    console.log("entra a update?");
    setUpdatingUnit(true);
    setError(null);

    putUnitWs(id, request)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Unidad actualizada correctamente" });
          handleCloseModal();
          refreshCurrentPage();
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setUpdatingUnit(false);
      });
  };

  const deleteUnit = async (id: string) => {
    setDeletingUnit(true);
    setError(null);

    deleteUnitWs(id)
      .then(() => {
        notification.success({ title: "Unidad eliminada correctamente" });
        refreshCurrentPage();
      })
      .catch(handleApiError)
      .finally(() => {
        setDeletingUnit(false);
      });
  };

  const AsignUnitPerson = async (request: PersonaUnidadRequest) => {
    setLoadingAsign(true);
    setError(null);

    AsignUnitPersonWs(request)
      .then(() => {
        notification.success({ title: "Unidad asignada correctamente" });
        refreshCurrentPage();
      })
      .catch(handleApiError)
      .finally(() => {
        setLoadingAsign(false);
      });
  };

  const openNewUnitModal = () => {
    setModo(FORM_MODE.INSERT);
    setSelectedUnit(null);
    setModalOpen(true);
  };

  const openEditUnitModal = (id: string) => {
    setModo(FORM_MODE.UPDATE);
    getUnit(id);
    setModalOpen(true);
  };

  const openDisplayUnitModal = (id: string) => {
    setModo(FORM_MODE.DISPLAY);
    getUnit(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const refreshCurrentPage = () => {
    loadUnits({
      idEdificio: idEdificio ?? "",
      page: pagination?.page ?? 0,
      size: pagination?.size ?? DEFAULT_PAGE_SIZE,
    });
  };

  const handleCalcularParticipacion = async () => {
    await CalcularParticipacion(idEdificio ?? "");
    refreshCurrentPage();
  };

  // Delete dialog
  const openDeleteDialog = (unit: UnitDetailResponse) => {
    setUnitToDelete(unit);
    setIsDialogDelete(true);
  };

  const closeDeleteDialog = () => {
    setUnitToDelete(null);
    setIsDialogDelete(false);
  };

  const confirmDelete = async () => {
    if (!unitToDelete) return;

    await deleteUnit(unitToDelete.id);
    closeDeleteDialog();
    refreshCurrentPage();
  };

  return {
    loadingUnits,
    loadUnits,
    units,
    pagination,
    createUnit,
    handleCloseModal,
    refreshCurrentPage,
    openNewUnitModal,
    openEditUnitModal,
    openDisplayUnitModal,
    isModalOpen,
    modo,
    savingUnit,
    getUnit,
    selectedUnit,
    updateUnit,
    deleteUnit,
    handleCalcularParticipacion,
    selectedRow,
    setSelectedRow,
    AsignUnitPerson,

    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    unitToDelete,
    isDialogDelete,
  };
}
