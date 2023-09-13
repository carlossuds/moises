import React, { ChangeEvent } from "react";
import { Search } from "../icons";
import styles from "./Input.module.css";

type Props = {
  hideIcon?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ hideIcon, ...restProps }: Props) => {
  return (
    <div className={styles.container}>
      {!hideIcon && <Search />}
      <input className={styles.input} {...restProps} />
    </div>
  );
};
