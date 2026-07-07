import { useEffect, useState } from "react";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Switch } from "../../../common/components/ui-kit/Switch/Switch";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import type { PersonAssignRequest, PersonDto } from "../types/person-types";

interface PersonAssignProps {
  onCancel: () => void;
  onSubmit: (request: PersonAssignRequest) => void;
  saving?: boolean;
  person: PersonDto | null;
}

export function PersonAssignUnit({
  onCancel,
  onSubmit,
  saving,
  person,
}: PersonAssignProps) {
  const [idUnidad, setIdUnidad] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [esResponsable, setEsResponsable] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoPropiedad, setTipoPropiedad] = useState("");
  const [estado, setEstado] = useState(false);

  useEffect(() => {
    setIdPersona(person?.id ?? "");
    //   fetchDocuments({});
  }, []);

  return (
    <div>
      <Input
        label="Código unidad"
        value={idUnidad}
        onChange={setIdUnidad}
        placeholder="Código unidad"
        type="text"
        required
        status="default"
        clearable
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

      {/* <Select
        label="Tipo propietario"
        value={tipoPropiedad}
        onChange={setTipoPropiedad}
        options={}
        placeholder="Seleccione tipo propietario"
        required
      /> */}

      <Switch label="Estado" checked={estado} onChange={setEstado} />
    </div>
  );
}
