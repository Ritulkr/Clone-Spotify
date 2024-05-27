"use client";

import React from "react";
import Image from "next/image";

import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import { Artist } from "@/types";

interface ArtistItemProps {
  data: Artist;
  onClick: (id: string) => void;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadArtistImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/avatar.jpg"}
          alt=""
          fill
        />
      </div>

      <p className="truncate w-full font-semibold text-center">
        {data?.author}
      </p>
    </div>
  );
};

export default ArtistItem;
