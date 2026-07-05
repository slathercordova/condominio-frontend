import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  personaListWs,
  postPersonaWs,
} from "../services/person-service";

export function usePersonPage() {
  const DEFAULT_PAGE_SIZE = 3;

  const navigate = useNavigate();
  const [loadingPersons, setLoadingPersons] = useState(false);
  const [savingPerson, setSavingPerson] = useState(false);
  const [deletingPerson, setDeletingPerson] = useState(false);
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleNuevaPersona = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const refreshCurrentPage = () => {
    loadPersons({
      page: pagination?.page ?? 0,
      size: pagination?.size ?? DEFAULT_PAGE_SIZE,
    });
  };

  return {
    error,
    persons,
    pagination,
    handleNuevaPersona,
    handleCloseModal,
    isCreateModalOpen,
    loadPersons,
    createPerson,
    deletePerson,
    loadingPersons,
    savingPerson,
    deletingPerson,
    refreshCurrentPage,
  };
}
