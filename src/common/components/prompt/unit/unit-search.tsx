import { useEffect, useState } from "react";
import type { UnitDetailResponse } from "../../../../features/units/types/unit-types";
import { useAuthStore } from "../../../../features/auth/store/auth-store";
import { useUnitPage } from "../../../../features/units/hooks/useUnitPage";
import { Table, type Column } from "../../ui-kit/Table/Table";
import { Button } from "../../ui-kit/Button/Button";
import { Input } from "../../ui-kit/Input/Input";
import { Pagination } from "../../ui-kit/Pagination/Pagination";
import { FormGrid } from "../../ui-kit/FormGrid/FormGrid";
import { ActionBar } from "../../ui-kit/ActionBar/ActionBar";

interface UnitSearchProps {
  onSelect: (unit: UnitDetailResponse) => void;
}

export function UnitSearchModal({ onSelect }: UnitSearchProps) {
  const usuario = useAuthStore((state) => state.usuario);
  const idEdificio = usuario?.idEdificio;

  const { units, loadUnits, loadingUnits, pagination } = useUnitPage();

  const uiPage = (pagination?.page ?? 0) + 1;
  const uiTotalPages = pagination?.totalPages ?? 0;

  const [codigo, setCodigo] = useState("");
  const [piso, setPiso] = useState("");

  const buscar = () => {
    if (!idEdificio) return;

    loadUnits({
      idEdificio,
      codigo: codigo || undefined,
      piso: piso ? Number(piso) : undefined,
      page: 0,
      size: 10,
    });
  };

  const columns: Column<UnitDetailResponse>[] = [
    {
      header: "Código",
      render: (i) => i.codigo,
    },
    {
      header: "Torre",
      render: (i) => i.torre,
    },
    {
      header: "Piso",
      render: (i) => i.piso,
    },
    {
      header: "Metraje",
      render: (i) => i.metraje,
    },
    {
      header: "",
      render: (i) => (
        <Button
          desc="Seleccionar"
          modo="LNK"
          type="button"
          title="Seleccionar"
          onClick={() => onSelect(i)}
        />
      ),
    },
  ];

  useEffect(() => {
    buscar();
  }, []);

  return (
    <>
      <ActionBar>
        <FormGrid columns={3}>
          <Input
            label="Código"
            value={codigo}
            onChange={setCodigo}
            placeholder="Código"
            clearable
          />

          <Input
            label="Piso"
            value={piso}
            onChange={setPiso}
            placeholder="Piso"
            type="number"
            clearable
          />

          <Button
            desc="Buscar"
            modo="LNK"
            type="button"
            title="Buscar"
            onClick={buscar}
          />
        </FormGrid>
      </ActionBar>

      <Table data={units} columns={columns} rowKey={(i) => i.id} />

      <Pagination
        page={uiPage}
        totalPages={uiTotalPages}
        onChange={(uiPage) =>
          loadUnits({
            idEdificio: idEdificio ?? "",
            page: uiPage - 1,
            size: pagination?.size,
          })
        }
      />
    </>
  );
}
