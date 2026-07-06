import { useState } from "react";
import type {
  UnitDetailResponse,
  UnitFilter,
  UnitRequest,
} from "../types/mis-unidades";
import { postUnitWs, unitListWs } from "../services/units-service";
import type { Pagination } from "../../../common/types/pagination";
import { handleApiError } from "../../../common/security/handleApiError";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { useAuthStore } from "../../auth/store/auth-store";
import { FORM_MODE } from "../../../common/constants/formMode";

export function useUnitPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const idEdificio = usuario?.idEdificio;
  const [modo, setModo] = useState("");

  const DEFAULT_PAGE_SIZE = 10;

  const [loadingUnits, setLoadingUnits] = useState(false);
  const [units, setUnits] = useState<UnitDetailResponse[]>([]);

  const [savingUnit, setSavingUnit] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedUnit, setSelectedUnit] = useState<UnitDetailResponse | null>(
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

  const openNewUnitModal = () => {
    setModo(FORM_MODE.INSERT);
    setSelectedUnit(null);
    setModalOpen(true);
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
    isModalOpen,
    modo,
  };
}
