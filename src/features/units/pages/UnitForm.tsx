import { useEffect, useState } from "react";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { FORM_MODE } from "../../../common/constants/formMode";
import type { UnitDetailResponse, UnitRequest } from "../types/unit-types";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { useCatalog } from "../../catalogs/hooks/useCatalogs";
import { Switch } from "../../../common/components/ui-kit/Switch/Switch";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { useAuthStore } from "../../auth/store/auth-store";

interface UnitFormProps {
  onCancel: () => void;
  onSubmit: (request: UnitRequest) => void;
  saving?: boolean;
  unit?: UnitDetailResponse | null;
  modo: string;
}

export function UnitForm({
  onCancel,
  onSubmit,
  saving,
  unit,
  modo,
}: UnitFormProps) {
  const usuario = useAuthStore((state) => state.usuario);

  const toNull = (value: string | null) => {
    if (value === null) return null;
    return value.trim() === "" ? null : value;
  };

  const isInsert = modo === FORM_MODE.INSERT;
  const isEdit = modo === FORM_MODE.UPDATE;
  const isDisplay = modo === FORM_MODE.DISPLAY;

  const idEdificio = usuario?.idEdificio;
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [piso, setPiso] = useState("");
  const [torre, setTorre] = useState("");
  const [metraje, setMetraje] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [deudaTmp, setDeudaTmp] = useState("");
  const [tipoUnidad, setTipoUnidad] = useState("");
  const [tipoAlquiler, setTipoAlquiler] = useState("");
  const [estado, setEstado] = useState(false);

  const { listCatalogs, fetchTipoUnidad, listTipoAlquiler, fetchTipoAlquiler } =
    useCatalog();
  const catalogsOption = listCatalogs.map((item) => ({
    value: item.codigo,
    label: item.descripcion,
  }));
  const AlquileresOption = listTipoAlquiler.map((item) => ({
    value: item.codigo,
    label: item.descripcion,
  }));

  useEffect(() => {
    fetchTipoUnidad();
    fetchTipoAlquiler();
  }, []);

  useEffect(() => {
    if (!isInsert) {
      if (unit) {
        setId(unit.id);
        setCodigo(unit.codigo);
        setLogoUrl(unit.logoUrl);
        setPiso(String(unit.piso));
        setTorre(unit.torre);
        setMetraje(String(unit.metraje));
        setPorcentaje(String(unit.porcentaje));
        setTipoUnidad(unit.tipoUnidad);
        setTipoAlquiler(unit.tipoAlquiler);
        setEstado(unit.estado);
      }
    }
  }, [unit]);

  const handleGrabar = async () => {
    if (!idEdificio) {
      notification.error({
        title: "No se encontró el edificio, vuelva a ingresar",
      });
      return;
    }

    if (!codigo) {
      notification.error({ title: "Debe ingresar el código" });
      return;
    }

    if (!torre) {
      notification.error({ title: "Debe ingresar la torre" });
      return;
    }

    if (!piso) {
      notification.error({ title: "Debe ingresar el piso" });
      return;
    }

    if (!metraje) {
      notification.error({ title: "Debe ingresar el metraje" });
      return;
    }

    if (!tipoUnidad) {
      notification.error({ title: "Debe ingresar el tipo de unidad" });
      return;
    }

    const request: UnitRequest = {
      idEdificio: idEdificio,
      codigo: codigo,
      logoUrl: toNull(logoUrl),
      piso: Number(piso),
      torre: torre,
      metraje: Number(metraje),
      porcentaje: Number(porcentaje),
      tipoUnidad: tipoUnidad,
      tipoAlquiler: toNull(tipoAlquiler),
      estado: isInsert ? true : estado,
    };

    console.log(request);

    onSubmit(request);
  };

  return (
    <div>
      <Input
        label="Código"
        value={codigo}
        onChange={setCodigo}
        placeholder="Código de unidad"
        type="text"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Torre"
        value={torre}
        onChange={(e) => setTorre(String(e))}
        placeholder="Torre"
        type="text"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Piso"
        value={String(piso)}
        onChange={setPiso}
        placeholder="Piso"
        type="number"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="Metraje"
        value={String(metraje)}
        onChange={setMetraje}
        placeholder="Metraje"
        type="number"
        required
        status="default"
        clearable
        disabled={isDisplay}
      />

      <Input
        label="% participación"
        value={String(porcentaje)}
        onChange={setPorcentaje}
        placeholder="% participación"
        type="number"
        status="default"
        disabled
      />

      <Input
        label="Deuda Total"
        value={String(deudaTmp)}
        onChange={setDeudaTmp}
        placeholder="Deuda Total"
        type="number"
        status="default"
        disabled
      />

      <Select
        label="Tipo de Unidad"
        value={tipoUnidad}
        onChange={setTipoUnidad}
        options={catalogsOption}
        placeholder="Seleccione un tipo de unidad"
        required
        disabled={isDisplay}
      />

      <Select
        label="Tipo de Alquiler"
        value={tipoAlquiler}
        onChange={setTipoAlquiler}
        options={AlquileresOption}
        placeholder="Seleccione tipo de alquiler"
        required
        disabled={isDisplay}
      />

      <Input
        label="Logo"
        value={logoUrl}
        onChange={setLogoUrl}
        placeholder="Logo"
        type="text"
        status="default"
        disabled={isDisplay}
      />

      {!isInsert && (
        <Switch
          label="Estado"
          checked={estado}
          onChange={setEstado}
          disabled={isDisplay}
        />
      )}

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
