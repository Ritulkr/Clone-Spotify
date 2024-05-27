import getArtist from "@/actions/getArtists";
import { Button, Header } from "@/components";

import { FaPlus, FaSearch } from "react-icons/fa";
import PageContent from "./components/PageContent";

export const revalidate = 0;

const Artists = async () => {
  const artists = await getArtist();
  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <h2 className="my-4 text-xl font-bold text-neutral-400">
          Our Popular Artists
        </h2>
      </Header>

      <div className="w-full flex-1">
        <PageContent artists={artists} />
      </div>
    </div>
  );
};

export default Artists;
