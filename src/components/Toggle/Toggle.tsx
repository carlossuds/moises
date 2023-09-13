import React from "react";
import styles from "./Toggle.module.css";

type Props = {
  checked?: boolean;
  onClick?: () => void;
};

export const Toggle = ({ checked, onClick }: Props) => {
  return (
    <div className={styles.toggle}>
      <input type="checkbox" id="switch" onClick={onClick} checked={checked} />
      <label htmlFor="switch" />
    </div>
  );
};
