import React from 'react'
import dynamic from 'next/dynamic';

// Dynamically import the component with no SSR
const ExploreCampaigns = dynamic(
  () => import('@/pages/Entrepreneur/explore-campaigns'),
  { ssr: false }
);

const Page = () => {
  return <ExploreCampaigns role='entrepreneur' />;
};

export default Page;