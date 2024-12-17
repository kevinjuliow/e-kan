"use client"

import axios, { AxiosError } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  nama: string;
  email: string;
  userType: string;
}

interface UserContextProps {
  user: User | null;
  userImage: string | null;
  fetchUserImage: () => void;
}

interface Props {
  children?: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.accessToken) {
        try {
          let userType = 'pembeli'
          let response = await getUser(session?.accessToken, 'pembeli')
    
          if (!response) {
            userType = 'penjual'
            response = await getUser(session?.accessToken, 'penjual')
          }

          if (!response) {
            throw new Error()
          }

          response.userType = userType
          setUser(response);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    if (session?.accessToken) {
      fetchUser();
      console.log("fetchUser RUN ONCE")
    }
  }, [session]);

  const fetchUserImage = async () => {
    if (session?.accessToken) {
      try {
        const responseImage = await getUserImage(session?.user.userType.toLowerCase(), session?.user.id)
        
        setUserImage(responseImage ?? null)
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserImage()
      console.log("fetchUserImage RUN ONCE")
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user, userImage, fetchUserImage }}>
      {children}
    </UserContext.Provider>
  );
};

const getUser = async (accessToken: string, userType: string) => {
  try {
    const response = await axios.get(`${process.env.API_BASEURL}/api/${userType}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) {
        return null
      }
    }
  }
}

const getUserImage = async (userType: string, userId: string) => {
  try {
    const imageResponse = await axios.get(`${process.env.API_BASEURL}/api/profile-picture/${userType}/${userId}`, {
      // telling axios that the server's response isn't a normal JSON or text-based response, but rather a binary large object (Blob)
      responseType: 'blob'
    })

    if (!imageResponse) {
      throw new Error('Some error occurred when fetching an image!');
    }

    // Converts Blob into URL
    const imageUrl = URL.createObjectURL(imageResponse.data);

    return imageUrl
  } catch (error) {
    if (error instanceof Error) {
      return null
    }
  }
}

// Custom hook to access user data
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
