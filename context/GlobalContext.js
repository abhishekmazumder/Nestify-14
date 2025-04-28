"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCounte";

// Create a context for the global state
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUnreadMessageCount = async () => {
      try {
        const { count } = await getUnreadMessageCount();
        setUnreadMessageCount(count);
      } catch (error) {
        console.error("Error fetching unread message count:", error);
      }
    };

    if (session) {
      fetchUnreadMessageCount();
    }
  }, [session, unreadMessageCount]);

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
