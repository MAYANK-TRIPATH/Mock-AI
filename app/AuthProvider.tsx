"use client";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import React, { useEffect, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const user = useUser();
  const CreateUser = useMutation(api.users.CreateUser);

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  const CreateNewUser = async () => {
    if (!user) return;
    try {
      const result = await CreateUser({
        name: user.displayName ?? "",
        email: user.primaryEmail ?? "",
      });
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return <div>{children}</div>;
};

export default AuthProvider;
