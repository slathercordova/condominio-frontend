import styles from "./Pagination.module.css"

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const prev = () => page > 1 && onChange(page - 1);
  const next = () => page < totalPages && onChange(page + 1);

  return (
    <div className={styles.pagination}>
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
  );
}