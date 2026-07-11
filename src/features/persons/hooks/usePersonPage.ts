import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import type {
  PersonDto,
  PersonFilters,
  personPostRequest,
} from "../types/person-types";
import type { Pagination } from "../../../common/types/pagination";
import { handleApiError } from "../../../common/security/handleApiError";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import {
  deletePersonaWs,
  getPersonaWs,
  personaListWs,
  postPersonaWs,
  putPersonaWs,
} from "../services/person-service";
import { FORM_MODE } from "../../../common/constants/formMode";
import type {
  PersonaUnidadRequest,
  UnitDetailResponse,
} from "../../units/types/unit-types";
import { useUnitPage } from "../../units/hooks/useUnitPage";

export function usePersonPage() {
  const { AsignUnitPerson } = useUnitPage();
  const DEFAULT_PAGE_SIZE = 10;

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState<PersonDto | null>(null);
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [assingModalOpen, setAssingModalOpen] = useState(false);
  const [isSearchUnitModalOpen, setSearchUnitModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitDetailResponse | null>(
    null,
  );
  const [loadingPersons, setLoadingPersons] = useState(false);
  const [savingPerson, setSavingPerson] = useState(false);
  const [deletingPerson, setDeletingPerson] = useState(false);
  const [updatingPerson, setUpdatingPerson] = useState(false);
  const [gettingPerson, setGettingPerson] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonDto | null>(null);
  const [modo, setModo] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [persons, setPersons] = useState<PersonDto[]>([]);
  const [filters, setFilters] = useState<PersonFilters>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
  });

  //  Confirm deletet
  const [isDialogDelete, setIsDialogDelete] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<PersonDto | null>(null);

  //  Paginacion
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

  const loadPersons = async (filter?: PersonFilters) => {
    setLoadingPersons(true);
    setError(null);

    personaListWs(filter)
      .then((response) => {
        if (response.data) {
          setPersons(response.data.content);
          setPagination(response.data.pagination);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadingPersons(false);
      });
  };

  const createPerson = async (request: personPostRequest) => {
    setSavingPerson(true);
    setError(null);

    postPersonaWs(request)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Persona creada correctamente" });
          handleCloseModal();
          refreshCurrentPage();
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setSavingPerson(false);
      });
  };

  const getPerson = async (id: string) => {
    setSelectedPerson(null);
    setGettingPerson(true);
    setError(null);

    getPersonaWs(id)
      .then((response) => {
        if (response.data) {
          setSelectedPerson(response.data);
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setGettingPerson(false);
      });
  };

  const updatePerson = async (id: string, request: personPostRequest) => {
    setUpdatingPerson(true);
    setError(null);

    putPersonaWs(id, request)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Persona actualizada correctamente" });
          handleCloseModal();
          refreshCurrentPage();
        }
      })
      .catch(handleApiError)
      .finally(() => {
        setUpdatingPerson(false);
      });
  };

  const deletePerson = async (id: string) => {
    setDeletingPerson(true);
    setError(null);

    deletePersonaWs(id)
      .then(() => {
        notification.success({ title: "Persona eliminada correctamente" });

        refreshCurrentPage();
      })
      .catch(handleApiError)
      .finally(() => {
        setDeletingPerson(false);
      });
  };

  const handleNuevaPersona = () => {
    setModo(FORM_MODE.INSERT);
    setSelectedPerson(null);
    setCrudModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setModo(FORM_MODE.UPDATE);
    getPerson(id);
    setCrudModalOpen(true);
  };

  const openDisplayModal = (id: string) => {
    setModo(FORM_MODE.DISPLAY);
    getPerson(id);
    setCrudModalOpen(true);
  };

  const handleCloseModal = () => {
    setCrudModalOpen(false);
  };

  const handleCloseAssignModal = () => {
    setSelectedUnit(null);
    setAssingModalOpen(false);
  };

  const handleCloseSearchModal = () => {
    setSearchUnitModalOpen(false);
  };

  const refreshCurrentPage = () => {
    loadPersons({
      page: pagination?.page ?? 0,
      size: pagination?.size ?? DEFAULT_PAGE_SIZE,
    });
  };

  const openAssignModal = () => {
    setAssingModalOpen(true);
  };

  const openSearchUnitModal = () => {
    setSearchUnitModalOpen(true);
  };

  const handleSelectUnit = (unit: UnitDetailResponse) => {
    setSelectedUnit(unit);
    handleCloseSearchModal();
  };

  const handleGrabaAsignacion = (request: PersonaUnidadRequest) => {
    AsignUnitPerson(request);
    handleCloseAssignModal();
  };

  // Delete dialog
  const openDeleteDialog = (person: PersonDto) => {
    setPersonToDelete(person);
    setIsDialogDelete(true);
  };

  const closeDeleteDialog = () => {
    setPersonToDelete(null);
    setIsDialogDelete(false);
  };

  const confirmDelete = async () => {
    if (!personToDelete) return;

    await deletePerson(personToDelete.id);
    closeDeleteDialog();
    refreshCurrentPage();
  };

  return {
    error,
    persons,
    pagination,
    handleNuevaPersona,
    handleCloseModal,
    crudModalOpen,
    loadPersons,
    createPerson,
    deletePerson,
    loadingPersons,
    savingPerson,
    deletingPerson,
    refreshCurrentPage,
    getPerson,
    selectedPerson,
    gettingPerson,
    openEditModal,
    modo,
    updatePerson,
    openDisplayModal,
    selectedRow,
    setSelectedRow,
    openAssignModal,
    setAssingModalOpen,
    assingModalOpen,
    handleGrabaAsignacion,
    isSearchUnitModalOpen,
    handleSelectUnit,
    selectedUnit,
    openSearchUnitModal,
    handleCloseAssignModal,
    handleCloseSearchModal,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    personToDelete,
    isDialogDelete,
  };
}
