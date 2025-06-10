import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StreamlineFunding = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-r from-blue-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Streamline Funding,<br />
              <span className="text-blue-600">Save Time & Resources</span>
            </h2>

            <p className="text-lg text-gray-600">
              Focus more on building and less on pitching loops. With BuildSpace&aposs AI-driven matching and document automation, you reduce repetitive tasks and connect faster with the right people.
            </p>

            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              <Link href="/get-started">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Image Placeholder - Replace with your actual image */}
          <div className="md:w-1/2 bg-white/80 rounded-xl p-8 shadow-md flex items-center justify-center h-64 md:h-96">
            <p className="text-gray-400">Illustration of time savings</p>
            {/* Replace with:
            <Image 
              src="/streamline-funding.png" 
              alt="Streamline funding process" 
              width={600}
              height={400}
              className="object-contain"
            />
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamlineFunding;