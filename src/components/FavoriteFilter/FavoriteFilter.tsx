import Link from "next/link";
import React from "react";
import { HeartFilled, HeartOutline } from "../icons";
import styles from "./FavoriteFilter.module.css";

type Props = {
  isActive?: boolean;
};

export const FavoriteFilter = ({ isActive }: Props) => {
  return (
    <Link
      href={{
        query: {
          filter: isActive ? "all" : "favorites",
        },
      }}
    >
      <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
        {!isActive ? <HeartOutline /> : <HeartFilled />} Favorites
      </div>
    </Link>
  );
};
