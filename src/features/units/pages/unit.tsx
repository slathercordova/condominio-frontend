import { useParams } from "react-router-dom";

export function UnitPage() {
    const { idUnidad } = useParams();

    return(
        <div>
            Pagina de unidad {idUnidad}
        </div>
    );
}