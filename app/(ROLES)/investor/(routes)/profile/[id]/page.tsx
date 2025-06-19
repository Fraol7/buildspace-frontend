"use client";

import React from "react";
import { useParams } from "next/navigation";
import EntrepreneurProfile from "@/pages/Common/entrepreneur-profile";
import InvestorProfile from "@/pages/Common/investor-profile";
import { SessionProvider, useSession } from "next-auth/react";

const Page = () => {
  // const params = useParams();
  // const id = params?.id as string;
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  return (
    <SessionProvider>
      <div>
        {session?.user.role === "startup" ? (
          <EntrepreneurProfile /> //userId={user.id}
        ) : session?.user.role === "investor" ? (
          <InvestorProfile /> //userId={user.id}
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg font-medium text-red-600">Invalid role</div>
          </div>
        )}
      </div>
    </SessionProvider>
  );
};

export default Page;
