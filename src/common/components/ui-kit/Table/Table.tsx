import styles from "./Table.module.css";

export interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
}

export function Table<T>({ data, columns, rowKey }: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ width: col.width }}>
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
              <tr key={rowKey(row)} className={styles.tableRow}>
                {columns.map((col, j) => (
                  <td key={j}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
