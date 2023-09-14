import { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./Slider.module.css";

export const Slider = ({
  percentage = 0,
  onChange,
  duration = 0,
  currentTime = 0,
}: {
  percentage: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  currentTime?: number;
  duration?: number;
}) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rangeWidth = rangeRef?.current?.getBoundingClientRect().width ?? 0;
    const thumbWidth = thumbRef?.current?.getBoundingClientRect().width ?? 0;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  const getTime = (time: number) => {
    let duration = time;
    duration = duration % 3600;
    const minutes = Math.floor(duration / 60);
    duration = duration % 60;

    const seconds = Math.floor(duration);

    const minutesString = minutes > 9 ? minutes : `0${minutes}`;
    const secondsString = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutesString}:${secondsString}`;
  };

  return (
    <div className={styles.slider_container}>
      <div
        className={styles.progress_bar_cover}
        style={{
          width: `${progressBarWidth}px`,
        }}
      />
      <div
        className={styles.thumb}
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      />
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className={styles.range}
        onChange={onChange}
      />

      <div className={styles.times}>
        <span>{getTime(currentTime)}</span>
        <span>{getTime(duration)}</span>
      </div>
    </div>
  );
};
