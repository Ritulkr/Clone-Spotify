import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  // like it can be a general prop name
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  // lets extract some couple of things from session context, which we cannot use because we wrapped our
  // entire application inside the supabase propvider
  const {
    session,
    isLoading: isUserLoading,
    supabaseClient: supabase,
  } = useSessionContext();

  //   remapping the useUser as useSupaUser -> Because we already defined one hook as useUser
  const user = useSupaUser();
  //   ?? null: This is the nullish coalescing operator. It returns the right-hand operand (in this case, null)
  // when the left-hand operand is null or undefined. If session?.access_token is null or undefined, accessToken will be set to null.
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  //   function to fetch the user details
  const getUserDetails = () => supabase.from("users").select("*").single();

  // function fetch the subscription details along with data from the realtion tables too
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  //   now wxecute these functions inside the useEffectHook
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingData && !isUserLoading) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isUserLoading]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isUserLoading || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
