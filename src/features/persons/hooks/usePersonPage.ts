import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonDto, PersonFilters } from "../types/person-types";
import { personaList } from "../services/person-service";
import type { Pagination } from "../../../common/types/pagination";

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

  return {
    loading,
    error,
    fetchPersons,
    persons,
    pagination,
  };
}
