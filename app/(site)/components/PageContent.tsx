"use client";

import { SongItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";
import { Artist, Song } from "@/types";
import React from "react";

interface PageContentProps {
  songs: Song[];
  artists: Artist[];
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists }) => {
  const onPlay = useOnPlay(songs);
  if (songs?.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
      {songs?.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
          artist={artists?.filter((artist) => artist.id === item.artist_id)[0]}
        />
      ))}
    </div>
  );
};

export default PageContent;
