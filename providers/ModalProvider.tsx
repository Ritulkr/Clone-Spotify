"use client";

import { useEffect, useState } from "react";

import { AuthModal } from "@/components";
import UploadModal from "@/components/UploadModal";
import ArtistModal from "@/components/ArtistModal";
import SongModal from "@/components/SongModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <ArtistModal />
      <SongModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
