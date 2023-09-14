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
  }, [router.query.id, fetchSong]);

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
            </section>

            {Boolean(relatedSongs.length) && (
              <>
                <span>Other albums</span>
                <section>
                  <ul>
                    {relatedSongs.map((song) => (
                      <SongCard key={song.id} id={song.id} song={song.song} />
                    ))}
                  </ul>
                </section>
              </>
            )}
          </>
        )}

        <div className={styles.background_image}>
          <Image
            fill
            objectFit="contain"
            alt={`${song?.song.artist} - ${song?.song.album.title}`}
            src={`/assets/images/${song?.song.files.poster}`}
          />
        </div>
      </div>
    </div>
  );
}
