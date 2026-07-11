import { useEffect, useState } from "react";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { usePersonForm } from "../hooks/usePersonForm";
import { RadioButton } from "../../../common/components/ui-kit/RadioButton/RadioButton";
import { GENDER_OPTIONS } from "../../../common/constants/gender";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import type { PersonDto, personPostRequest } from "../types/person-types";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import { Switch } from "../../../common/components/ui-kit/Switch/Switch";
import { FORM_MODE } from "../../../common/constants/formMode";
import { ActionSection } from "../../../common/components/ui-kit/ActionSection/ActionSection";
import { FormGrid } from "../../../common/components/ui-kit/FormGrid/FormGrid";
import { CalendarDays, IdCard, Mail, Smartphone } from "lucide-react";
import { FormGridItem } from "../../../common/components/ui-kit/FormGrid/FormGridItem";

interface PersonFormProps {
  onCancel: () => void;
  onSubmit: (request: personPostRequest) => void;
  saving?: boolean;
  person?: PersonDto | null;
  modo: string;
}

export function PersonForm({
  onCancel,
  onSubmit,
  saving,
  person,
  modo,
}: PersonFormProps) {
  const [tipDoc, setTipDoc] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [apePat, setApePat] = useState("");
  const [apeMat, setApeMat] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecNac, setFecNac] = useState("");
  const [cel1, setCel1] = useState("");
  const [cel2, setCel2] = useState("");
  const [correo1, setCorreo1] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [sexo, setSexo] = useState("");
  const [estado, setEstado] = useState(false);

  const isInsert = modo === FORM_MODE.INSERT;
  const isEdit = modo === FORM_MODE.UPDATE;
  const isDisplay = modo === FORM_MODE.DISPLAY;

  const { documents, error, loading, fetchDocuments } = usePersonForm();
  const documentOptions = documents.map((doc) => ({
    value: doc.id,
    label: doc.nombre,
  }));

  const toNull = (value: string | null) => {
    if (value === null) return null;
    return value.trim() === "" ? null : value;
  };

  useEffect(() => {
    fetchDocuments({});
  }, []);

  useEffect(() => {
    if (person) {
      setTipDoc(person.tipoDocumentoId);
      setNumDoc(person.numeroDocumento);
      setApePat(person.apellidoPaterno);
      setApeMat(person.apellidoMaterno);
      setNombre(person.nombres);
      setFecNac(person.nacimiento);
      setCel1(person.celular ?? "");
      setCel2(person.celular2 ?? "");
      setCorreo1(person.correo ?? "");
      setCorreo2(person.correo2 ?? "");
      setSexo(person.sexo);
      setEstado(person.estado);
    }
  }, [person]);

  const handleGrabar = async () => {
    //  TODO: Validar que cada item tenga algún valor
    if (!tipDoc) {
      notification.error({ title: "Debe ingresar el tipo de documento" });
      return;
    }

    if (!numDoc) {
      notification.error({ title: "Debe ingresar el número de documento" });
      return;
    }

    if (!fecNac) {
      notification.error({ title: "Debe ingresar la fecha de nacimiento" });
      return;
    }

    if (!sexo) {
      notification.error({ title: "Debe ingresar el sexo" });
      return;
    }

    onSubmit({
      tipoDocumento: tipDoc,
      numeroDocumento: numDoc,
      apellidoPaterno: toNull(apePat),
      apellidoMaterno: toNull(apeMat),
      nombres: toNull(nombre),
      nacimiento: fecNac,
      celular: toNull(cel1),
      celular2: toNull(cel2),
      correo: toNull(correo1),
      correo2: toNull(correo2),
      sexo: sexo,
      estado: isInsert ? true : estado,
    });
  };

  return (
    <div>
      <FormGrid>
        <FormGridItem colSpan={6}>
          <Select
            label="Tipo de Documento"
            value={tipDoc}
            onChange={setTipDoc}
            options={documentOptions}
            placeholder="Seleccione un tipo de documento"
            required
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <Input
            label="Número Documento"
            value={numDoc}
            onChange={setNumDoc}
            placeholder="Número de documento"
            type="text"
            required
            status="default"
            clearable
            disabled={isDisplay}
            startAdornment={<IdCard />}
          />
        </FormGridItem>

        {!isInsert && (
          <>
            <FormGridItem colSpan={6}>
              <Input
                label="Apellido paterno"
                value={apePat}
                onChange={setApePat}
                placeholder="Apellido paterno"
                type="text"
                required
                status="default"
                clearable
                disabled={isDisplay}
              />
            </FormGridItem>

            <FormGridItem colSpan={6}>
              <Input
                label="Apellido materno"
                value={apeMat}
                onChange={setApeMat}
                placeholder="Apellido materno"
                type="text"
                required
                status="default"
                clearable
                disabled={isDisplay}
              />
            </FormGridItem>

            <FormGridItem colSpan={12}>
              <Input
                label="Nombres"
                value={nombre}
                onChange={setNombre}
                placeholder="Nombres"
                type="text"
                required
                status="default"
                clearable
                disabled={isDisplay}
              />
            </FormGridItem>
          </>
        )}

        <FormGridItem colSpan={6}>
          <Input
            label="Fecha de nacimiento"
            value={fecNac}
            onChange={setFecNac}
            placeholder="Fecha de nacimiento"
            type="date"
            startAdornment={<CalendarDays />}
            required
            status="default"
            clearable
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <RadioButton
            label="Sexo"
            value={sexo}
            options={GENDER_OPTIONS}
            onChange={setSexo}
            required
            direction="horizontal"
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <Input
            label="Celular 1"
            value={cel1}
            onChange={setCel1}
            placeholder="Número de celular principal"
            type="number"
            status="default"
            clearable
            startAdornment={<Smartphone />}
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <Input
            label="Celular 2"
            value={cel2}
            onChange={setCel2}
            placeholder="Número de celular secundario"
            type="number"
            status="default"
            clearable
            startAdornment={<Smartphone />}
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <Input
            label="Correo principal"
            value={correo1}
            onChange={setCorreo1}
            placeholder="ejemplo@gmail.com"
            type="email"
            status="default"
            clearable
            startAdornment={<Mail />}
            disabled={isDisplay}
          />
        </FormGridItem>

        <FormGridItem colSpan={6}>
          <Input
            label="Correo secundario"
            value={correo2}
            onChange={setCorreo2}
            placeholder="ejemplo2@gmail.com"
            type="email"
            status="default"
            clearable
            startAdornment={<Mail />}
            disabled={isDisplay}
          />
        </FormGridItem>

        {!isInsert && (
          <FormGridItem colSpan={12}>
            <Switch
              label="Estado"
              checked={estado}
              onChange={setEstado}
              disabled={isDisplay}
            />
          </FormGridItem>
        )}
      </FormGrid>

      <ActionSection align="end">
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
      </ActionSection>
    </div>
  );
}
