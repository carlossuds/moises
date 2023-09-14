import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import { HeartFilled, HeartOutline, Pause, Play } from "@/components/icons";
import { SongType } from "@/types";
import { Slider } from "..";

type Props = {
  song: SongType;
  isFavorite: boolean;
  onFavoriteClick: (id: number) => void;
};

export const AudioPlayer = ({ isFavorite, song, onFavoriteClick }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [times, setTimes] = useState({
    duration: 0,
    currentTime: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }, [song.id]);

  useEffect(() => {
    const id = setInterval(() => {
      const { duration = 0, currentTime = 0 } = audioRef.current ?? {};
      setPercentage(100 * (currentTime / duration));
      setTimes({
        currentTime,
        duration: duration - currentTime,
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const onPlayClicked = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    audioRef.current?.play();
    setIsPlaying(true);
  }, [isPlaying]);

  const onSliderChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    const numberValue = Number(event.target.value);
    audio.currentTime = (audio.duration / 100) * numberValue;
    setPercentage(numberValue);
  }, []);

  return (
    <div className={styles.player}>
      <main>
        <button type="button" className={styles.play} onClick={onPlayClicked}>
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
        <audio ref={audioRef} controls hidden>
          <source
            src={`/assets/audio/${song.song.files.audio}`}
            type="audio/mpeg"
          />
        </audio>

        <Slider
          percentage={percentage}
          onChange={onSliderChange}
          duration={times.duration}
          currentTime={times.currentTime}
        />
      </footer>
    </div>
  );
};
