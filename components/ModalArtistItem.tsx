"use client";

import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import { Artist } from "@/types";
import Image from "next/image";
import React from "react";

interface ModalArtistItemProps {
  data: Artist;
  onClick: (id: string) => void;
  selected: boolean;
}

const ModalArtistItem: React.FC<ModalArtistItemProps> = ({
  data,
  onClick,
  selected,
}) => {
  const artistImagePath = useLoadArtistImage(data);
  return (
    <div
      className={`flex items-center justify-center placeholder-gray-200 border-2 px-2 py-1 rounded-md gap-2 ${
        selected ? " border-emerald-500" : "border-neutral-400"
      }`}
      onClick={() => onClick(data.id)}
    >
      <div className="w-6 h-6 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden">
        <Image
          alt={data.author}
          src={artistImagePath || "/images/avatar.jpg"}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm text-neutral-400 w-full truncate">{data.author}</p>
    </div>
  );
};

export default ModalArtistItem;
