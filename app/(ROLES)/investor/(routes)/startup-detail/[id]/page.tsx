"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Define interfaces
interface StartupDetailProps {
  startupId: string;
}

export interface User {
  id: string;
  role: 'investor' | 'entrepreneur' | 'guest';
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
  () => import('@/pages/Common/startup-details-owner').then(mod => mod.default as React.ComponentType<StartupDetailProps>),
  { ssr: false }
);

const StartupDetailInvested = dynamic<StartupDetailProps>(
  () => import('@/pages/Common/startup-details-invested').then(mod => mod.default as React.ComponentType<StartupDetailProps>),
  { ssr: false }
);

const StartupDetailInvestor = dynamic<StartupDetailProps>(
  () => import('@/pages/Common/startup-details-investor').then(mod => mod.default as React.ComponentType<StartupDetailProps>),
  { ssr: false }
);

const StartupDetailGeneral = dynamic<StartupDetailProps>(
  () => import('@/pages/Common/startup-details-general').then(mod => mod.default as React.ComponentType<StartupDetailProps>),
  { ssr: false }
);

const ProjectDetailPage = () => {
  // const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // Extract startup ID from the URL
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        // Fetch the logged-in user details
        const userResponse = await fetch('/api/auth/user');
        if (!userResponse.ok) throw new Error('Failed to fetch user');
        const userData: User = await userResponse.json();
        setLoggedInUser(userData);

        // Fetch the startup details using the ID
        const startupResponse = await fetch(`/api/startups/${id}`);
        if (!startupResponse.ok) throw new Error('Failed to fetch startup');
        const startupData: Startup = await startupResponse.json();
        setStartup(startupData);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading || !loggedInUser || !startup) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Determine which page to render
  if (
    loggedInUser.role === 'entrepreneur' &&
    startup.userId === loggedInUser.id
  ) {
    return <StartupDetailOwner startupId={startup.id} />;
  } else if (
    loggedInUser.role === 'investor' &&
    loggedInUser.startups?.some((s) => s.id === startup.id)
  ) {
    return <StartupDetailInvested startupId={startup.id} />;
  } else if (loggedInUser.role === 'investor') {
    return <StartupDetailInvestor startupId={startup.id} />;
  } else if (loggedInUser.role === 'entrepreneur') {
    return <StartupDetailGeneral startupId={startup.id} />;
  }

  return <div>Error: Unable to determine page to render.</div>;
};

export default ProjectDetailPage;
