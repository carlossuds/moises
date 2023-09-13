"use client";
import { Nokora } from "next/font/google";
import styles from "@/styles/Home.module.css";

const nokora = Nokora({ weight: ["900"], subsets: ["latin"] });

import { FavoriteFilter, Input, SongCard, Toggle } from "@/components";
import { useFavoriteSongs } from "@/hooks";
import { SongType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  searchParams: Record<string, string | Array<string> | undefined>;
};

export default function Home({ searchParams }: Props) {
  const router = useRouter();
  const [songs, setSongs] = useState<Array<SongType>>([]);
  const { favoriteSongs, addToFavorites, removeFromFavorites } =
    useFavoriteSongs();

  const isFavoriteFilterActive = searchParams?.filter === "favorites";
  const isSortedAlphabetically = searchParams?.sort === "abc";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3003/songs`);
        const json = await response.json();
        setSongs(json.songs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleToggle = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", isSortedAlphabetically ? "off" : "abc");
    router.replace(url.href);
  };

  return (
    <div className={`${styles.container} ${nokora.className}`}>
      <div className={styles.content}>
        <header>
          <section>
            <div className={styles.horizontal}>
              <h1>Your Library</h1>
              <FavoriteFilter isActive={isFavoriteFilterActive} />
            </div>
            <span className={styles.subtitle}>
              You have {songs.length} songs in your library
            </span>
          </section>

          <section
            className={`${styles.horizontal} ${styles.horizontal_spacing}`}
          >
            <div className={styles.horizontal}>
              <span>Sort from A-Z</span>
              <Toggle checked={isSortedAlphabetically} onClick={handleToggle} />
            </div>
            <Input placeholder="Search in your library" />
          </section>
        </header>

        <main>
          <ul className={styles.song_list}>
            {!songs.length
              ? [...Array(5)].map((_, index) => <SongCard key={index} />)
              : [...songs]
                  .sort((a, b) => {
                    if (isSortedAlphabetically) {
                      return a.song.title > b.song.title ? 1 : -1;
                    }
                    return 1;
                  })
                  .map((song) => {
                    const isFavorite = favoriteSongs.includes(song.id);
                    if (isFavoriteFilterActive && !isFavorite) {
                      return null;
                    }
                    return (
                      <SongCard
                        key={song.id}
                        id={song.id}
                        song={song.song}
                        isFavorite={isFavorite}
                        onFavoriteSong={
                          isFavorite ? removeFromFavorites : addToFavorites
                        }
                      />
                    );
                  })}
          </ul>
        </main>
      </div>
    </div>
  );
}
