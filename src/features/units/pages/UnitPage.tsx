import { Button } from "../../../common/components/ui-kit/Button/Button";
import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader";

export function UnitPage() {
  return (
    <div className="page-content">
      <PageHeader titulo="UNIDADES" subtitulo="Administración de unidades" />
      <div>FILTROS</div>
      <Button
        modo={"INS"}
        desc="Nuevo"
        onClick={() => console.log("nueva unidad")}
        type="button"
        title="Nueva unidad"
      />
    </div>
  );
}
