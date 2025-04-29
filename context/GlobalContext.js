"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

// Create a context for the global state
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) {
          setUnreadMessageCount(res.count);
        }
      });
    }
  }, [getUnreadMessageCount]);

  return (
    <GlobalContext.Provider
      value={{ unreadMessageCount, setUnreadMessageCount }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
