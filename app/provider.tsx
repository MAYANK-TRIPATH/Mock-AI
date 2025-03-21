"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Suspense, ReactNode } from "react";
import AuthProvider from "./AuthProvider";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined in environment variables.");
  }

  const convex = new ConvexReactClient(convexUrl);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConvexProvider client={convex}>
        <AuthProvider>{children}</AuthProvider>
      </ConvexProvider>
    </Suspense>
  );
};

export default Provider;
