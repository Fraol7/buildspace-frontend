"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { TRENDING_PROJECTS } from "@/constants"
import Link from "next/link"
import Image from "next/image"

const AutoScrollingTrendingProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TRENDING_PROJECTS.length)
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const currentProject = TRENDING_PROJECTS[currentIndex]

  // Calculate progress percentage for display
  const progressPercentage = `+${currentProject.progress}%`

  return (
    <Link href={currentProject.link || "/"} className="block">
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-xl p-12 text-gray-800 relative overflow-hidden hover:shadow-xl transition-shadow h-full md:h-[400px]">
        {/* Background Illustrations */}
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            className="absolute inset-0 animate-floating-bubbles"
          >
            <defs>
              <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {/* Floating Bubbles */}
            {[...Array(10)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 800}
                cy={Math.random() * 400}
                r={Math.random() * 20 + 10}
                fill="url(#bubbleGradient)"
                opacity={Math.random() * 0.7 + 0.3}
                className="animate-bubble"
              />
            ))}
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full h-[200px] md:w-[300px] md:h-[300px] relative flex-shrink-0">
                <Image
                  src={currentProject.image || "/placeholder.jpg?height=225&width=225"}
                  alt={currentProject.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-bold text-gray-900">{currentProject.title}</h3>
                  <Badge className="bg-green-200 text-green-600 border-green-400 text-sm font-medium">
                    {progressPercentage}
                  </Badge>
                </div>
                <p className="text-gray-700 text-sm md:text-base">{currentProject.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {currentProject.industries.map((industry, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-400 text-gray-200 border-blue-400 shadow-xs"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-200 rounded-lg p-2 border border-blue-300">
                    <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Raised</div>
                    <div className="text-lg font-bold text-gray-900">{currentProject.funding}</div>
                  </div>
                  <div className="bg-blue-200 rounded-lg p-2 border border-blue-300">
                    <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">Target</div>
                    <div className="text-lg font-bold text-gray-900">{currentProject.target}</div>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Progress</span>
                    <div className="text-lg font-bold text-gray-900">{currentProject.progress}%</div>
                  </div>
                  <div className="relative w-full bg-blue-300 rounded-full h-2">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${currentProject.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes floating-bubbles {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }

        @keyframes bubble {
          0% {
            transform: scale(1) translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2) translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 0.8;
          }
        }

        .animate-floating-bubbles {
          animation: floating-bubbles 4s infinite ease-in-out;
        }

        .animate-bubble {
          animation: bubble 3s infinite ease-in-out alternate;
        }
      `}</style>
    </Link>
  )
}

export default AutoScrollingTrendingProjects
