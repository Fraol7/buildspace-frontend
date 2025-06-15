'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
import StartupSetup from '@/pages/Entrepreneur/startup-setup';

export default function StartupSetupPage() {
  // const router = useRouter();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [startupData, setStartupData] = useState({
  //   startupName: '',
  //   description: '',
  //   industry: '',
  //   fundingGoal: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setStartupData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
    
  //   try {
  //     // TODO: Replace with actual API call to save startup data
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // After startup setup, redirect to entrepreneur dashboard
  //     router.push('/entrepreneur/dashboard');
  //   } catch (error) {
  //     console.error('Startup setup failed:', error);
  //     toast.error('Failed to save startup. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <StartupSetup />
  );
}
