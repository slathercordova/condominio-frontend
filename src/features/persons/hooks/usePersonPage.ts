import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonDto, PersonFilters } from "../types/person-types";
import { deletePersona, personaList } from "../services/person-service";
import type { Pagination } from "../../../common/types/pagination";
import { handleApiError } from "../../../common/security/handleApiError";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";

export function usePersonPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [persons, setPersons] = useState<PersonDto[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>({
    page: 0,
    size: 3,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
  });

  const PAGE_SIZE = 3;

  const fetchPersons = async (filter?: PersonFilters) => {
    setLoading(true);
    setError(null);

    personaList(filter)
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
        setLoading(false);
      });
  };

  const fetchDeletePerson = async (id: string) => {
    setLoading(true);
    setError(null);

    deletePersona(id)
      .then(() => {
        notification.success({ title: "Persona eliminada correctamente" });

        refreshCurrentPage();
      })
      .catch(handleApiError)
      .finally(() => {
        setLoading(false);
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
    fetchPersons({
      page: pagination?.page ?? 0,
      size: PAGE_SIZE,
    });
  };

  return {
    loading,
    error,
    fetchPersons,
    persons,
    pagination,
    handleNuevaPersona,
    handleCloseModal,
    isCreateModalOpen,
    fetchDeletePerson,
  };
}
