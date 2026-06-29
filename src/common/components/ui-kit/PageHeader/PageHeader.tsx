import styles from "./PageHeader.module.css"

interface PageHeaderProps {
  titulo: string;
  subtitulo: string;
}

export function PageHeader({ titulo, subtitulo }: PageHeaderProps) {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{titulo}</h2>
      <p className={styles.subtitle}>{subtitulo}</p>
    </div>
  );
}
