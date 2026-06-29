import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function DropdownCom({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <div className={styles.trigger} onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && <div className={styles.menu}>{children}</div>}
    </div>
  );
}
