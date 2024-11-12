"use client"

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  data: {
    id: number;
    nama: string;
    email: string;
  }
}

interface UserContextProps {
  user: User | null;
}

interface Props {
  children?: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.accessToken) {
        try {
          const response = await axios.get(`${process.env.API_BASEURL}/api/pembeli/profile`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    if (session?.accessToken) {
      fetchUser();
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
