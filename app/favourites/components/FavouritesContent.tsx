"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Artist, Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";

interface FavouritesContentProps {
  songs: Song[];
  artists: Artist[];
}

const FavouritesContent: React.FC<FavouritesContentProps> = ({
  songs,
  artists,
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs?.length === 0) {
    return (
      <div className="flex w-full items-center justify-center text-neutral-400">
        No Favourite songs
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-8 mt-4 px-4 gap-4">
      {songs?.map((item) => (
        <MediaItem
          key={item.id}
          data={item}
          artist={artists.filter((artist) => artist.id === item.artist_id)[0]}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
};

export default FavouritesContent;
