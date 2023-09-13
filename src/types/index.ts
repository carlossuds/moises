export type SongAlbumType = {
  title: string;
  year: number;
};

export type SongFilesType = {
  coverArt: string;
  poster: string;
  audio: string;
};

export type SongType = {
  id: number;
  song: {
    album: SongAlbumType;
    artist: string;
    title: string;
    files: SongFilesType;
  };
  related?: Array<number>;
};
