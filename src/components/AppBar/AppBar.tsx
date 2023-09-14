import React from "react";
import { Nokora } from "next/font/google";
import styles from "./AppBar.module.css";
import Link from "next/link";

const nokora = Nokora({ weight: ["900"], subsets: ["latin"] });

export const AppBar = () => {
  return (
    <div className={`${styles.container} ${nokora.className}`}>
      <div className={styles.content}>
        <Link href="/">
          <span className={styles.muse_ai}>MUSE.ai</span>
        </Link>
      </div>
    </div>
  );
};
