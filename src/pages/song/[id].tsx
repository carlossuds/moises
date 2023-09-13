import React, { useEffect, useState } from "react";
import styles from "@/styles/Song.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { SongType } from "@/types";
import { SongCard } from "@/components";

export default function SongId() {
  const router = useRouter();
  const [song, setSong] = useState<SongType>();
  const [relatedSongs, setRelatedSongs] = useState<Array<SongType>>([]);

  const fetchSong = async (id: string | number): Promise<SongType> => {
    const response = await fetch(`http://localhost:3003/songs/${id}`);
    const json = await response.json();
    return json;
  };

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

  console.log(relatedSongs);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <div className={styles.image_container}>
            <Image
              fill
              objectFit="cover"
              alt="xd"
              src={`/assets/images/${song?.song.files.coverArt}`}
            />
          </div>

          <div>
            <div>
              play
              <div></div>
            </div>
          </div>
        </section>

        <span>Other albumns</span>
        <section>
          <ul>
            {relatedSongs.map((song) => (
              <SongCard id={song.id} song={song.song} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
