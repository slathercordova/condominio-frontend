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
  } = useUnitPage();

  const uiPage = (pagination?.page ?? 0) + 1;
  const uiTotalPages = pagination?.totalPages ?? 0;

  const columns: Column<UnitDetailResponse>[] = [
    {
      header: "ID",
      render: (p: UnitDetailResponse) => p.id,
    },
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
      header: "Tipo Unidad",
      render: (p: UnitDetailResponse) => p.tipoUnidad,
    },
    {
      header: "Tipo Alquiler",
      render: (p: UnitDetailResponse) => p.tipoAlquiler,
    },
    {
      header: "Estado",
      render: (p: UnitDetailResponse) => (p.estado ? "Activo" : "Inactivo"),
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
          onDelete={() => deleteUnit(p.id)}
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

  return (
    <div className="page-content">
      <PageHeader titulo="UNIDADES" subtitulo="Administración de unidades" />
      <div>FILTROS</div>
      <Button
        modo={"INS"}
        desc="Nuevo"
        onClick={openNewUnitModal}
        type="button"
        title="Nueva unidad"
      />
      <Table
        data={units}
        columns={columns}
        rowKey={(p) => p.id}
        selectedRowKey={selectedRow?.id}
        onRowClick={setSelectedRow}
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
          loadUnits({
            idEdificio: idEdificio ?? "",
            page: uiPage - 1,
            size: pagination?.size,
          })
        }
      />

      <Modal
        open={isModalOpen}
        title={getModalTitle()}
        onClose={handleCloseModal}
      >
        <UnitForm
          onCancel={handleCloseModal}
          onSubmit={handleSave}
          saving={savingUnit}
          modo={modo}
          unit={selectedUnit}
        />
      </Modal>
    </div>
  );
}
