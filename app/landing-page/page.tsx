"use client";
import React from "react";
import LandingPage from "@/pages/LandingPage";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <div>
        <LandingPage />
      </div>
    </SessionProvider>
  );
};

export default page;
