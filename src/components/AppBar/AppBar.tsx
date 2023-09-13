import React from "react";
import styles from "./AppBar.module.css";

export const AppBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.muse_ai}>MUSE.ai</span>
      </div>
    </div>
  );
};
