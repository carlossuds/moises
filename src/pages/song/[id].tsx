import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Song.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { SongType } from "@/types";
import { AudioPlayer, SongCard } from "@/components";
import { useFavoriteSongs } from "@/hooks";

export default function SongId() {
  const router = useRouter();
  const [song, setSong] = useState<SongType>();

  const [relatedSongs, setRelatedSongs] = useState<Array<SongType>>([]);

  const { favoriteSongs, addToFavorites, removeFromFavorites } =
    useFavoriteSongs();

  const fetchSong = useCallback(
    async (id: string | number): Promise<SongType> => {
      const response = await fetch(`http://localhost:3003/songs/${id}`);
      const json = await response.json();
      return json;
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const song = await fetchSong(router.query.id as string);
        const relatedIds = song.related ?? [];
        setSong(song);

        const songs: Array<SongType> = [];
        for (const id of relatedIds) {
          songs.push(await fetchSong(id));
        }

        setRelatedSongs(songs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router.query.id]);

  const isFavorite = Boolean(song?.id && favoriteSongs.includes(song?.id));
  const onFavoriteClick = isFavorite ? removeFromFavorites : addToFavorites;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {song && (
          <>
            <section>
              <div className={styles.image_container}>
                <Image
                  fill
                  objectFit="cover"
                  alt="xd"
                  src={`/assets/images/${song.song.files.coverArt}`}
                />
              </div>

              <AudioPlayer
                isFavorite={isFavorite}
                song={song}
                onFavoriteClick={onFavoriteClick}
              />
              {/* <div className={styles.player}>
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
                      <button
                        type="button"
                        onClick={() => onFavoriteClick(song.id)}
                      >
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
              </div> */}
            </section>

            <span>Other albumns</span>
            <section>
              <ul>
                {relatedSongs.map((song) => (
                  <SongCard id={song.id} song={song.song} />
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
