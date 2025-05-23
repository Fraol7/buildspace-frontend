"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  // Redirect programmatically
  useEffect(() => {
    router.push('./admin/dashboard');
  }, [router]);

  return null; // Return null since there is nothing to render
};

export default Page;
