"use client";

import { Button } from "@/components";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiCrownedHeart } from "react-icons/gi";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, user, subscription } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirecttoCustomPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-4 flex flex-col items-start justify-start gap-4">
      {!subscription && (
        <div className="w-full flex items-center justify-end">
          <p>No Active Plan</p>
          <Button onClick={subscribeModal.onOpen}>Subscribe</Button>
        </div>
      )}

      {subscription && (
        <div className="w-full flex items-center justify-end">
          <div className="flex items-center justify-center gap-2">
            <p className="text-neutral-300">
              You are currently on the{" "}
              <b>{subscription?.prices?.products?.name}</b>
            </p>

            <GiCrownedHeart className="text-yellow-400" size={25} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-start gap-3">
        <div className="w-12 min-w-12 h-12 rounded-md bg-neutral-600 cursor-pointer flex items-center justify-center relative">
          {user?.user_metadata?.avatar_url ? (
            <img
              onClick={() => router.push("/account")}
              src={user?.user_metadata?.avatar_url}
              className="w-full h-full object-cover rounded-md"
              alt=""
            />
          ) : (
            <p className="text-xl font-bold">{user?.user_metadata?.name[0]}</p>
          )}
        </div>

        <p className="text-lg font-semibold text-neutral-300 whitespace-nowrap">
          {user?.user_metadata?.name}
        </p>

        <Button
          disabled={loading || isLoading}
          onClick={redirecttoCustomPortal}
          className="w-full md:w-64"
        >
          Open Customer Portal
        </Button>
      </div>
    </div>
  );
};

export default AccountContent;
