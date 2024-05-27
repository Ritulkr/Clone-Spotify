import { Header } from "@/components";
import AccountContent from "./components/AccountContent";

export const revalidate = 0;

const Account = () => {
  return (
    <div className=" rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* header */}
      <Header>
        <h2 className="my-4 text-xl font-bold text-neutral-400">
          Account Settings
        </h2>
      </Header>

      <div className="w-full flex-1">
        <AccountContent />
      </div>
    </div>
  );
};

export default Account;
