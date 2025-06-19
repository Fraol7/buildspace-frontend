"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useStartupStore } from "@/store/startupStore";
import { useInvestmentStore } from "@/store/investmentStore";

// Define interfaces
interface StartupDetailProps {
  startupId: string;
}

export interface User {
  id: string;
  role: "investor" | "entrepreneur" | "guest";
  email: string;
  name: string;
  startups?: Array<{ id: string }>;
  userId?: string;
}

export interface Startup {
  id: string;
  userId: string;
  name: string;
  // Add other startup properties as needed
}

// Dynamically import components with no SSR and proper typing
const StartupDetailOwner = dynamic<StartupDetailProps>(
  () =>
    import("@/pages/Common/startup-details-owner").then(
      (mod) => mod.default as React.ComponentType<StartupDetailProps>
    ),
  { ssr: false }
);

const StartupDetailInvested = dynamic<StartupDetailProps>(
  () =>
    import("@/pages/Common/startup-details-invested").then(
      (mod) => mod.default as React.ComponentType<StartupDetailProps>
    ),
  { ssr: false }
);

const StartupDetailInvestor = dynamic<StartupDetailProps>(
  () =>
    import("@/pages/Common/startup-details-investor").then(
      (mod) => mod.default as React.ComponentType<StartupDetailProps>
    ),
  { ssr: false }
);

const StartupDetailGeneral = dynamic<StartupDetailProps>(
  () =>
    import("@/pages/Common/startup-details-general").then(
      (mod) => mod.default as React.ComponentType<StartupDetailProps>
    ),
  { ssr: false }
);

const ProjectDetailPage = () => {
  // const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // Extract startup ID from the URL

  const { data: session, status } = useSession();
  const { startup, loading, fetchStartupById, user, fetchUserById } =
    useStartupStore();
  const { investments, getMyInvestments } = useInvestmentStore();

  useEffect(() => {
    if (id && session?.accessToken) {
      fetchStartupById(id, session.accessToken);

      if (session?.user.role === "investor" && session.accessToken) {
        getMyInvestments(session.accessToken);
      }
    }
  }, [id, session?.accessToken]);

  useEffect(() => {
    if (startup && session?.accessToken) {
      fetchUserById(startup?.user_id, session.accessToken);
    }
  }, [startup]);

  if (loading || status === "loading" || !startup) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Determine which page to render
  if (session?.user.role === "startup" && startup.user_id === session.user.id) {
    return <StartupDetailOwner startupId={startup.id} />;
  } else if (
    session?.user.role === "investor" &&
    investments.some((investment) => investment.startup_id.id === startup.id)
  ) {
    return <StartupDetailInvested startupId={startup.id} />;
  } else if (session?.user.role === "investor") {
    return <StartupDetailInvestor startupId={startup.id} />;
  } else if (session?.user.role === "startup") {
    return <StartupDetailGeneral startupId={startup.id} />;
  }

  return <div>Error: Unable to determine page to render.</div>;
};

export default ProjectDetailPage;
