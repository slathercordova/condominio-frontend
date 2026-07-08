import { useEffect, useState } from "react";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Switch } from "../../../common/components/ui-kit/Switch/Switch";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { useCatalog } from "../../catalogs/hooks/useCatalogs";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import type {
  PersonaUnidadRequest,
  UnitDetailResponse,
} from "../../units/types/unit-types";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import type { PersonDto } from "../types/person-types";

interface PersonAssignProps {
  onCancel: () => void;
  onSubmit: (request: PersonaUnidadRequest) => void;
  saving?: boolean;
  person: PersonDto | null;
  selectedUnit: UnitDetailResponse | null;
  onSearchUnit: () => void;
}

export function PersonAssignUnit({
  onCancel,
  onSubmit,
  saving,
  person,
  selectedUnit,
  onSearchUnit,
}: PersonAssignProps) {
  const [idUnidad, setIdUnidad] = useState("");
  const [codigoUnidad, setCodigoUnidad] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [esResponsable, setEsResponsable] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoPropiedad, setTipoPropiedad] = useState("");
  const [estado, setEstado] = useState(false);

  const { fetchTipoPropiedad, listTipoProp } = useCatalog();

  const listTipoPropOptions = listTipoProp.map((item) => ({
    value: item.codigo,
    label: item.descripcion,
  }));

  useEffect(() => {
    setIdPersona(person?.id ?? "");
    fetchTipoPropiedad();
  }, []);

  useEffect(() => {
    if (selectedUnit) {
      setIdUnidad(selectedUnit.id);
      setCodigoUnidad(selectedUnit.codigo);
    }
  }, [selectedUnit]);

  const handleGrabar = () => {
    if (!idUnidad) {
      notification.error({ title: "Debe seleccionar una unidad" });
      return;
    }

    if (!idPersona) {
      notification.error({ title: "Debe seleccionar una persona" });
      return;
    }

    if (esResponsable === null) {
      notification.error({ title: "Debe indicar si es responsable" });
      return;
    }

    if (!fechaInicio) {
      notification.error({ title: "Debe indicar una fecha de inicio" });
      return;
    }

    if (!tipoPropiedad) {
      notification.error({ title: "Debe seleccionar un tipo de propiedad" });
      return;
    }

    if (estado === null) {
      notification.error({ title: "Debe indicar un estado" });
      return;
    }

    const request: PersonaUnidadRequest = {
      idUnidad: idUnidad,
      idPersona: idPersona,
      esResponsable: esResponsable,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin || null,
      tipoPropiedad: tipoPropiedad,
      estado: estado,
    };

    console.log(request);
    onSubmit(request);
  };

  return (
    <div>
      <Input
        label="Código unidad"
        value={codigoUnidad}
        onChange={setCodigoUnidad}
        placeholder="Código unidad"
        type="text"
        required
        status="default"
        readOnly
      />

      <Button
        desc={"Buscar"}
        modo={"LNK"}
        onClick={onSearchUnit}
        type="button"
        title="Buscar"
        disabled={false}
      />

      <Input
        label="Código persona"
        value={idPersona}
        onChange={setIdPersona}
        placeholder="Código persona"
        type="text"
        required
        status="default"
        readOnly
      />

      <Input
        label="Nombres Completos"
        value={
          person?.nombres +
          " " +
          person?.apellidoPaterno +
          " " +
          person?.apellidoMaterno
        }
        onChange={() => {}}
        placeholder="Nombres Completos"
        type="text"
        status="default"
        readOnly
      />

      <Switch
        label="¿Es responsable?"
        checked={esResponsable}
        onChange={setEsResponsable}
      />

      <Input
        label="Fecha inicio responsable"
        value={fechaInicio}
        onChange={setFechaInicio}
        placeholder="Fecha inicio responsable"
        type="date"
        required
        status="default"
        clearable
      />

      <Input
        label="Fecha fin responsable"
        value={fechaFin}
        onChange={setFechaFin}
        placeholder="Fecha fin responsable"
        type="date"
        status="default"
        clearable
      />

      <Select
        label="Tipo propiedad"
        value={tipoPropiedad}
        onChange={setTipoPropiedad}
        options={listTipoPropOptions}
        placeholder="--Seleccionar--"
        required
      />

      <Switch label="Estado" checked={estado} onChange={setEstado} />

      <Button
        desc="Grabar"
        modo="UPD"
        onClick={handleGrabar}
        type="button"
        title="Grabar"
        disabled={saving}
      />

      <Button
        desc="Cancelar"
        modo="LNK"
        onClick={onCancel}
        type="button"
        title="Cancelar"
      />
    </div>
  );
}
