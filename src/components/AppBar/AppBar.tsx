import React from "react";
import { Nokora } from "next/font/google";
import styles from "./AppBar.module.css";

const nokora = Nokora({ weight: ["900"], subsets: ["latin"] });

export const AppBar = () => {
  return (
    <div className={`${styles.container} ${nokora.className}`}>
      <div className={styles.content}>
        <span className={styles.muse_ai}>MUSE.ai</span>
      </div>
    </div>
  );
};
