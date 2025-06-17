import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StartupDetailOwner from '@/pages/Common/startup-details-owner';
import StartupDetailInvested from '@/pages/Common/startup-details-invested';
import StartupDetailInvestor from '@/pages/Common/startup-details-investor';
import StartupDetailGeneral from '@/pages/Common/startup-details-general';

const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract startup ID from the URL
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        // Fetch the logged-in user details
        const userResponse = await fetch('/api/auth/user'); // Replace with your auth endpoint
        const userData = await userResponse.json();
        setLoggedInUser(userData);

        // Fetch the startup details using the ID
        const startupResponse = await fetch(`/api/startups/${id}`); // Replace with your startups endpoint
        const startupData = await startupResponse.json();
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
    return <div>Loading...</div>;
  }

  // Determine which page to render
  if (
    loggedInUser.role === 'entrepreneur' &&
    startup.userId === loggedInUser.id
  ) {
    return <StartupDetailOwner startupId={startup.id} />;
  } else if (
    loggedInUser.role === 'investor' &&
    loggedInUser.startups.some((startup) => startup.id === startup.id)
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
