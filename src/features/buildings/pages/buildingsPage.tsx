import { Button } from "../../../common/components/ui-kit/Button/Button";
import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader";
import { useBuildingPage } from "../hooks/useBuildingPage";
import { Pagination } from "../../../common/components/ui-kit/Pagination/Pagination";
import { Modal } from "../../../common/components/ui-kit/Modal/Modal";
import {
  Table,
  type Column,
} from "../../../common/components/ui-kit/Table/Table";
import type {
  BuildingDetailResponse,
  BuildingRequest,
} from "../types/building-types";
import { RowActions } from "../../../common/components/ui-kit/RowActions/RowActions";
import { useEffect } from "react";
import { FORM_MODE } from "../../../common/constants/formMode";
import { BuildingForm } from "./buildingForm";
import { ConfirmDialog } from "../../../common/components/ui-kit/ConfirmDialog/ConfirmDialog";

export function BudilignsPage() {
  const {
    openCrudModal,
    loadBuildings,
    pagination,
    listBuildings,
    loadingBuildings,
    error,
    handleCalcularParticipacion,
    openDisplayModal,
    openEditModal,
    deleteBuilding,
    isCrudModal,
    modo,
    handleCloseCrudModal,
    createBuilding,
    oneBuilding,
    updateBuilding,
    isDialogDelete,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    buildingToDelete,
  } = useBuildingPage();

  const uiPage = (pagination?.page ?? 0) + 1;
  const uiTotalPages = pagination?.totalPages ?? 0;

  const columns: Column<BuildingDetailResponse>[] = [
    {
      header: "Nombre",
      render: (p: BuildingDetailResponse) => p.nombre,
    },
    {
      header: "Dirección",
      render: (p: BuildingDetailResponse) => p.direccion,
    },
    {
      header: "Ruc",
      render: (p: BuildingDetailResponse) => p.ruc,
    },
    {
      header: "Tipo Cobro",
      render: (p: BuildingDetailResponse) => p.tipoCobro,
    },
    {
      header: "¿Aplica Mora?",
      render: (p: BuildingDetailResponse) => p.aplicaMora,
    },
    {
      header: "Monto mora",
      render: (p: BuildingDetailResponse) => p.montoMora,
    },
    {
      header: "Estado",
      render: (p: BuildingDetailResponse) => (p.estado ? "Activo" : "Inactivo"),
    },

    {
      header: "Acciones",
      render: (p: BuildingDetailResponse) => (
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

  const getModalTitle = () => {
    switch (modo) {
      case FORM_MODE.INSERT:
        return "Crear Edificio";
      case FORM_MODE.UPDATE:
        return "Modificar Edificio";
      case FORM_MODE.DISPLAY:
        return "Consultar Edificio";
      default:
        return "";
    }
  };

  const handleSave = (request: BuildingRequest) => {
    if (modo === FORM_MODE.INSERT) {
      createBuilding(request);
    } else if (oneBuilding) {
      updateBuilding(oneBuilding.id, request);
    }
  };

  useEffect(() => {
    loadBuildings({ page: pagination?.page, size: pagination?.size });
  }, []);

  return (
    <div className="page-content">
      <PageHeader titulo="EDIFICIOS" subtitulo="Administración de edificio" />

      <div>FILTROS</div>

      <Button
        modo={"INS"}
        desc="Nuevo"
        onClick={openCrudModal}
        type="button"
        title="Nueva unidad"
      />

      <Table
        data={listBuildings}
        columns={columns}
        rowKey={(p) => p.id}
        // selectedRowKey={selectedRow?.id}
        // onRowClick={setSelectedRow}
      />

      <div>
        BOTONES QUE HACEN ACCIONES EXTRAS AL SELECCIONAR UN REGISTRO DE LA TABLA
      </div>

      <Button
        modo={"UPD"}
        desc="Calcular Participación"
        onClick={handleCalcularParticipacion}
        type="button"
        title="Calcular Participación"
      />

      <Pagination
        page={uiPage}
        totalPages={uiTotalPages}
        onChange={(uiPage) =>
          loadBuildings({
            page: uiPage - 1,
            size: pagination?.size,
          })
        }
      />

      <Modal
        open={isCrudModal}
        title={getModalTitle()}
        onClose={handleCloseCrudModal}
      >
        <BuildingForm
          onCancel={handleCloseCrudModal}
          onSubmit={handleSave}
          // saving={false}
          modo={modo}
          building={oneBuilding}
        />
      </Modal>

      <ConfirmDialog
        open={isDialogDelete}
        message={`¿Seguro que deseas eliminar el edificio "${buildingToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
