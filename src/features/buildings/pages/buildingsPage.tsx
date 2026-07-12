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
import { Loading } from "../../../common/components/ui-kit/Loading/Loading";
import { Skeleton } from "../../../common/components/ui-kit/Skeleton/Skeleton";
import { PageContainer } from "../../../common/components/ui-kit/PageContainer/PageContainer";
import { ActionBar } from "../../../common/components/ui-kit/ActionBar/ActionBar";
import { ActionSection } from "../../../common/components/ui-kit/ActionSection/ActionSection";
import { Badge } from "../../../common/components/ui-kit/Badge/Badge";
import { Plus } from "lucide-react";

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
    handleCalcularDeuda,
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
      header: "Gasto Total",
      render: (p: BuildingDetailResponse) => p.gastoTotal,
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
      render: (p: BuildingDetailResponse) => (
        <Badge color={p.estado ? "success" : "danger"}>
          {p.estado ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },

    {
      header: "Acciones",
      align: "center",
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

  if (loadingBuildings) {
    return (
      <>
        <Loading text="Consultando edificios..." />{" "}
        <Skeleton type="table" rows={5} height={35} />
      </>
    );
  }

  return (
    <div className="page-content">
      <PageHeader titulo="EDIFICIOS" subtitulo="Administración de edificio" />

      <PageContainer>
        <ActionBar>
          <Button
            modo={"INS"}
            icon={Plus}
            desc="Nuevo"
            onClick={openCrudModal}
            type="button"
            title="Nueva unidad"
          />
        </ActionBar>

        <Table
          data={listBuildings}
          columns={columns}
          rowKey={(p) => p.id}
          // selectedRowKey={selectedRow?.id}
          // onRowClick={setSelectedRow}
        />

        <Pagination
          page={uiPage}
          totalPages={uiTotalPages}
          pageElements={pagination?.size}
          totalElements={pagination?.totalElements}
          pageSize={pagination?.size}
          onChange={(uiPage) =>
            loadBuildings({
              page: uiPage - 1,
              size: pagination?.size,
            })
          }
        />

        <ActionSection>
          <Button
            modo={"UPD"}
            desc="Calcular Participación"
            onClick={handleCalcularParticipacion}
            type="button"
            title="Calcular Participación"
          />

          <Button
            modo={"UPD"}
            desc="Calcular Deuda"
            onClick={handleCalcularDeuda}
            type="button"
            title="Calcular Deuda"
          />
        </ActionSection>
      </PageContainer>

      <Modal
        open={isCrudModal}
        title={getModalTitle()}
        onClose={handleCloseCrudModal}
        size="lg"
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
