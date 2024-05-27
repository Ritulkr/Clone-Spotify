"use client";

import { MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";
import { Artist, Song } from "@/types";
import React from "react";

interface SearchContentProps {
  songs: Song[];
  artists: Artist[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, artists }) => {
  const onPlay = useOnPlay(songs);
  if (songs?.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-neutral-400">
        No songs found
      </div>
    );
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

export default SearchContent;
