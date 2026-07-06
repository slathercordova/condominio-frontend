import { Button } from "../../../common/components/ui-kit/Button/Button";
import { FORM_MODE } from "../../../common/constants/formMode";
import type { UnitDetailResponse, UnitRequest } from "../types/mis-unidades";

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
  person,
  modo,
}): UnitFormProps {
  const isInsert = modo === FORM_MODE.INSERT;
  const isEdit = modo === FORM_MODE.UPDATE;
  const isDisplay = modo === FORM_MODE.DISPLAY;

  return (
    <div>
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
