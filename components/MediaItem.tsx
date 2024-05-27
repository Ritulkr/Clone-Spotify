"use client";

import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import useLoadSongImage from "@/hooks/useLoadSongImage";
import { Artist, Song } from "@/types";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { useUser } from "@/hooks/useUser";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song;
  artist: Artist;
  className?: string;
  onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  artist,
  onClick,
  className,
}) => {
  const songImagePath = useLoadSongImage(data);
  const artistImagePath = useLoadArtistImage(artist);
  const { user } = useUser();
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex w-full items-center justify-start px-4 py-2 rounded-md bg-neutral-400/10 drop-shadow-md gap-4 cursor-pointer opacity-75 hover:opacity-100",
        className
      )}
    >
      <div className="aspect-square w-24 h-16 rounded-md overflow-hidden relative">
        <Image
          className="object-cover"
          src={songImagePath || "/images/song.jpg"}
          alt=""
          fill
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-y-1">
        <p className="w-full md:w-40 truncate font-semibold">{data.title}</p>

        {artist && (
          <div className="flex items-center justify-center gap-2">
            <div className="aspect-square w-6 h-6 rounded-full overflow-hidden relative">
              <Image
                className="object-cover"
                src={artistImagePath || "/images/avatar.jpg"}
                alt=""
                fill
              />
            </div>
            <p className="text-sm text-neutral-400">{artist?.author}</p>
          </div>
        )}
      </div>

      {user && <LikeButton songId={data.id} />}
    </div>
  );
};

export default MediaItem;
