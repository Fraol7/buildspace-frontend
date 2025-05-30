import { Button } from "@/components/ui/button"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="relative top-0 bg-gradient-to-b from-indigo-100 via-purple-50 to-indigo-5 0 min-h-[100vh] flex flex-col items-center overflow-hidden">
      {/* Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large flowing organic shapes */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main large flowing shape - top right */}
          <path
            d="M800 -100C950 -50 1100 50 1150 200C1200 350 1100 500 950 550C800 600 650 550 600 400C550 250 650 150 800 -100Z"
            fill="url(#mainGradient1)"
            opacity="0.6"
          />

          {/* Secondary flowing shape - bottom left */}
          <path
            d="M-50 500C100 450 250 500 300 650C350 800 250 950 100 1000C-50 1050 -200 1000 -250 850C-300 700 -200 600 -50 500Z"
            fill="url(#mainGradient2)"
            opacity="0.5"
          />

          {/* Medium flowing shape - center */}
          <path
            d="M400 200C550 150 700 200 750 350C800 500 700 650 550 700C400 750 250 700 200 550C150 400 250 300 400 200Z"
            fill="url(#mainGradient3)"
            opacity="0.4"
          />

          {/* Top flowing wave */}
          <path
            d="M0 0C200 50 400 0 600 50C800 100 1000 50 1200 100V200C1000 150 800 200 600 150C400 100 200 150 0 100V0Z"
            fill="url(#waveGradient1)"
            opacity="0.3"
          />

          {/* Bottom flowing wave */}
          <path
            d="M0 700C200 650 400 700 600 650C800 600 1000 650 1200 600V800H0V700Z"
            fill="url(#waveGradient2)"
            opacity="0.4"
          />

          <defs>
            <radialGradient id="mainGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="rgb(129 140 248)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(165 180 252)" stopOpacity="0.3" />
            </radialGradient>

            <radialGradient id="mainGradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(79 70 229)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="rgb(99 102 241)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(129 140 248)" stopOpacity="0.2" />
            </radialGradient>

            <radialGradient id="mainGradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(67 56 202)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="rgb(99 102 241)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(165 180 252)" stopOpacity="0.2" />
            </radialGradient>

            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(165 180 252)" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(129 140 248)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Additional circular elements for depth */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-radial from-indigo-300/40 via-indigo-400/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-radial from-indigo-400/50 via-indigo-300/25 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-indigo-500/30 via-indigo-400/15 to-transparent rounded-full blur-lg"></div>

        {/* Subtle geometric accents */}
        <svg className="absolute top-40 left-40 w-32 h-32 opacity-20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" className="text-indigo-600" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" className="text-indigo-500" />
          <circle cx="50" cy="50" r="10" fill="currentColor" className="text-indigo-600" />
        </svg>

        <svg className="absolute bottom-40 right-40 w-24 h-24 opacity-15" viewBox="0 0 100 100" fill="none">
          <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="1" className="text-indigo-600" />
          <polygon points="50,25 75,75 25,75" stroke="currentColor" strokeWidth="1" className="text-indigo-500" />
        </svg>

        {/* Floating dots pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-500/60 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-indigo-600/50 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-400/70 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-indigo-500/60 rounded-full"></div>
          <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-indigo-600/50 rounded-full"></div>
        </div>

        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-indigo-100/40"></div>
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
      </div>
    </section>
  )
}

export default HeroSection
