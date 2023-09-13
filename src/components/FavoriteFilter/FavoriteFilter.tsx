import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { HeartFilled, HeartOutline } from "../icons";
import styles from "./FavoriteFilter.module.css";

type Props = {
  isActive?: boolean;
};

export const FavoriteFilter = ({ isActive }: Props) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const url = new URL(window.location.href);
    if (isActive) {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", "favorites");
    }
    router.replace(url.href);
  }, [router, isActive]);

  return (
    <button
      type="button"
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      {!isActive ? <HeartOutline /> : <HeartFilled />} Favorites
    </button>
  );
};
