import { useParams } from "react-router-dom";

export function UnitForm() {
  const { idUnidad } = useParams();

  return <div>Pagina de unidad {idUnidad}</div>;
}
