"use client";

import { ArtistItem } from "@/components";
import { Artist } from "@/types";
import React from "react";

interface PageContentProps {
  artists: Artist[];
}

const PageContent: React.FC<PageContentProps> = ({ artists }) => {
  if (artists?.length === 0) {
    return <div className="mt-4 text-neutral-400">No Artists available</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
      {artists?.map((item) => (
        <ArtistItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
