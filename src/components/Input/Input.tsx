import { useTimeout } from "@/hooks";
import { SongType } from "@/types";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Search } from "../icons";
import styles from "./Input.module.css";

type Props = {
  hideIcon?: boolean;
  value?: string;
  placeholder?: string;
  options: Array<SongType>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ hideIcon, options, ...restProps }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const { debounce } = useTimeout();

  return (
    <div className={styles.container}>
      {!hideIcon && <Search />}
      <input
        className={styles.input}
        {...restProps}
        onBlur={() => debounce(() => setShowOptions(false), 350)}
        onFocus={() => setShowOptions(true)}
      />

      {Boolean(options.length) && showOptions && (
        <ul>
          {options.map((song) => (
            <Link key={song.id} href={`/songs/${song.id}`}>
              <li>{song.song.title}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
