import { PageHeader } from "../../../common/components/ui-kit/PageHeader/PageHeader"

export function PersonPage(){
    return(
        <div className="page-content">
            <PageHeader titulo="PERSONAS" subtitulo = "Adminstración de personas"/>
            <div>FILTROS</div>
            <div>BOTON NUVEO</div>
            <div>TABLA</div>
            <div>BOTONES QUE HACEN ACCIONES EXTRAS AL SELECCIONAR UN REGISTRO DE LA TABLA</div>
            <div>PAGINACION</div>
        </div>
    );
}