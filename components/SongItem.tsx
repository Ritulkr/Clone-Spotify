"use client";

import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import useLoadSongImage from "@/hooks/useLoadSongImage";
import { Artist, Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  artist: Artist;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick, artist }) => {
  const imagePath = useLoadSongImage(data);
  const artistImage = useLoadArtistImage(artist);

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/song.jpg"}
          alt=""
          fill
        />
      </div>
      <div className="flex flex-col items-start w-full py-2">
        <p className="font-semibold text-base truncate w-full">{data.title}</p>
        <div className="w-full flex items-center justify-start">
          <div className="relative aspect-square min-w-6 w-6 h-6 rounded-md overflow-hidden flex items-center justify-center ">
            <Image
              className="object-cover"
              src={artistImage || "/images/song.jpg"}
              alt=""
              fill
            />
          </div>
          <p className="w-full truncate text-sm pl-2 text-neutral-400">
            {artist.author}
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-20 right-5"
        onClick={() => onClick(data.id)}
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
