import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the component with no SSR
const ExploreCampaigns = dynamic(
  () => import('@/pages/Investor/explore-campaigns'),
  { ssr: false }
);

const Page = () => {
  return <ExploreCampaigns role='investor' />;
};

export default Page;