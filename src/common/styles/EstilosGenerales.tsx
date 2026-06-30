import { useState } from "react";
import { Button } from "../components/ui-kit/Button/Button";
import { Checkbox } from "../components/ui-kit/CheckBox/CheckBox";
import { Input } from "../components/ui-kit/Input/Input";
import { Table } from "../components/ui-kit/Table/Table";
import { Modal } from "../components/ui-kit/Modal/Modal";
import { Alert } from "../components/ui-kit/Alert/Alert";
import { Pagination } from "../components/ui-kit/Pagination/Pagination";
import { ConfirmDialog } from "../components/ui-kit/ConfirmDialog/ConfirmDialog";
import { Select } from "../components/ui-kit/Select/Select";
import { RowActions } from "../components/ui-kit/RowActions/RowActions";
import { Loading } from "../components/ui-kit/Loading/Loading";
import { Skeleton } from "../components/ui-kit/Skeleton/Skeleton";
import { ErrorState } from "../components/ui-kit/ErrorState/ErrorState";
import { EmptyState } from "../components/ui-kit/EmptyState/EmptyState";
import { NoResults } from "../components/ui-kit/NoResults/NoResults";
import { PageToolbar } from "../components/ui-kit/PageToolbar/PageToolbar";

export function EstilosGeneralesPage() {
  //   DATOS PARA TEXTO
  const [texto, setTexto] = useState("");

  //   DATOS PARA CHECBOX
  const [activo, setActivo] = useState(false);

  //   DATOS PARA CREAR TABLA
  type Persona = {
    id: string;
    nombre: string;
    documento: string;
    estado: boolean;
  };

  const data: Persona[] = [
    { id: "1", nombre: "Juan", documento: "77777777", estado: true },
    { id: "2", nombre: "Maria", documento: "66666666", estado: false },
  ];

  const columns = [
    {
      header: "Nombre",
      render: (p: Persona) => p.nombre,
    },
    {
      header: "Documento",
      render: (p: Persona) => p.documento,
    },
    {
      header: "Estado",
      render: (p: Persona) => (p.estado ? "Activo" : "Inactivo"),
    },

    {
      header: "Acciones",
      render: (p: Persona) => (
        <RowActions
          showView
          showEdit
          showDelete
          onView={() => console.log("Ver", p.id)}
          onEdit={() => console.log("Editar", p.id)}
          onDelete={() => console.log("Eliminar", p.id)}
        />
      ),
    },
  ];

  //   DATOS PARA MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   DATOS PARA ALERT
  const [msg, setMsg] = useState("mensaje de alerta");

  //   DATOS PARA PAGINACION
  const [page, setPage] = useState(1);

  //  DATOS PARA CONFIRM DIALOG
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleLogin = async () => {
    console.log("Confirmando");
  };

  //  DATOS PARA SELECT
  const [role, setRole] = useState("admin");
  return (
    <div>
      <h1>PAGINA DE ESTILOS</h1>

      <h1>BOTONES</h1>
      <Button
        desc="boton para crear"
        modo="INS"
        onClick={() => console.log("crear")}
      />
      <Button
        desc="boton para visualizar"
        modo="DSP"
        onClick={() => console.log("visualizar")}
      />
      <Button
        desc="boton para actualizar"
        modo="UPD"
        onClick={() => console.log("update")}
      />
      <Button
        desc="boton para eliminar"
        modo="DLT"
        onClick={() => console.log("eliminar")}
      />
      <Button
        desc="boton para link"
        modo="LNK"
        onClick={() => console.log("link")}
      />

      <h1>INPUTS</h1>
      <Input
        label="label del texto"
        value={texto}
        onChange={setTexto}
        placeholder="place holder"
        type="text"
      />

      <Input
        label="Correo"
        value={texto}
        onChange={setTexto}
        placeholder="correo@gmail.com"
        type="email"
      />

      <Input
        label=""
        value={texto}
        onChange={setTexto}
        placeholder="password"
        type="password"
      />

      <h1>CHECKBOX</h1>
      <Checkbox
        label="texto del checkbox"
        checked={activo}
        onChange={setActivo}
      />

      <h1>TABLA</h1>
      <Table data={data} columns={columns} />

      <h1>MODAL</h1>
      <Button desc="MODAL" modo="INS" onClick={() => setIsModalOpen(true)} />
      <Modal
        open={isModalOpen}
        title="Detalle modal"
        onClose={() => setIsModalOpen(false)}
      >
        <p>Contenido del modal</p>
      </Modal>

      <h1>ALERT</h1>
      {msg && <Alert type="success" message={msg} />}
      {msg && <Alert type="error" message={msg} />}
      {msg && <Alert type="info" message={msg} />}

      <h1>PAGINACION</h1>
      <Pagination page={page} totalPages={10} onChange={setPage} />

      <h1>CONFIRM DIALOG</h1>
      <Button
        desc="Abrir Confirm dialog"
        modo="DLT"
        onClick={() => setIsConfirmOpen(true)}
      />
      <ConfirmDialog
        open={isConfirmOpen}
        message="¿Seguro que deseas eliminar esta persona?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleLogin();
          setIsConfirmOpen(false);
        }}
      />

      <h1>SELECT</h1>
      <Select
        label="Rol"
        value={role}
        onChange={setRole}
        options={[
          { value: "admin", label: "Administrador" },
          { value: "user", label: "Usuario" },
          { value: "guest", label: "Invitado" },
        ]}
      />
      <h1>LOADING</h1>

      <Loading text="Consultando personas..." />

      <Loading text="Guardando..." size="sm" />

      <Loading text="Procesando información..." size="lg" />

      <Loading variant="inline" />

      <Loading variant="inline" text="Consultando edificios..." />

      <h1>SKELETON</h1>
      <Skeleton type="table" rows={5} />
      <br />
      <Skeleton type="text" rows={4} height={16} />
      <br />
      <Skeleton type="text" rows={2} />

      <h1>ERROR STATE</h1>
      <ErrorState
        message="No se pudieron cargar las personas"
        onRetry={() => console.log("aea")}
      />

      <h1>EMPTY STATE</h1>
      {/* if (data.length === 0) */}
      <EmptyState />
      {/* onAction={() => navigate("/personas/new")} */}
      <EmptyState
        actionLabel="Crear persona"
        onAction={() => console.log("aea")}
      />

      <h1>NO RESULTS</h1>
      {/* if (data.length === 0 && hasFilters) */}
      {/* onClearFilters={clearFilters}
      onClearFilters={() => setSearch("")} */}
      <NoResults
        clearLabel="Limpia filtros"
        onClearFilters={() => console.log("limpiando filtros")}
      />

      <h1>PAGE TOOLBAR</h1>
      <PageToolbar
        title="Personas"
        searchValue={"search value"}
        onSearchChange={() => console.log("search change")}
        onCreate={() => console.log("on create")}
        onRefresh={() => console.log("on refresh")}
        onExport={() => console.log("on excel")}
      />
    </div>
  );
}
