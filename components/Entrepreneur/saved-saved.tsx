"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
import type { Startup } from "@/constants";

interface StartupCardProps {
  startup: Startup
  isSaved?: boolean
  onSave?: (id: string) => void
}

// Custom Save Icon Component
const SaveIcon = ({ filled = false, className = "" }: { filled?: boolean; className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)

export function SavedCard({ startup, isSaved, onSave }: StartupCardProps) {
  // const investmentProgress = (startup.investedAmount / startup.requiredInvestment) * 100

  // const formatCurrency = (amount: number) => {
  //   if (amount >= 1000000) {
  //     return `$${(amount / 1000000).toFixed(1)}M`
  //   }
  //   if (amount >= 1000) {
  //     return `$${(amount / 1000).toFixed(0)}K`
  //   }
  //   return `$${amount}`
  // }

  return (
    <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-[1.02]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 opacity-60" />

      {/* Save Button - Floating (only shown if onSave is provided) */}
      {onSave && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSave(startup.id)}
          className="absolute top-4 right-4 z-10 p-2 h-auto bg-white/80 backdrop-blur-sm hover:bg-white border border-sky-200 hover:border-sky-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <SaveIcon
            filled={isSaved}
            className={`h-4 w-4 ${isSaved ? "text-sky-600" : "text-gray-500 hover:text-sky-600"} transition-colors`}
          />
        </Button>
      )}

      <CardContent className="relative p-0">
        <Link href={`/startup-detail/${startup.id}`} className="block">
          {/* Header Section */}
          <div className="flex gap-6 p-6 pb-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={startup.logo || "/placeholder.svg"}
                  alt={`${startup.title} logo`}
                  width={180}
                  height={180}
                  className="rounded-2xl object-cover shadow-xl border-4 border-white group-hover:shadow-2xl transition-shadow duration-300"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {startup.stage}
                </div>
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-2xl text-gray-900 group-hover:text-sky-600 transition-colors duration-300 leading-tight">
                  {startup.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-medium text-gray-600">{startup.location}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">{startup.description}</p>

              {/* Badges */}
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2">
                  {startup.badges.slice(0, 3).map((badge) => (
                    <Badge
                      key={badge}
                      className="bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 border-sky-200 hover:from-sky-200 hover:to-blue-200 transition-all duration-200 text-xs font-medium"
                    >
                      {badge}
                    </Badge>
                  ))}
                  {startup.badges.length > 3 && (
                    <Badge className="text-xs text-gray-500 border-gray-300">
                      +{startup.badges.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage
                      src={startup.entrepreneur.avatar || "/placeholder.svg"}
                      alt={startup.entrepreneur.name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold text-sm">
                      {startup.entrepreneur.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{startup.entrepreneur.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-600">{startup.entrepreneur.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gradient-to-r from-sky-50/80 to-blue-50/80 backdrop-blur-sm border-t border-sky-100 p-6 pt-5">
            <div className="grid grid-cols-2 gap-6">
              {/* Entrepreneur Info */}

              {/* Investment Progress */}
              {/* <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-sky-500" />
                    <span className="text-xs font-medium text-gray-600">Progress</span>
                  </div>
                  <span className="text-lg font-bold text-sky-600">{Math.round(investmentProgress)}%</span>
                </div> */}

                {/* <div className="space-y-2">
                  <Progress value={investmentProgress} className="h-2 bg-sky-100/50 rounded-full overflow-hidden" />
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-sky-700">{formatCurrency(startup.investedAmount)}</span>
                    <span className="text-gray-500">of {formatCurrency(startup.requiredInvestment)}</span>
                  </div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
