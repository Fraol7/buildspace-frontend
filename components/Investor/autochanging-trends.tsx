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
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-black rounded-xl p-6 text-white relative overflow-hidden hover:shadow-xl transition-shadow h-full md:h-[400px]">
        {/* Background Illustrations */}
        {/* Abstract Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 400" className="absolute inset-0">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Circuit lines */}
            <path
              d="M0,100 L200,100 L200,200 L400,200 L400,150 L600,150 L600,250 L800,250"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0,300 L150,300 L150,180 L350,180 L350,320 L550,320 L550,80 L800,80"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M100,0 L100,120 L300,120 L300,280 L500,280 L500,50 L700,50 L700,400"
              stroke="url(#circuitGradient)"
              strokeWidth="2"
              fill="none"
            />

            {/* Circuit nodes */}
            <circle cx="200" cy="100" r="4" fill="#4f46e5" opacity="0.4" />
            <circle cx="400" cy="200" r="4" fill="#7c3aed" opacity="0.4" />
            <circle cx="600" cy="150" r="4" fill="#4f46e5" opacity="0.4" />
            <circle cx="150" cy="300" r="4" fill="#7c3aed" opacity="0.4" />
            <circle cx="350" cy="180" r="4" fill="#4f46e5" opacity="0.4" />
            <circle cx="500" cy="280" r="4" fill="#7c3aed" opacity="0.4" />

            {/* Micro circuits */}
            <rect x="190" y="90" width="20" height="20" rx="2" fill="#4f46e5" opacity="0.2" />
            <rect x="590" y="140" width="20" height="20" rx="2" fill="#7c3aed" opacity="0.2" />
            <rect x="140" y="290" width="20" height="20" rx="2" fill="#4f46e5" opacity="0.2" />
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 opacity-8">
          <svg width="100%" height="100%" viewBox="0 0 800 400" className="absolute inset-0">
            <defs>
              <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Hexagons */}
            <polygon
              points="100,50 130,35 160,50 160,80 130,95 100,80"
              fill="url(#shapeGradient)"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <polygon
              points="650,120 680,105 710,120 710,150 680,165 650,150"
              fill="url(#shapeGradient)"
              stroke="#7c3aed"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <polygon
              points="50,250 80,235 110,250 110,280 80,295 50,280"
              fill="url(#shapeGradient)"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeOpacity="0.2"
            />

            {/* Triangles */}
            <polygon
              points="700,300 720,270 740,300"
              fill="url(#shapeGradient)"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <polygon
              points="300,30 320,0 340,30"
              fill="url(#shapeGradient)"
              stroke="#6366f1"
              strokeWidth="1"
              strokeOpacity="0.2"
            />

            {/* Diamonds */}
            <polygon
              points="500,350 520,330 540,350 520,370"
              fill="url(#shapeGradient)"
              stroke="#7c3aed"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            <polygon
              points="200,320 220,300 240,320 220,340"
              fill="url(#shapeGradient)"
              stroke="#4f46e5"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
          </svg>
        </div>

        {/* Data Flow Animation */}
        <div className="absolute inset-0 opacity-6">
          <svg width="100%" height="100%" viewBox="0 0 800 400" className="absolute inset-0">
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Flowing particles */}
            <circle r="3" fill="#6366f1" opacity="0.4">
              <animateMotion dur="8s" repeatCount="indefinite" path="M0,200 Q200,100 400,200 T800,200" />
            </circle>
            <circle r="2" fill="#8b5cf6" opacity="0.3">
              <animateMotion dur="12s" repeatCount="indefinite" path="M0,150 Q300,50 600,150 T800,150" />
            </circle>
            <circle r="2.5" fill="#4f46e5" opacity="0.3">
              <animateMotion dur="10s" repeatCount="indefinite" path="M0,250 Q250,350 500,250 T800,250" />
            </circle>
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"></div>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Project Image */}
              <div className="w-full h-[200px] md:w-[300px] md:h-[300px] relative flex-shrink-0">
                <Image
                  src={currentProject.image || "/placeholder.jpg?height=225&width=225"}
                  alt={currentProject.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Project Details */}
              <div className="flex-1 space-y-4">
                {/* Title and Growth Badge */}
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl font-bold text-blue-300">{currentProject.title}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-300 border-green-500/50 text-sm font-medium"
                  >
                    {progressPercentage}
                  </Badge>
                </div>

                {/* Tagline */}
                <p className="text-gray-300 text-sm md:text-base">{currentProject.tagline}</p>

                {/* Industries as badges */}
                <div className="flex flex-wrap gap-2">
                  {currentProject.industries.map((industry, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-900/50 text-blue-200 border-blue-700/30 shadow-xs"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>

                {/* Funding Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-800/30 rounded-lg p-2 border border-blue-700/30 backdrop-blur-sm">
                    <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">Raised</div>
                    <div className="text-lg font-bold text-white">{currentProject.funding}</div>
                  </div>
                  <div className="bg-blue-800/30 rounded-lg p-2 border border-blue-700/30 backdrop-blur-sm">
                    <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">Target</div>
                    <div className="text-lg font-bold text-white">{currentProject.target}</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-blue-800/20 to-purple-800/20 rounded-lg p-3 border border-blue-700/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-blue-200">Current Stage</span>
                      <Badge
                        variant="outline"
                        className="bg-blue-900/50 text-blue-200 border-blue-600/30 text-xs"
                      >
                        {currentProject.currentStage}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-blue-300">Progress</div>
                      <div className="text-lg font-bold text-white">{currentProject.progress}%</div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ width: `${currentProject.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex space-x-2 justify-center mt-6">
            {TRENDING_PROJECTS.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`View project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AutoScrollingTrendingProjects
