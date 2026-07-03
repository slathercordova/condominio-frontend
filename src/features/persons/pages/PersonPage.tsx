import { useEffect } from "react";
import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader";
import { usePersonPage } from "../hooks/usePersonPage";
import {
  Table,
  type Column,
} from "../../../common/components/ui-kit/Table/Table";
import type { PersonDto } from "../types/person-types";
import { RowActions } from "../../../common/components/ui-kit/RowActions/RowActions";
import { Pagination } from "../../../common/components/ui-kit/Pagination/Pagination";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { Modal } from "../../../common/components/ui-kit/Modal/Modal";
import { PersonForm } from "./PersonForm";

export function PersonPage() {
  const PAGE_SIZE = 3;

  const {
    loading,
    error,
    fetchPersons,
    persons,
    pagination,
    handleNuevaPersona,
    handleCloseModal,
    isCreateModalOpen,
  } = usePersonPage();

  const uiPage = (pagination?.page ?? 0) + 1;
  const uiTotalPages = pagination?.totalPages ?? 0;

  const columns: Column<PersonDto>[] = [
    {
      header: "Tipo Documento",
      render: (p: PersonDto) => p.tipoDocumentoNombre,
    },
    {
      header: "Documento",
      render: (p: PersonDto) => p.numeroDocumento,
    },
    {
      header: "Nombre completo",
      render: (p: PersonDto) =>
        p.nombres
          .concat(" " + p.apellidoPaterno)
          .concat(" " + p.apellidoMaterno),
    },
    {
      header: "Apellido",
      render: (p: PersonDto) => p.apellidoPaterno,
    },
    {
      header: "Correo",
      render: (p: PersonDto) => p.correo,
    },
    {
      header: "Estado",
      render: (p: PersonDto) => (p.estado ? "Activo" : "Inactivo"),
    },

    {
      header: "Acciones",
      render: (p: PersonDto) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => console.log("Ver", p.id)}
          onEdit={() => console.log("Editar", p.id)}
          onDelete={() => console.log("Eliminar", p.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchPersons({ page: 0, size: PAGE_SIZE });
  }, []);

  return (
    <div className="page-content">
      <PageHeader titulo="PERSONAS" subtitulo="Adminstración de personas" />

      <div>FILTROS</div>

      <Button
        desc="Nuevo"
        modo="INS"
        onClick={handleNuevaPersona}
        type="button"
        title="Nueva persona"
      />

      <Table data={persons} columns={columns} rowKey={(p) => p.id} />

      <div>
        BOTONES QUE HACEN ACCIONES EXTRAS AL SELECCIONAR UN REGISTRO DE LA TABLA
      </div>

      <Pagination
        page={uiPage}
        totalPages={uiTotalPages}
        onChange={(uiPage) =>
          fetchPersons({ page: uiPage - 1, size: PAGE_SIZE })
        }
      />

      <Modal
        open={isCreateModalOpen}
        title="Crear nueva persona"
        onClose={handleCloseModal}
      >
        <PersonForm onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}
