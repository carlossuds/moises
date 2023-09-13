import { useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import { HeartFilled, HeartOutline, Pause, Play } from "@/components/icons";
import { SongType } from "@/types";

type Props = {
  song: SongType;
  isFavorite: boolean;
  onFavoriteClick: (id: number) => void;
};

export const AudioPlayer = ({ isFavorite, song, onFavoriteClick }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.player}>
      <main>
        <button
          type="button"
          className={styles.play}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <div className={styles.info}>
          <div>
            <h1>{song.song.title}</h1>
            <button type="button" onClick={() => onFavoriteClick(song.id)}>
              {isFavorite ? <HeartFilled /> : <HeartOutline />}
            </button>
          </div>

          <span>
            {song.song.artist}
            &emsp;|&emsp;
            {song.song.album.title}
            &emsp;|&emsp;
            {song.song.album.year}
          </span>
        </div>
      </main>
      <footer>
        <audio ref={audioRef} controls>
          <source src="/audio/song-1.mp3" type="audio/mpeg" />
        </audio>
      </footer>
    </div>
  );
};
