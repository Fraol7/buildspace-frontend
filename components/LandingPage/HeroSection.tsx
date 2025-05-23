import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
// import Image from 'next/image';
// import Header from './Header';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-200 via-purple-100 to-white min-h-[100vh] flex flex-col items-center">
      {/* <Header /> */}
      <div className="container flex flex-row mx-auto px-4 py-16 md:my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connecting Entrepreneurs & Investors for a Brighter Future
          </h1>
          <p className="text-xl md:text-2xl text-indigo-900 mb-10">
            Discover, fund, and grow innovative ideas with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild variant="outline" className="bg-indigo-800 text-white hover:bg-white px-8 py-6 text-lg">
              <Link href="/auth/login">
                Get Started
              </Link>
            </Button>

            <Button asChild variant="outline" className="bg-indigo-800 text-white hover:bg-white px-8 py-6 text-lg">
              <Link href="/auth/login">
                Explore Opportunities
              </Link>
            </Button>
          </div>

        </div>
        {/* Placeholder for image - replace with your actual image */}
        {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl w-full h-64 md:h-80 flex items-center justify-center">
          <p className="text-indigo-200">Innovation showcase image will go here</p>
          <Image
            src="/hero-image.png"
            alt="Entrepreneurs collaborating"
            width={1200}
            height={600}
            className="rounded-xl object-cover"
          />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;