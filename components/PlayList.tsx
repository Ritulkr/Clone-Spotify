"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const PlayList = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={20} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-base">
            Your Playlist
          </p>
        </div>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer transition hover:text-white"
          onClick={handleClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of Playlist</div>
    </div>
  );
};

export default PlayList;
