import { useCallback, useState } from "react";

type ReturnType = {
  favoriteSongs: Array<number>;
  addToFavorites: (songId: number) => void;
  removeFromFavorites: (songId: number) => void;
};

const LOCAL_STORAGE_SONGS = "songs";

export const useFavoriteSongs = (): ReturnType => {
  const [favoriteSongs, setFavoriteSongs] = useState<Array<number>>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const localStorageSongsItem = localStorage.getItem(LOCAL_STORAGE_SONGS);
    if (!localStorageSongsItem) {
      return [];
    }
    const favoriteSongsIds: Array<number> = JSON.parse(localStorageSongsItem);
    return favoriteSongsIds;
  });

  const addToFavorites = useCallback(
    (songId: number) => {
      const updatedList = [...favoriteSongs, songId];
      if (typeof window === "undefined") {
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_SONGS, JSON.stringify(updatedList));
      setFavoriteSongs(updatedList);
    },
    [favoriteSongs]
  );

  const removeFromFavorites = useCallback(
    (songId: number) => {
      const updatedList = favoriteSongs.filter((id) => id !== songId);

      if (typeof window === "undefined") {
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_SONGS, JSON.stringify(updatedList));
      setFavoriteSongs(updatedList);
    },
    [favoriteSongs]
  );

  return {
    favoriteSongs,
    addToFavorites,
    removeFromFavorites,
  };
};
