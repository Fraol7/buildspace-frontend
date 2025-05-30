import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TRENDING_PROJECTS } from "@/constants"
import Link from "next/link"
import Image from 'next/image';

const AutoScrollingTrendingProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TRENDING_PROJECTS.length)
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const currentProject = TRENDING_PROJECTS[currentIndex]

  return (
    <Link href="/" className="block">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 rounded-xl p-6 text-white relative overflow-hidden hover:shadow-xl transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Auto changing Trending Projects</h2>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Trending
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Image
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.name}
                width={64} // Explicitly set width (16 * 4) for a w-16 equivalent
                height={64} // Explicitly set height (16 * 4) for an h-16 equivalent
                className="rounded-lg bg-white/10 p-2"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold">{currentProject.name}</h3>
                <Badge variant="outline" className="text-green-300 border-green-300">
                  {currentProject.growth}
                </Badge>
              </div>
              <p className="text-indigo-200 text-sm mb-2">{currentProject.category}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span>
                  {currentProject.funding} raised of {currentProject.target}
                </span>
                <span>•</span>
                <span>{currentProject.investors} investors</span>
                <span>•</span>
                <span>{currentProject.timeLeft} left</span>
              </div>
              <Progress value={currentProject.progress} className="mt-2 h-2" />
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex space-x-2 mt-4 justify-center">
            {TRENDING_PROJECTS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AutoScrollingTrendingProjects
