"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Car,
  Smartphone,
  Stethoscope,
  Banknote,
  ShoppingCart,
  Factory,
  Plane,
  ChevronRight,
  BarChart3,
  Activity,
} from "lucide-react"

const industries = [
  { id: "tech", name: "Technology", icon: Smartphone, sentiment: 78, rating: "Good" },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, sentiment: 65, rating: "Good" },
  { id: "finance", name: "Finance", icon: Banknote, sentiment: 45, rating: "Neutral" },
  { id: "retail", name: "Retail", icon: ShoppingCart, sentiment: 32, rating: "Bad" },
  { id: "automotive", name: "Automotive", icon: Car, sentiment: 58, rating: "Neutral" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, sentiment: 71, rating: "Good" },
  { id: "realestate", name: "Real Estate", icon: Building2, sentiment: 41, rating: "Neutral" },
  { id: "aviation", name: "Aviation", icon: Plane, sentiment: 29, rating: "Bad" },
]

// const getSentimentColor = (rating: string) => {
//   switch (rating) {
//     case "Good":
//       return "text-green-600"
//     case "Neutral":
//       return "text-yellow-600"
//     case "Bad":
//       return "text-red-600"
//     default:
//       return "text-gray-600"
//   }
// }

const getSentimentBg = (rating: string) => {
  switch (rating) {
    case "Good":
      return "bg-green-500 text-white"
    case "Neutral":
      return "bg-yellow-400 text-gray-900"
    case "Bad":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const getSentimentEmoji = (rating: string) => {
  switch (rating) {
    case "Good":
      return "😊"
    case "Neutral":
      return "😐"
    case "Bad":
      return "😟"
    default:
      return "🤔"
  }
}

const CircularProgress = ({ value, size = 120 }: { value: number; size?: number }) => {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / 100) * circumference

  const getColor = () => {
    if (value >= 60) return "#4CAF50"
    if (value >= 40) return "#FFC107"
    return "#F44336"
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{value}%</span>
      </div>
    </div>
  )
}

export default function Component() {
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof industries)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const industriesPerPage = 4
  const totalPages = Math.ceil(industries.length / industriesPerPage)
  const currentIndustries = industries.slice(currentPage * industriesPerPage, (currentPage + 1) * industriesPerPage)

  const getDetailedInsights = (industry: (typeof industries)[0]) => {
    const insights = {
      tech: {
        trends: ["AI adoption accelerating", "Cloud migration continues", "Cybersecurity investments rising"],
        signals: ["Innovation", "Growth", "Investment", "Digital Transformation"],
        summary:
          "Technology sector shows strong positive sentiment driven by AI breakthroughs and continued digital transformation across industries.",
      },
      healthcare: {
        trends: ["Telemedicine growth", "Personalized medicine advances", "Healthcare AI integration"],
        signals: ["Innovation", "Patient Care", "Efficiency", "Research"],
        summary:
          "Healthcare maintains positive outlook with technological innovations improving patient outcomes and operational efficiency.",
      },
      finance: {
        trends: ["Fintech disruption", "Regulatory changes", "Digital banking growth"],
        signals: ["Regulation", "Innovation", "Competition", "Stability"],
        summary:
          "Financial sector shows mixed sentiment with innovation opportunities balanced against regulatory challenges.",
      },
      retail: {
        trends: ["E-commerce pressure", "Supply chain issues", "Consumer spending decline"],
        signals: ["Competition", "Challenges", "Adaptation", "Cost Pressure"],
        summary:
          "Retail faces headwinds from changing consumer behavior and economic pressures, requiring strategic adaptation.",
      },
      automotive: {
        trends: ["EV transition", "Supply chain recovery", "Autonomous driving progress"],
        signals: ["Transition", "Innovation", "Investment", "Uncertainty"],
        summary: "Automotive industry navigating major transition to electric vehicles with mixed market reception.",
      },
      manufacturing: {
        trends: ["Automation adoption", "Reshoring initiatives", "Sustainability focus"],
        signals: ["Efficiency", "Innovation", "Sustainability", "Growth"],
        summary:
          "Manufacturing shows positive sentiment with automation and sustainability driving modernization efforts.",
      },
      realestate: {
        trends: ["Interest rate impact", "Remote work effects", "Commercial space changes"],
        signals: ["Uncertainty", "Adaptation", "Market Shift", "Opportunity"],
        summary:
          "Real estate market shows neutral sentiment as it adapts to changing work patterns and economic conditions.",
      },
      aviation: {
        trends: ["Travel recovery challenges", "Fuel cost pressures", "Sustainability requirements"],
        signals: ["Recovery", "Costs", "Regulation", "Challenges"],
        summary:
          "Aviation industry faces continued challenges with slow recovery and increasing operational pressures.",
      },
    }
    return insights[industry.id as keyof typeof insights]
  }

  return (
    <div className="min-h-screen bg-gray-50 m-4 rounded-lg">
      {/* Enhanced Clean Header Section */}
      <div className="relative bg-gradient-to-r p-4 from-gray-100 to-blue-100 border-b border-blue-200 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-indigo-300/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 max-w-7xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-200/80 text-blue-800 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-blue-300/50">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Live Market Data
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Market Insights</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Real-time sentiment analysis across key industries
            </p>

            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">8 Industries</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Live Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">95% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Industry Section */}
      <div className="py-8 bg-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose an Industry</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive list of tracked industries to dive deep into market sentiment and trends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentIndustries.map((industry) => {
              const Icon = industry.icon
              const isSelected = selectedIndustry?.id === industry.id
              return (
                <Card
                  key={industry.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group border-blue-100 ${
                    isSelected
                      ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl"
                      : "bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100"
                  }`}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isSelected ? "bg-blue-500 shadow-lg" : "bg-blue-100 group-hover:bg-blue-500"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 transition-all duration-300 ${
                          isSelected ? "text-white" : "text-blue-600 group-hover:text-white"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{industry.name}</h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Sliding Pagination with Arrows */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-3 rounded-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                aria-label="Previous page"
              >
                <ChevronRight className="w-5 h-5 transform rotate-180" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPage === i ? "bg-blue-500" : "bg-blue-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="p-3 rounded-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sentiment Overview Panel */}
      {selectedIndustry && (
        <div className="mb-12 animate-in slide-in-from-bottom-4 duration-500 px-4">
          <Card className="bg-white shadow-xl border-blue-200">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-2xl text-gray-900">{selectedIndustry.name} Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                {/* Circular Progress */}
                <div className="flex flex-col items-center">
                  <CircularProgress value={selectedIndustry.sentiment} />
                  <p className="text-sm text-gray-600 mt-2">Sentiment Score</p>
                </div>

                {/* Sentiment Rating */}
                <div className="flex flex-col items-center">
                  <div
                    className={`px-6 py-3 rounded-full text-xl font-bold ${getSentimentBg(selectedIndustry.rating)}`}
                  >
                    {getSentimentEmoji(selectedIndustry.rating)} {selectedIndustry.rating}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Overall Rating</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Positive Signals</p>
                  <p className="text-lg font-bold text-green-600">{Math.round(selectedIndustry.sentiment * 0.7)}%</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <p className="text-sm font-medium">Neutral</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {Math.round((100 - selectedIndustry.sentiment) * 0.4)}%
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingDown className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <p className="text-sm font-medium">Negative Signals</p>
                  <p className="text-lg font-bold text-red-600">
                    {Math.round((100 - selectedIndustry.sentiment) * 0.6)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Report Section */}
      {selectedIndustry && (
        <div className="animate-in slide-in-from-bottom-4 duration-700 px-4">
          <Card className="bg-white shadow-xl border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Detailed Sentiment Report
              </CardTitle>
              <CardDescription>In-depth analysis for {selectedIndustry.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Market Summary</h4>
                <p className="text-gray-700 leading-relaxed">{getDetailedInsights(selectedIndustry).summary}</p>
              </div>

              {/* Key Trends */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Trends</h4>
                <ul className="space-y-2">
                  {getDetailedInsights(selectedIndustry).trends.map((trend, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Market Signals */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Market Signals</h4>
                <div className="flex flex-wrap gap-2">
                  {getDetailedInsights(selectedIndustry).signals.map((signal, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {signal}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedIndustry && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Industry to Begin</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Choose an industry from the cards above to view detailed sentiment analysis and market insights.
          </p>
        </div>
      )}
    </div>
  )
}
