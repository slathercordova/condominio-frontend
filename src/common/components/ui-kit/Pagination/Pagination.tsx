import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  pageElements?: number;
  totalElements?: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  pageElements,
  totalElements,
  pageSize,
  onChange,
}: PaginationProps) {
  const prev = () => page > 1 && onChange(page - 1);
  const next = () => page < totalPages && onChange(page + 1);

  const start = totalElements && pageSize ? (page - 1) * pageSize + 1 : 0;

  const end =
    totalElements && pageSize && pageElements ? start + pageElements - 1 : 0;

  const mostrarContador = pageElements != null && totalElements != null;

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationLeft}>
        {mostrarContador && (
          <div className={styles.counter}>
            Mostrando{" "}
            <strong>
              {start}-{end}
            </strong>{" "}
            de <strong>{totalElements}</strong> registros
          </div>
        )}
      </div>

      <div className={styles.paginationRight}>
        <button onClick={prev} disabled={page === 1}>
          ← Anterior
        </button>

        <div className={styles.pagination_info}>
          Página <strong>{page}</strong> de {totalPages}
        </div>

        <button onClick={next} disabled={page === totalPages}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
