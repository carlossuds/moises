"use client";

import styles from "@/styles/Home.module.css";

import { FavoriteFilter, Input, SongCard, Toggle } from "@/components";
import { useDebounce, useFavoriteSongs } from "@/hooks";
import { SongType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFavoriteFilterActive = searchParams.get("filter") === "favorites";
  const isSortedAlphabetically = searchParams.get("sort") === "abc";
  const searchFilter = searchParams.get("search");

  const [songs, setSongs] = useState<Array<SongType>>([]);
  const [search, setSearch] = useState(searchFilter);

  const { favoriteSongs, addToFavorites, removeFromFavorites } =
    useFavoriteSongs();
  const debouncedValue = useDebounce(search, 500);

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

  useEffect(() => {
    const url = new URL(window.location.href);
    if (debouncedValue === null) {
      setSearch(url.searchParams.get("search"));
      return;
    }
    if (debouncedValue === "") {
      url.searchParams.delete("search");
    } else {
      url.searchParams.set("search", debouncedValue);
    }
    router.replace(url.href);
  }, [debouncedValue]);

  const onToggleClick = useCallback(() => {
    const url = new URL(window.location.href);
    if (isSortedAlphabetically) {
      url.searchParams.delete("sort");
    } else {
      url.searchParams.set("sort", "abc");
    }
    router.replace(url.href);
  }, [router, isSortedAlphabetically]);

  const filterBySearch = useCallback(
    (song: SongType) => {
      if (!searchFilter) {
        return true;
      }
      const searchLowerCase = searchFilter?.toLowerCase();
      return (
        song.id.toString().toLowerCase().includes(searchLowerCase) ||
        song.song.album.title.toLowerCase().includes(searchLowerCase) ||
        song.song.album.year
          .toString()
          .toLowerCase()
          .includes(searchLowerCase) ||
        song.song.title.toLowerCase().includes(searchLowerCase) ||
        song.song.artist.toLowerCase().includes(searchLowerCase)
      );
    },
    [searchFilter]
  );

  const toggleSort = useCallback(
    (a: SongType, b: SongType) => {
      if (isSortedAlphabetically) {
        return a.song.title > b.song.title ? 1 : -1;
      }
      return 1;
    },
    [isSortedAlphabetically]
  );

  return (
    <div className={styles.container}>
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
              <Toggle
                checked={isSortedAlphabetically}
                onClick={onToggleClick}
              />
            </div>
            <Input
              placeholder="Search in your library"
              onChange={(event) => setSearch(event.target.value)}
              value={search ?? ""}
            />
          </section>
        </header>

        <main>
          <ul className={styles.song_list}>
            {!songs.length
              ? [...Array(5)].map((_, index) => <SongCard key={index} />)
              : [...songs]
                  .filter(filterBySearch)
                  .sort(toggleSort)
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
