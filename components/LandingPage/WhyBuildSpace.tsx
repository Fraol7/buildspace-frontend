import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { FEATURES } from '@/constants';

const FeatureCard = ({ title, description, linkText }: { title: string; description: string; linkText: string }) => {
  return (
    <div className="group relative bg-white p-6 md:p-8 rounded-xl shadow-md overflow-hidden border-2 border-indigo-50 transition-all duration-300 hover:shadow-lg">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-indigo-900 mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 group-hover:text-white transition-colors duration-300">
          {description}
        </p>
        <Button asChild variant="link" className="px-0 text-indigo-600 hover:text-white group-hover:text-white transition-colors duration-300">
          <Link href="#">
            {linkText} →
          </Link>
        </Button>
      </div>
    </div>
  );
};

const WhyBuildSpace = () => {
  return (
    <section className="relative py-10 px-4 md:py-20 md:px-6 lg:px-8 overflow-hidden">
      {/* New left-side light blue circle */}
      <div className="absolute top-1/5 -left-[25%] md:-left-[15%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-blue-100 -z-10"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center md:text-start mb-10 md:mb-16 px-4 md:px-0">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">💡 Why BuildSpace?</h2>
          <p className="text-sm md:text-base text-gray-600 mt-4 max-w-2xl mx-auto md:mx-0">
            BuildSpace is your hub for innovation, offering AI-powered sentiment analysis, crowdfunding opportunities, and a dynamic collaboration space to turn ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildSpace;
