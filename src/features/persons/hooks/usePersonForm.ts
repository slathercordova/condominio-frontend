import { useState } from "react";
import type {
  DocumentDetailResponse,
  DocumentFilters,
} from "../types/document-types";
import { getAllTipoDocumento } from "../services/person-service";

export function usePersonForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [documents, setDocuments] = useState<DocumentDetailResponse[]>([]);

  const fetchDocuments = async (filter?: DocumentFilters) => {
    setLoading(true);
    setError(null);

    getAllTipoDocumento(filter)
      .then((response) => {
        if (response.data) {
          setDocuments(response.data.content);
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
    documents,
    error,
    loading,
    fetchDocuments,
  };
}
