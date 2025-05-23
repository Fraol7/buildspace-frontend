import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image 
        src="/images/404.jpg" 
        alt="404 Illustration" 
        width={500} 
        height={400} 
        className="mb-6"
      />
      <h1 className="text-4xl font-extrabold text-red-700 mb-2">Oops!</h1>
      <p className="text-xl text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <Button asChild variant="outline" className="bg-indigo-800 text-white hover:bg-white px-8 py-6 text-lg rounded-xl">
        <Link href="/">
          Go Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
