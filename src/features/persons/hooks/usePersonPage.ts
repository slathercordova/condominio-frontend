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

export function usePersonPage() {
  const DEFAULT_PAGE_SIZE = 3;

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState<PersonDto | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
    setModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setModo(FORM_MODE.UPDATE);
    getPerson(id);
    setModalOpen(true);
  };

  const openDisplayModal = (id: string) => {
    setModo(FORM_MODE.DISPLAY);
    getPerson(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const refreshCurrentPage = () => {
    loadPersons({
      page: pagination?.page ?? 0,
      size: pagination?.size ?? DEFAULT_PAGE_SIZE,
    });
  };

  const openAssignModal = () => {
    setModalOpen(true);
  };

  return {
    error,
    persons,
    pagination,
    handleNuevaPersona,
    handleCloseModal,
    isModalOpen,
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
  };
}
