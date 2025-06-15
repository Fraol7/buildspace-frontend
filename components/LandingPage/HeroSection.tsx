"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative top-0 bg-gradient-to-b from-blue-100 via-indigo-50 to-blue-50 min-h-[100vh] flex flex-col items-center overflow-hidden">
      {/* Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large flowing organic shapes */}
        <svg
          className="absolute inset-0 w-full h-full animate-bubble"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main large flowing shape - top right */}
          <path
            d="M800 -100C950 -50 1100 50 1150 200C1200 350 1100 500 950 550C800 600 650 550 600 400C550 250 650 150 800 -100Z"
            fill="url(#mainGradient1)"
            opacity="0.5"
          />

          {/* Secondary flowing shape - bottom left */}
          <path
            d="M-50 500C100 450 250 500 300 650C350 800 250 950 100 1000C-50 1050 -200 1000 -250 850C-300 700 -200 600 -50 500Z"
            fill="url(#mainGradient2)"
            opacity="0.4"
          />

          {/* Medium flowing shape - center */}
          <path
            d="M400 200C550 150 700 200 750 350C800 500 700 650 550 700C400 750 250 700 200 550C150 400 250 300 400 200Z"
            fill="url(#mainGradient3)"
            opacity="0.3"
          />

          <defs>
            <radialGradient id="mainGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(224 242 254)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="rgb(191 219 254)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(147 197 253)" stopOpacity="0.3" />
            </radialGradient>

            <radialGradient id="mainGradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(191 219 254)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="rgb(224 242 254)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(147 197 253)" stopOpacity="0.2" />
            </radialGradient>

            <radialGradient id="mainGradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(191 233 255)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(224 242 254)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(147 197 253)" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>

        {/* Additional circular elements for depth with animation */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-radial from-white via-blue-100 to-transparent rounded-full blur-2xl animate-bubble-slow"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-radial from-blue-200 via-white to-transparent rounded-full blur-xl animate-bubble-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-blue-300 via-blue-100 to-transparent rounded-full blur-lg animate-bubble-fast"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container flex flex-row mx-auto px-4 py-16 md:my-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Connecting Entrepreneurs & Investors for a Brighter Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
            Discover, fund, and grow innovative ideas with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild variant="outline" className="bg-blue-800 text-white hover:bg-white px-8 py-6 text-lg">
              <Link href="/auth/signup">Get Started</Link>
            </Button>

            <Button asChild variant="outline" className="bg-blue-800 text-white hover:bg-white px-8 py-6 text-lg">
              <Link href="/auth/signup">Explore Opportunities</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

/* CSS Animations */
<style jsx>{`
  @keyframes bubble {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateY(-20px) scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes bubble-slow {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px) scale(1.05);
      opacity: 0.7;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .animate-bubble {
    animation: bubble 6s infinite;
  }
  .animate-bubble-slow {
    animation: bubble-slow 8s infinite;
  }
  .animate-bubble-fast {
    animation: bubble 4s infinite;
  }
`}</style>
