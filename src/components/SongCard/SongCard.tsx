import { SongType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { HeartFilled, HeartOutline } from "../icons";
import styles from "./SongCard.module.css";

type Props = Partial<SongType> & {
  isFavorite?: boolean;
  onFavoriteSong?: (id: number) => void;
};

export const SongCard = ({ id, song, isFavorite, onFavoriteSong }: Props) => {
  const FavoriteIcon = isFavorite ? HeartFilled : HeartOutline;

  if (!song || !id) {
    return (
      <li className={styles.card}>
        <main className={`${styles.image_container} ${styles.loading}`} />
        <footer>
          <div className={styles.loading} />
          <br />
          <div className={styles.loading} />
        </footer>
      </li>
    );
  }

  return (
    <li className={styles.card}>
      <Link href={`/songs/${id}`}>
        <main className={styles.image_container}>
          <Image
            fill
            objectFit="cover"
            src={`/assets/images/${song.files.coverArt}`}
            alt={song.title}
          />
        </main>
      </Link>

      <footer>
        <h3>{song.title}</h3>
        <div>
          <span>{song.artist}</span>
          {onFavoriteSong && (
            <button type="button" onClick={() => onFavoriteSong?.(id)}>
              <FavoriteIcon />
            </button>
          )}
        </div>
      </footer>
    </li>
  );
};
