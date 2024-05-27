import getSongsByTitle from "@/actions/getSongsByTitle";
import { Header, SearchInput } from "@/components";
import SearchContent from "./components/SearchContent";
import getArtist from "@/actions/getArtists";

interface SearchProps {
  searchParams: {
    title: string;
  };
}
export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  const artists = await getArtist();
  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <h2 className="my-4 text-xl font-bold text-neutral-400">
          Search here by song title
        </h2>

        <SearchInput />
      </Header>

      <div className="w-full flex-1">
        <SearchContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Search;
