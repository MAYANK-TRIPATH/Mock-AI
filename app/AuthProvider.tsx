"use client";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import React, { useEffect, ReactNode, useState } from "react";
import { UserContext } from "./_context/UserContext";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserData {
  name: string;
  email: string;
  credits: number;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = useUser();
  const createUser = useMutation(api.users.CreateUser); // ✅ Fix: lowercase function
  const [userData, setUserData] = useState<UserData | null>(null); // ✅ Fix: Add type

  useEffect(() => {
    if (user?.displayName && user?.primaryEmail) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    try {
      const result = await createUser({
        name: user!.displayName,
        email: user!.primaryEmail,
      });
      console.log(result);
      setUserData(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
