import { useEffect, useState } from "react";
import { Input } from "../../../common/components/ui-kit/Input/Input";
import { Select } from "../../../common/components/ui-kit/Select/Select";
import { usePersonForm } from "../hooks/usePersonForm";
import { RadioButton } from "../../../common/components/ui-kit/RadioButton/RadioButton";
import { GENDER_OPTIONS } from "../../../common/constants/gender";
import { Button } from "../../../common/components/ui-kit/Button/Button";
import { postPersona } from "../services/person-service";
import type { personPostRequest } from "../types/person-types";
import { notification } from "../../../common/components/ui-kit/Notificacion/Notification";
import axios from "axios";
import type {
  ApiResponse,
  ValidationErrors,
} from "../../../common/types/api-response";

interface PersonFormProps {
  onCancel: () => void;
}

export function PersonForm({ onCancel }: PersonFormProps) {
  const [tipDoc, setTipDoc] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [fecNac, setFecNac] = useState("");
  const [cel1, setCel1] = useState("");
  const [cel2, setCel2] = useState("");
  const [correo1, setCorreo1] = useState("");
  const [correo2, setCorreo2] = useState("");
  const { documents, error, loading, fetchDocuments } = usePersonForm();
  const documentOptions = documents.map((doc) => ({
    value: doc.id,
    label: doc.nombre,
  }));
  const [sexo, setSexo] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDocuments({});
  }, []);

  const handleGrabar = async () => {
    //  TODO: Validar que cada item tenga algún valor

    const request: personPostRequest = {
      tipoDocumento: tipDoc,
      numeroDocumento: numDoc,
      nacimiento: fecNac,
      celular: cel1,
      celular2: cel2,
      correo: correo1,
      correo2: correo2,
      sexo: sexo,
      estado: true,
    };

    setSaving(true);

    if (request === null) {
      notification.error({ title: "Los datos del request no están completos" });
      return;
    }

    console.log("datos" + request);

    await postPersona(request)
      .then((response) => {
        if (response.data) {
          notification.success({ title: "Persona creada correctamente" });
          onCancel();
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const response = error.response
            ?.data as ApiResponse<ValidationErrors>;
          const errors = response.data;

          if (!errors) {
            notification.error({
              title: "Ocurrió un error inesperado",
            });
            return;
          }

          Object.values(errors).forEach((messages) => {
            messages.forEach((message) => {
              notification.error({
                title: message,
              });
            });
          });
          console.log(response);
        }
        console.log(error.response?.data);
        notification.error({ title: error.message });
      })
      .finally(() => {
        // setLoading(false);
        setSaving(false);
      });
  };

  return (
    <div>
      <Select
        label="Tipo de Documento"
        value={tipDoc}
        onChange={setTipDoc}
        options={documentOptions}
        required
      />

      <Input
        label="Número Documento"
        value={numDoc}
        onChange={setNumDoc}
        placeholder="Número de documento"
        type="text"
        required
        status="default"
        clearable
      />

      <Input
        label="Fecha de nacimiento"
        value={fecNac}
        onChange={setFecNac}
        placeholder="Fecha de nacimiento"
        type="date"
        required
        status="default"
        clearable
      />

      <Input
        label="Celular 1"
        value={cel1}
        onChange={setCel1}
        placeholder="Número de celular principal"
        type="number"
        status="default"
        clearable
      />

      <Input
        label="Celular 2"
        value={cel2}
        onChange={setCel2}
        placeholder="Número de celular secundario"
        type="number"
        status="default"
        clearable
      />

      <Input
        label="Correo principal"
        value={correo1}
        onChange={setCorreo1}
        placeholder="ejemplo@gmail.com"
        type="email"
        status="default"
        clearable
      />

      <Input
        label="Correo secundario"
        value={correo2}
        onChange={setCorreo2}
        placeholder="ejemplo2@gmail.com"
        type="email"
        status="default"
        clearable
      />

      <RadioButton
        label="Sexo"
        value={sexo}
        options={GENDER_OPTIONS}
        onChange={setSexo}
        required
        direction="horizontal"
      />
      <Button
        desc="Grabar"
        modo="INS"
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
