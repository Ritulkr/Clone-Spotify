"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { FaHeart, FaSpotify, FaUsers } from "react-icons/fa6";
import { BsMusicNoteList } from "react-icons/bs";
import { TbMusicPlus } from "react-icons/tb";
import { IoIosPersonAdd } from "react-icons/io";
import { Box, Button, PlayList, RightBar, SideBarItem } from ".";
import { GiCrownedHeart, GiImperialCrown } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";

import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import useArtistModal from "@/hooks/useArtistModal";
import Link from "next/link";
import useSongModal from "@/hooks/useSongModal";
import { PuffLoader, RingLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Image from "next/image";

interface sidebarProps {
  children: React.ReactNode;
}

const SideBar: React.FC<sidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const router = useRouter();
  const authModal = useAuthModal();
  const songModal = useSongModal();
  const artistModal = useArtistModal();
  const subscribeModal = useSubscribeModal();
  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();
  const player = usePlayer();

  const handleLogout = async () => {
    console.log(user);
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  const routes = useMemo(
    () => [
      {
        icon: FaHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: FaSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: FaHeart,
        label: "Favourites",
        active: pathname === "/favourites",
        href: "/favourites",
      },
      {
        icon: FaUsers,
        label: "Artists",
        active: pathname === "/artists",
        href: "/artists",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        "flex h-full backdrop-blur-md bg-black/50",
        player.activeId && "h-[calc(100%-96px)]"
      )}
    >
      <div className="flex h-full flex-col backdrop-blur-sm">
        <div className="w-full flex items-center gap-3 px-4 py-6">
          <FaSpotify className="text-4xl" />
          <p className="hidden md:block text-xl font-semibold">Spotify</p>
        </div>

        <div className="hidden md:flex flex-col gap-y-2  w-[300px] h-full">
          <Box>
            <div className="flex flex-col gap-y-4 py-4 px-4">
              {routes.map((item) => (
                <SideBarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
          {user && (
            <Box className="overflow-y-auto h-full px-4">
              <PlayList />
            </Box>
          )}
        </div>

        <div className="flex md:hidden transition flex-col items-center justify-center">
          <div className="flex flex-col gap-y-4 py-4 px-4">
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-6">{children}</main>
      <RightBar>
        {!user ? (
          <Button onClick={authModal.onOpen}>
            <FaUser size={20} className="text-black" />
          </Button>
        ) : (
          <div className="w-12 h-12 rounded-full bg-neutral-600 cursor-pointer flex items-center justify-center relative">
            {user?.user_metadata?.avatar_url ? (
              <img
                onClick={() => router.push("/account")}
                src={user?.user_metadata?.avatar_url}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            ) : (
              <p className="text-xl font-bold">
                {user?.user_metadata?.name[0]}
              </p>
            )}
          </div>
        )}

        <Link href={"/artists"} className="bg-transparent px-2 py-2">
          <FaUsers className="text-2xl text-neutral-400" />
        </Link>

        <Link href={"/songs"} className="bg-transparent px-2 py-2">
          <BsMusicNoteList className="text-2xl text-neutral-400" />
        </Link>

        {user?.id === "e4048f6d-2d24-4284-8972-e630ad01fd6e" && (
          <React.Fragment>
            <Button
              onClick={() => artistModal.onOpen()}
              className="bg-transparent"
            >
              <IoIosPersonAdd className="text-2xl text-neutral-400" />
            </Button>

            <Button
              onClick={() => songModal.onOpen()}
              className="bg-transparent"
            >
              <TbMusicPlus className="text-2xl text-neutral-400" />
            </Button>
          </React.Fragment>
        )}

        {!subscription && (
          <div
            onClick={() => subscribeModal.onOpen()}
            className="flex flex-col items-center justify-center gap-y-2 mt-auto"
          >
            <GiImperialCrown className="text-white" size={24} />
            <p className="whitespace-nowrap text-neutral-400 font-normal text-lg">
              Go <span className="text-white">Pro</span>
            </p>
          </div>
        )}

        {subscription && (
          <div className="flex  flex-col items-center justify-center gap-y-2 mt-auto relative">
            <GiCrownedHeart className="text-white" size={35} />
          </div>
        )}
        {user && (
          <CiLogout
            size={25}
            className="text-neutral-400 cursor-pointer"
            onClick={handleLogout}
          />
        )}
      </RightBar>
    </div>
  );
};

export default SideBar;
