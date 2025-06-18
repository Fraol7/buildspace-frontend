'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EntrepreneurProfile from '@/pages/Common/entrepreneur-profile';
import InvestorProfile from '@/pages/Common/investor-profile';

interface User {
  id: string;
  role: 'entrepreneur' | 'investor';
  [key: string]: string; // For any additional user properties
}

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        // In a real app, replace this with your actual API endpoint
        // const response = await fetch(`/api/users/${id}`);
        // const data = await response.json();
        
        // Mock data - replace with actual API call
        const mockUsers: Record<string, User> = {
          'ent1': { id: 'ent1', role: 'entrepreneur', name: 'John Doe' },
          'inv1': { id: 'inv1', role: 'investor', name: 'Jane Smith' },
        };
        
        const data = mockUsers[id as string];
        
        if (!data) {
          setError('User not found');
          return;
        }
        
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">{error || 'User not found'}</div>
      </div>
    );
  }

  return (
    <div>
      {user.role === 'entrepreneur' ? (
        <EntrepreneurProfile  /> //userId={user.id}
      ) : user.role === 'investor' ? (
        <InvestorProfile /> //userId={user.id}
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg font-medium text-red-600">Invalid role</div>
        </div>
      )}
    </div>
  );
};

export default Page;