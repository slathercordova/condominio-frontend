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
import { UnitSearchModal } from "../../../common/components/prompt/unit/unit-search";
import { ConfirmDialog } from "../../../common/components/ui-kit/ConfirmDialog/ConfirmDialog";
import { Loading } from "../../../common/components/ui-kit/Loading/Loading";
import { Skeleton } from "../../../common/components/ui-kit/Skeleton/Skeleton";

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
          onDelete={() => openDeleteDialog(p)}
        />
      ),
    },
  ];

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

  useEffect(() => {
    loadPersons({ page: pagination?.page, size: pagination?.size });
  }, []);

  if (loadingPersons) {
    return (
      <>
        <Loading text="Consultando personas..." />{" "}
        <Skeleton type="table" rows={5} height={35} />
      </>
    );
  }

  return (
    <div className="page-content">
      <PageHeader titulo="PERSONAS" subtitulo="Adminstración de personas" />

      <div className="actions">
        <Button
          desc="Nuevo"
          modo="INS"
          onClick={handleNuevaPersona}
          type="button"
          title="Nueva persona"
        />
      </div>

      <Table
        data={persons}
        columns={columns}
        rowKey={(p) => p.id}
        selectedRowKey={selectedRow?.id}
        onRowClick={setSelectedRow}
      />

      <div>
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
        onClose={handleCloseAssignModal}
      >
        <PersonAssignUnit
          onCancel={handleCloseAssignModal}
          onSubmit={handleGrabaAsignacion}
          saving={false}
          person={selectedRow}
          selectedUnit={selectedUnit}
          onSearchUnit={openSearchUnitModal}
        />
      </Modal>

      <Modal
        open={isSearchUnitModalOpen}
        title="Buscar unidad"
        onClose={handleCloseSearchModal}
      >
        <UnitSearchModal onSelect={handleSelectUnit} />
      </Modal>

      <ConfirmDialog
        open={isDialogDelete}
        message={`¿Seguro que deseas eliminar a "${personToDelete?.nombres} ${personToDelete?.apellidoPaterno}"? Esta acción no se puede deshacer.`}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
