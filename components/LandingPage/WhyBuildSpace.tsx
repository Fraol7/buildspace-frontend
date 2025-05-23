import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const FeatureCard = ({ title, description, linkText }: { title: string; description: string; linkText: string }) => {
  return (
    <div className="group relative bg-white p-8 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-indigo-900 mb-4 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 group-hover:text-white transition-colors duration-300">
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
  const features = [
    {
      title: "🔍 AI-Powered Investment Insights",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at faucibus vitae libero tellus enim eros, tristique. Lorem aliquet nunc bibendum.",
      linkText: "Learn More"
    },
    {
      title: "🤝 Matchmaking That Matters",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at faucibus vitae libero tellus enim eros, tristique. Lorem aliquet nunc bibendum.",
      linkText: "Learn More"
    },
    {
      title: "🚀 Accelerate Startup Growth",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at faucibus vitae libero tellus enim eros, tristique. Lorem aliquet nunc bibendum.",
      linkText: "Learn More"
    },
    {
      title: "🌐 A Hub for Collaboration",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at faucibus vitae libero tellus enim eros, tristique. Lorem aliquet nunc bibendum.",
      linkText: "Learn More"
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Right-side blue circle background */}
      {/* <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-indigo-100/30 blur-3xl -z-10"></div> */}
      
      {/* New left-side light blue circle */}
      <div className="absolute top-1/5 -left-[15%] w-[450px] h-[450px] rounded-full bg-blue-100 -z-10"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-start mb-16 ml-24 flex flex-row justify-between space-x-16 items-end">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">💡 Why BuildSpace?</h2>
          <p className="text-md text-gray-600 max-w-lg mx-auto">
            BuildSpace is your hub for innovation, offering AI-powered sentiment analysis, crowdfunding opportunities, and a dynamic collaboration space to turn ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
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