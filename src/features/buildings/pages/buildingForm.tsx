import { useEffect, useState } from "react";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { FORM_MODE } from "../../../common/constants/formMode";
import type {
  BuildingDetailResponse,
  BuildingRequest,
} from "../types/building-types";
import { Switch } from "../../../common/components/ui-kit/Switch/Switch";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { useCatalog } from "../../catalogs/hooks/useCatalogs";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";

interface UnitFormProps {
  onCancel: () => void;
  onSubmit: (request: BuildingRequest) => void;
  saving?: boolean;
  building?: BuildingDetailResponse | null;
  modo: string;
}

export function BuildingForm({
  onCancel,
  onSubmit,
  saving,
  building,
  modo,
}: UnitFormProps) {
  const isInsert = modo === FORM_MODE.INSERT;
  const isEdit = modo === FORM_MODE.UPDATE;
  const isDisplay = modo === FORM_MODE.DISPLAY;

  const [idEmpresa, setIdEmpresa] = useState("");
  const [nombre, setNombre] = useState("");
  const [logo, setLogo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ruc, setRuc] = useState("");
  const [contingencia, setContingencia] = useState("");
  const [tipoCobro, setTipoCobro] = useState("");
  const [aplicaMora, setAplicaMora] = useState(false);
  const [montoMora, setMontoMora] = useState("");
  const [periodoMora, setPeriodoMora] = useState("");
  const [diaGeneracion, setDiaGeneracion] = useState("");
  const [diaVencimiento, setDiaVencimiento] = useState("");
  const [diaGracia, setDiaGracia] = useState("");

  const { fetchPeriodoMora, fetchTipoCobro, listPeriMora, listTipoCobro } =
    useCatalog();

  const listTipoCobroOption = listTipoCobro.map((item) => ({
    value: item.codigo,
    label: item.descripcion,
  }));

  const listPeriMoraOption = listPeriMora.map((item) => ({
    value: item.codigo,
    label: item.descripcion,
  }));

  const handleGrabar = () => {
    if (!nombre) {
      notification.error({ title: "Debe ingresar el nombre" });
      return;
    }

    if (!direccion) {
      notification.error({ title: "Debe ingresar una dirección" });
      return;
    }

    if (!tipoCobro) {
      notification.error({ title: "Debe ingresar el tipo de cobro" });
      return;
    }

    if (!diaGeneracion) {
      notification.error({ title: "Debe ingresar el día de generación" });
      return;
    }

    if (!diaVencimiento) {
      notification.error({ title: "Debe ingresar el día de vencimiento" });
      return;
    }

    if (!diaGracia) {
      notification.error({
        title: "Debe ingresar la cantidad de días de gracia",
      });
      return;
    }

    const request: BuildingRequest = {
      idEmpresa,
      nombre,
      logoUrl: logo,
      direccion,
      ruc,
      contingencia: Number(contingencia),
      tipoCobro,
      aplicaMora,
      montoMora: Number(montoMora),
      periodoMora,
      diaGeneracion: Number(diaGeneracion),
      diaVencimiento: Number(diaVencimiento),
      diaGracia: Number(diaGracia),
    };

    onSubmit(request);
  };

  useEffect(() => {
    fetchPeriodoMora();
    fetchTipoCobro();
  }, []);

  useEffect(() => {
    if (!isInsert) {
      if (building) {
        setIdEmpresa(building.idEmpresa);
        setNombre(building.nombre);
        setLogo(building.logoUrl);
        setDireccion(building.direccion);
        setRuc(building.ruc);
        setContingencia(String(building.contingencia));
        setTipoCobro(building.tipoCobro);
        setAplicaMora(building.aplicaMora);
        setMontoMora(String(building.montoMora));
        setPeriodoMora(building.periodoMora);
        setDiaGeneracion(String(building.diaGeneracion));
        setDiaVencimiento(String(building.diaVencimiento));
        setDiaGracia(String(building.diaGracia));
      }
    }
  }, [building]);

  return (
    <div>
      <Input
        label="ID Empresa"
        value={idEmpresa}
        onChange={setIdEmpresa}
        placeholder="ID Empresa"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Nombre"
        value={nombre}
        onChange={setNombre}
        placeholder="Nombre"
        type="text"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Logo"
        value={logo}
        onChange={setLogo}
        placeholder="Logo"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Dirección"
        value={direccion}
        onChange={setDireccion}
        placeholder="Dirección"
        type="text"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="RUC"
        value={ruc}
        onChange={setRuc}
        placeholder="RUC"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Contingencia"
        value={contingencia}
        onChange={setContingencia}
        placeholder="Contingencia"
        type="number"
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Select
        label="Tipo Cobro"
        value={tipoCobro}
        onChange={setTipoCobro}
        options={listTipoCobroOption}
        placeholder="---SELECCIONAR---"
        required
        disabled={isDisplay}
      />

      <Switch
        label="¿Aplica mora?"
        checked={aplicaMora}
        onChange={setAplicaMora}
        disabled={isDisplay}
      />

      <Input
        label="Monto mora"
        value={montoMora}
        onChange={setMontoMora}
        placeholder="Monto mora"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Select
        label="Periodo Mora"
        value={periodoMora}
        onChange={setPeriodoMora}
        options={listPeriMoraOption}
        placeholder="---SELECCIONAR---"
        required
        disabled={isDisplay}
      />

      <Input
        label="Día de generación"
        value={diaGeneracion}
        onChange={setDiaGeneracion}
        placeholder="Día de generación"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
        required
      />

      <Input
        label="Día de vencimiento"
        value={diaVencimiento}
        onChange={setDiaVencimiento}
        placeholder="Día de vencimiento"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
        required
      />

      <Input
        label="Días de gracia"
        value={diaGracia}
        onChange={setDiaGracia}
        placeholder="Días de gracia"
        type="text"
        status="default"
        clearable
        disabled={isDisplay}
      />

      {!isDisplay && (
        <Button
          desc={isInsert ? "Grabar" : "Actualizar"}
          modo={isInsert ? "INS" : "UPD"}
          onClick={handleGrabar}
          type="button"
          title="Grabar"
          disabled={saving}
        />
      )}

      <Button
        desc={isDisplay ? "Cerrar" : "Cancelar"}
        modo="LNK"
        onClick={onCancel}
        type="button"
        title="Cancelar"
      />
    </div>
  );
}
