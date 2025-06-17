"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, BaggageClaim, DollarSign, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { STAT_DATA, StatCard } from "@/constants"

// Component to render the star rating
export const StarRating = ({ rating }: { rating: number }) => {
  // Calculate the number of full and partial stars
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0)

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" />
      ))}

      {/* Partial star */}
      {partialStar > 0 && (
        <div className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

interface StatsCardsProps {
  stats?: StatCard[]
}

const StatsCards = ({ stats = STAT_DATA }: StatsCardsProps) => {
  // Simulate fetching data from an API
  const [statsData, setStatsData] = useState<StatCard[]>(stats)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true)
      // In a real app, you would fetch data here
      // const response = await fetch('/api/stats')
      // const data = await response.json()

      // For demo, we'll just use our dummy data with a delay
      setTimeout(() => {
        setStatsData(stats)
        setLoading(false)
      }, 500)
    }

    fetchData()
  }, [stats])

  // Function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "dollar":
        return <BaggageClaim  className="w-6 h-6 text-white" />
      case "trending":
        return <TrendingUp className="w-6 h-6 text-white" />
      case "star":
        return <Star className="w-6 h-6 text-white" />
      default:
        return <DollarSign className="w-6 h-6 text-white" />
    }
  }

  // Function to render the change indicator
  const renderChangeIndicator = (change: StatCard["change"], isRating: boolean) => {
    if (isRating) {
      return null
    }

    return (
      <p
        className={`text-sm flex items-center mt-1 ${change.trend === "up" ? "text-green-600" : change.trend === "down" ? "text-red-600" : "text-gray-600"
          }`}
      >
        {change.trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : change.trend === "down" ? (
          <ArrowUpRight className="w-4 h-4 mr-1 rotate-180" />
        ) : null}
        {change.value} {change.text}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading
        ? // Loading skeleton
        Array.from({ length: 3 }).map((_, i) => (
          <Card key={`skeleton-${i}`} className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="bg-blue-300 p-3 rounded-full">
                  <div className="w-6 h-6"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        : statsData.map((stat, index) => (
          <Link href={stat.link} key={stat.id} className="block">
            <Card className={`${index % 2 !== 0 ? 'bg-green-50' : 'bg-gradient-to-br from-blue-50 to-blue-100'} border-0 shadow-lg hover:shadow-xl transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>

                    {stat.id === "rating" && stat.rating ? (
                      <div className="mt-1">
                        <StarRating rating={stat.rating} />
                      </div>
                    ) : (
                      renderChangeIndicator(stat.change, stat.id === "rating")
                    )}
                  </div>
                  <div className={`${index % 2 !== 0 ? 'bg-green-500' : 'bg-blue-500'} p-3 rounded-full`}>{renderIcon(stat.icon)}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  )
}

export default StatsCards
