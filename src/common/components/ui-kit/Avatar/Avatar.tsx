import { useState } from "react";
import styles from "./Avatar.module.css";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type AvatarStatus = "online" | "offline" | "busy" | "away";

interface AvatarProps {
  image?: string;
  initials?: string;
  alt?: string;
  size?: AvatarSize;
  square?: boolean;
  status?: AvatarStatus;
  onClick?: () => void;
}

export function Avatar({
  image,
  initials,
  alt,
  size = "md",
  square = false,
  status,
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = image && !imageError;

  return (
    <div
      className={`
        ${styles.avatar}
        ${styles[size]}
        ${square ? styles.square : styles.circle}
        ${onClick ? styles.clickable : ""}
      `}
      onClick={onClick}
    >
      {showImage ? (
        <img
          src={image}
          alt={alt}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={styles.initials}>
          {initials?.substring(0, 2).toUpperCase()}
        </span>
      )}

      {status && <span className={`${styles.status} ${styles[status]}`} />}
    </div>
  );
}
