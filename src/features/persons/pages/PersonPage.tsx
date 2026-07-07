import { useEffect } from "react";
import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader";
import { usePersonPage } from "../hooks/usePersonPage";
import {
  Table,
  type Column,
} from "../../../common/components/ui-kit/Table/Table";
import type { PersonDto, personPostRequest } from "../types/person-types";
import { RowActions } from "../../../common/components/ui-kit/RowActions/RowActions";
import { Pagination } from "../../../common/components/ui-kit/Pagination/Pagination";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { Modal } from "../../../common/components/ui-kit/Modal/Modal";
import { PersonForm } from "./PersonForm";
import { FORM_MODE } from "../../../common/constants/formMode";
import { PersonAssignUnit } from "./PersonAssignUnit";

export function PersonPage() {
  const {
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
          onView={() => openDisplayModal(p.id)}
          onEdit={() => openEditModal(p.id)}
          onDelete={() => deletePerson(p.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    loadPersons({ page: pagination?.page, size: pagination?.size });
  }, []);

  const handleSave = (request: personPostRequest) => {
    if (modo === FORM_MODE.INSERT) {
      createPerson(request);
    } else if (selectedPerson) {
      updatePerson(selectedPerson.id, request);
    }
  };

  const getCrudModalTitle = () => {
    switch (modo) {
      case FORM_MODE.INSERT:
        return "Crear persona";
      case FORM_MODE.UPDATE:
        return "Modificar persona";
      case FORM_MODE.DISPLAY:
        return "Consultar persona";
      default:
        return "";
    }
  };

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

      <Table
        data={persons}
        columns={columns}
        rowKey={(p) => p.id}
        selectedRowKey={selectedRow?.id}
        onRowClick={setSelectedRow}
      />

      <div>
        BOTONES QUE HACEN ACCIONES EXTRAS AL SELECCIONAR UN REGISTRO DE LA TABLA
        <Button
          desc="Asignar unidades"
          modo="UPD"
          onClick={openAssignModal}
          type="button"
          title="Asignar unidades"
          disabled={!selectedRow}
        />
      </div>

      <Pagination
        page={uiPage}
        totalPages={uiTotalPages}
        onChange={(uiPage) =>
          loadPersons({ page: uiPage - 1, size: pagination?.size })
        }
      />

      <Modal
        open={crudModalOpen}
        title={getCrudModalTitle()}
        onClose={handleCloseModal}
      >
        <PersonForm
          onCancel={handleCloseModal}
          onSubmit={handleSave}
          saving={savingPerson}
          modo={modo}
          person={selectedPerson}
        />
      </Modal>

      <Modal
        open={assingModalOpen}
        title={"Asignación de unidades a la persona"}
        onClose={handleCloseModal}
      >
        <PersonAssignUnit
          onCancel={handleCloseModal}
          onSubmit={handleGrabaAsignacion}
          saving={false}
          person={selectedRow}
        />
      </Modal>
    </div>
  );
}
