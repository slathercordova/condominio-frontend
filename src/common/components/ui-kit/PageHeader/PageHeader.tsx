import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  titulo: string;
  subtitulo: string;
  descripcion?: string;
}

export function PageHeader({
  titulo,
  subtitulo,
  descripcion,
}: PageHeaderProps) {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{titulo}</h2>
      <p className={styles.subtitle}>{subtitulo}</p>
      {descripcion && <p className={styles.description}>{descripcion}</p>}
    </div>
  );
}
