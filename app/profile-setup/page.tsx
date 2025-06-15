'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

function ProfileSetupContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Get role only on client side
  const role = typeof window !== 'undefined' ? searchParams?.get('role') : null;
  
  // Set mounted state after initial render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Handle redirects and role validation
  useEffect(() => {
    if (!hasMounted) return;
    
    if (!role) {
      toast.error('No role specified');
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (role === 'entrepreneur') {
        router.push('/project-setup');
      } else if (role === 'investor') {
        router.push('/investor/dashboard');
      } else {
        toast.error('Invalid role');
        router.push('/');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasMounted, role, router]);
  
  // Show loader until client-side rendering is complete
  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Setting up your profile</h1>
        <p className="text-gray-600">Please wait while we prepare your experience...</p>
        {isLoading && (
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileSetupPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ProfileSetupContent />
    </Suspense>
  );
}
