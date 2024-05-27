import getSongs from "@/actions/getSongs";
import { Header } from "@/components";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";
import PageContent from "./components/PageContent";
import getArtist from "@/actions/getArtists";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();
  const artists = await getArtist();

  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <h2 className="my-4 text-xl font-bold text-neutral-400">
          Welcome Back
        </h2>

        <Link
          href={"/favourites"}
          className="w-full flex items-center justify-start"
        >
          <div className="rounded-md bg-neutral-400/20 pr-12 flex items-center justify-center overflow-hidden gap-2 cursor-pointer">
            <div className="aspect-square w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-400 to-neutral-400/45">
              <FaHeart />
            </div>
            <p>Liked Songs</p>
          </div>
        </Link>
      </Header>

      <div className="w-full flex-1">
        <PageContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Home;
