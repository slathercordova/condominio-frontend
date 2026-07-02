import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./Popover.module.css";

interface PopoverProps {
  children: ReactNode;
  text?: string;
  title?: string;
  description?: string;
  footer?: string;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
}

export function Popover({
  children,
  text,
  title,
  description,
  footer,
  placement = "top",
  delay = 300,
  disabled = false,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number>(0);
  const openPopover = () => {
    if (disabled) return;
    timer.current = window.setTimeout(() => {
      setOpen(true);
    }, delay);
  };

  const closePopover = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div
      className={styles.container}
      onMouseEnter={openPopover}
      onMouseLeave={closePopover}
    >
      {children}

      {open && (
        <div
          className={`
      ${styles.position}
      ${styles[placement]}
    `}
        >
          <div className={styles.arrow}></div>
          <div className={styles.card}>
            {text ? (
              <span>{text}</span>
            ) : (
              <>
                {title && <div className={styles.title}>{title}</div>}

                {description && (
                  <div className={styles.description}>{description}</div>
                )}

                {footer && <div className={styles.footer}>{footer}</div>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
