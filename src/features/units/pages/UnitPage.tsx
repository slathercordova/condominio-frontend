import { Button } from "../../../common/components/ui-kit/Button/Button";
import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader";
import { useUnitPage } from "../hooks/useUnitPage";
import { useAuthStore } from "../../auth/store/auth-store";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import {
  Table,
  type Column,
} from "../../../common/components/ui-kit/Table/Table";
import type { UnitDetailResponse, UnitRequest } from "../types/unit-types";
import { RowActions } from "../../../common/components/ui-kit/RowActions/RowActions";
import { Pagination } from "../../../common/components/ui-kit/Pagination/Pagination";
import { Modal } from "../../../common/components/ui-kit/Modal/Modal";
import { FORM_MODE } from "../../../common/constants/formMode";
import { UnitForm } from "./UnitForm";
import { useEffect } from "react";
import { ConfirmDialog } from "../../../common/components/ui-kit/ConfirmDialog/ConfirmDialog";
import { Loading } from "../../../common/components/ui-kit/Loading/Loading";
import { Skeleton } from "../../../common/components/ui-kit/Skeleton/Skeleton";
import { PageContainer } from "../../../common/components/ui-kit/PageContainer/PageContainer";
import { ActionBar } from "../../../common/components/ui-kit/ActionBar/ActionBar";
import { ActionSection } from "../../../common/components/ui-kit/ActionSection/ActionSection";
import { Badge } from "../../../common/components/ui-kit/Badge/Badge";
import { Plus } from "lucide-react";

export function UnitPage() {
  const usuario = useAuthStore((state) => state.usuario);
  const idEdificio = usuario?.idEdificio;

  const {
    loadingUnits,
    loadUnits,
    units,
    pagination,
    createUnit,
    handleCloseModal,
    refreshCurrentPage,
    openNewUnitModal,
    openEditUnitModal,
    openDisplayUnitModal,
    isModalOpen,
    modo,
    savingUnit,
    getUnit,
    selectedUnit,
    updateUnit,
    deleteUnit,
    handleCalcularParticipacion,
    selectedRow,
    setSelectedRow,

    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    unitToDelete,
    isDialogDelete,
  } = useUnitPage();

  const uiPage = (pagination?.page ?? 0) + 1;
  const uiTotalPages = pagination?.totalPages ?? 0;

  const columns: Column<UnitDetailResponse>[] = [
    {
      header: "Código",
      render: (p: UnitDetailResponse) => p.codigo,
    },
    {
      header: "Piso",
      render: (p: UnitDetailResponse) => p.piso,
    },
    {
      header: "Torre",
      render: (p: UnitDetailResponse) => p.torre,
    },
    {
      header: "Metraje",
      render: (p: UnitDetailResponse) => p.metraje,
    },
    {
      header: "%",
      render: (p: UnitDetailResponse) => p.porcentaje,
    },
    {
      header: "Deuda",
      render: (p: UnitDetailResponse) => p.deudaTmp,
    },
    {
      header: "Tipo Unidad",
      render: (p: UnitDetailResponse) => p.tipoUnidad,
    },
    {
      header: "Tipo Alquiler",
      render: (p: UnitDetailResponse) => p.tipoAlquiler,
    },
    {
      header: "Estado",
      render: (p: UnitDetailResponse) => (
        <Badge color={p.estado ? "success" : "danger"}>
          {p.estado ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },

    {
      header: "Acciones",
      render: (p: UnitDetailResponse) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => openDisplayUnitModal(p.id)}
          onEdit={() => openEditUnitModal(p.id)}
          onDelete={() => openDeleteDialog(p)}
        />
      ),
    },
  ];

  const getModalTitle = () => {
    switch (modo) {
      case FORM_MODE.INSERT:
        return "Crear unidad";
      case FORM_MODE.UPDATE:
        return "Modificar unidad";
      case FORM_MODE.DISPLAY:
        return "Consultar unidad";
      default:
        return "";
    }
  };

  const handleSave = (request: UnitRequest) => {
    if (modo === FORM_MODE.INSERT) {
      createUnit(request);
    } else if (selectedUnit) {
      updateUnit(selectedUnit.id, request);
    }
  };

  useEffect(() => {
    if (!idEdificio) {
      notification.error({
        title: "No se encontró id de edificio, vuelva a loguearse",
      });
      return;
    }
    loadUnits({
      idEdificio: idEdificio,
      page: pagination?.page,
      size: pagination?.size,
    });
  }, []);

  if (loadingUnits) {
    return (
      <>
        <Loading text="Consultando unidades..." />{" "}
        <Skeleton type="table" rows={5} height={35} />
      </>
    );
  }

  return (
    <div className="page-content">
      <PageHeader titulo="UNIDADES" subtitulo="Administración de unidades" />

      <PageContainer>
        <ActionBar>
          <Button
            modo={"INS"}
            icon={Plus}
            desc="Nuevo"
            onClick={openNewUnitModal}
            type="button"
            title="Nueva unidad"
          />
        </ActionBar>

        <Table
          data={units}
          columns={columns}
          rowKey={(p) => p.id}
          selectedRowKey={selectedRow?.id}
          onRowClick={setSelectedRow}
        />

        <Pagination
          page={uiPage}
          totalPages={uiTotalPages}
          pageElements={pagination?.size}
          totalElements={pagination?.totalElements}
          pageSize={pagination?.size}
          onChange={(uiPage) =>
            loadUnits({
              idEdificio: idEdificio ?? "",
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
        </ActionSection>
      </PageContainer>

      <Modal
        open={isModalOpen}
        title={getModalTitle()}
        onClose={handleCloseModal}
        size="lg"
      >
        <UnitForm
          onCancel={handleCloseModal}
          onSubmit={handleSave}
          saving={savingUnit}
          modo={modo}
          unit={selectedUnit}
        />
      </Modal>

      <ConfirmDialog
        open={isDialogDelete}
        message={`¿Seguro que deseas eliminar la unidad "${unitToDelete?.codigo}"? Esta acción no se puede deshacer.`}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
