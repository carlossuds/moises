import { SongType } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useSongs = ({ search }: { search: string }) => {
  const [songs, setSongs] = useState<Array<SongType>>([]);

  const filterBySearch = useCallback(
    (song: SongType) => {
      if (!search) {
        return false;
      }
      const searchLowerCase = search?.toLowerCase();
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
    [search]
  );

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

  return {
    songs,
    filteredSongs: songs.filter(filterBySearch),
  };
};
