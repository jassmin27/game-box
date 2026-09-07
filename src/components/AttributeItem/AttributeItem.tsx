import type { ReactNode } from "react";
import styles from "./AttributeItem.module.css";

interface Props {
  label: string;
  children: ReactNode;
}

function AttributeItem({ label, children }: Props) {
  return (
    <div className={styles["attribute-item"]}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default AttributeItem;
