import getFavorites from "@/actions/getFavorites";
import { Header } from "@/components";
import { FaHeart } from "react-icons/fa";
import FavouritesContent from "./components/FavouritesContent";
import getArtist from "@/actions/getArtists";

export const revalidate = 0;

const Favourites = async () => {
  const songs = await getFavorites();
  const artists = await getArtist();
  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-24">
          <div className="w-24 h-24 rounded-md lg:w-32 lg:h-32 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-gray-500 transition">
            <FaHeart className="text-3xl text-white" />
          </div>
          <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start transition">
            <p className="hidden lg:block text-lg text-neutral-400 font-semibold">
              Playlist
            </p>
            <p className="text-white text-3xl lg:text-4xl font-bold">
              Favourite Songs
            </p>
          </div>
        </div>
      </Header>

      <div className="w-full flex-1">
        <FavouritesContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Favourites;
