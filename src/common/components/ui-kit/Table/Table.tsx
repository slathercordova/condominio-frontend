import styles from "./Table.module.css";

export interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  selectedRowKey?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T>({
  data,
  columns,
  rowKey,
  selectedRowKey,
  onRowClick,
}: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  width: col.width,
                  textAlign: col.headerAlign ?? col.align ?? "left",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.tableEmpty}>
                No hay registros
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className={`${styles.tableRow} ${selectedRowKey === rowKey(row) ? styles.selected : ""}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, j) => (
                  <td key={j} style={{ textAlign: col.align ?? "left" }}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
