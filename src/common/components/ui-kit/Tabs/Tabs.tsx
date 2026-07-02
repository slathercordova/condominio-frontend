import type React from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tab: string) => void;
  variant?: "line" | "card" | "pill";
  fullWidth?: boolean;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "line",
  fullWidth = false,
}: TabsProps) {
  return (
    <div
      className={`
        ${styles.container}
        ${styles[variant]}
        ${fullWidth ? styles.fullWidth : ""}
      `}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          disabled={tab.disabled}
          onClick={() => onChange(tab.id)}
          className={`
            ${styles.tab}
            ${activeTab === tab.id ? styles.active : ""}
          `}
        >
          {tab.icon && <span className={styles.icon}>{tab.icon}</span>}

          <span>{tab.label}</span>

          {tab.badge !== undefined && (
            <span className={styles.badge}>{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
