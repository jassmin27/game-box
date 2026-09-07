import type { ReactNode } from "react";
import styles from "./AttributeItem.module.css";

interface Props {
  label: string;
  children: ReactNode;
}

function AttributeItem({ label, children }: Props) {
  const noChildren = children === "" || children == null;

  return (
    <div className={styles["attribute-item"]}>
      <dt>{label}</dt>
      <dd className={noChildren ? styles["not-available"] : undefined}>
        {noChildren ? "Not available" : children}
      </dd>
    </div>
  );
}

export default AttributeItem;
