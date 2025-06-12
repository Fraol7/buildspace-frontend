"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, DollarSign, Eye, Target, TrendingUp, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

// Dummy data for investor funded campaigns (expanded for pagination)
const allFundedCampaigns = [
  {
    id: "STARTUP005",
    title: "Green Energy Storage Solutions",
    logo: "/images/Portfolio22.png",
    description:
      "Next-generation battery technology for renewable energy storage in residential and commercial applications.",
    targetAmount: 50000,
    amountRaised: 35000,
    minimumFunding: 200,
    endDate: "2024-08-15",
    status: "Active",
    backers: 175,
    myContribution: 1500,
    founderName: "Sarah Chen",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.8,
  },
  {
    id: "STARTUP006",
    title: "Mental Health AI Assistant",
    logo: "/images/Portfolio22.png",
    description:
      "AI-powered mental health support platform providing 24/7 personalized guidance and therapy resources.",
    targetAmount: 30000,
    amountRaised: 28500,
    minimumFunding: 100,
    endDate: "2024-07-20",
    status: "Active",
    backers: 285,
    myContribution: 750,
    founderName: "Dr. Michael Rodriguez",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.9,
  },
  {
    id: "STARTUP007",
    title: "Blockchain Supply Chain Tracker",
    logo: "/images/Portfolio22.png",
    description:
      "Transparent supply chain management using blockchain technology for food safety and authenticity verification.",
    targetAmount: 20000,
    amountRaised: 20000,
    minimumFunding: 150,
    endDate: "2024-05-30",
    status: "Ended",
    backers: 133,
    myContribution: 500,
    founderName: "Alex Thompson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.7,
  },
  {
    id: "STARTUP008",
    title: "AR Learning Tools for Kids",
    logo: "/images/Portfolio22.png",
    description:
      "Augmented reality educational tools that make learning interactive and engaging for children aged 6-12.",
    targetAmount: 18000,
    amountRaised: 12600,
    minimumFunding: 75,
    endDate: "2024-09-01",
    status: "Active",
    backers: 168,
    myContribution: 300,
    founderName: "Emma Wilson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.6,
  },
  {
    id: "STARTUP009",
    title: "Smart Home Security System",
    logo: "/images/Portfolio22.png",
    description:
      "AI-powered home security with facial recognition, smart alerts, and integration with existing smart home devices.",
    targetAmount: 40000,
    amountRaised: 31200,
    minimumFunding: 250,
    endDate: "2024-08-25",
    status: "Active",
    backers: 124,
    myContribution: 1000,
    founderName: "James Park",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.5,
  },
  {
    id: "STARTUP010",
    title: "Sustainable Food Delivery",
    logo: "/images/Portfolio22.png",
    description: "Eco-friendly food delivery service using electric vehicles and biodegradable packaging solutions.",
    targetAmount: 22000,
    amountRaised: 18700,
    minimumFunding: 120,
    endDate: "2024-08-30",
    status: "Active",
    backers: 156,
    myContribution: 800,
    founderName: "Maria Garcia",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.4,
  },
  {
    id: "STARTUP011",
    title: "Wearable Health Monitor",
    logo: "/images/Portfolio22.png",
    description:
      "Advanced health monitoring wearable with continuous tracking of vital signs and early disease detection.",
    targetAmount: 35000,
    amountRaised: 21000,
    minimumFunding: 180,
    endDate: "2024-09-15",
    status: "Active",
    backers: 117,
    myContribution: 900,
    founderName: "David Kim",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.7,
  },
  {
    id: "STARTUP012",
    title: "Sustainable Water Purifier",
    logo: "/images/Portfolio22.png",
    description: "Solar-powered water purification system for regions with limited access to clean drinking water.",
    targetAmount: 28000,
    amountRaised: 19600,
    minimumFunding: 140,
    endDate: "2024-08-20",
    status: "Active",
    backers: 140,
    myContribution: 700,
    founderName: "Priya Sharma",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.8,
  },
]

const ITEMS_PER_PAGE = 6

export default function InvestorCampaigns() {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const totalPages = Math.ceil(allFundedCampaigns.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const fundedCampaigns = allFundedCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
  }

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-blue-100 text-blue-600 border-blue-200"
  }

  const totalInvested = allFundedCampaigns.reduce((sum, campaign) => sum + campaign.myContribution, 0)
  const activeCampaigns = allFundedCampaigns.filter((c) => c.status === "Active").length

  const handleCampaignClick = (campaignId: string) => {
    // Dummy navigation to campaign details
    console.log(`Navigating to campaign details: ${campaignId}`)
    // In real app: router.push(`/campaigns/${campaignId}`)
  }

  const handleFounderClick = (founderName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Dummy navigation to founder profile
    console.log(`Navigating to founder profile: ${founderName}`)
    // In real app: router.push(`/founders/${founderName}`)
  }

  const handleInvestMore = (campaignId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // Dummy navigation to investment page
    console.log(`Investing more in campaign: ${campaignId}`)
    // In real app: router.push(`/invest/${campaignId}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (allFundedCampaigns.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">My Investments</h1>
            <p className="text-gray-600 mt-2">Track campaigns you&apos;ve supported</p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <DollarSign className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No investments yet</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                {
                  "You haven't invested in any campaigns yet. Explore campaigns to start supporting innovative startups."
                }
              </p>
              <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Target className="w-5 h-5 mr-2" />
                Explore Campaigns
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Investments</h1>
            <p className="text-gray-600 mt-2">Track campaigns you&apos;ve supported and their progress</p>
          </div>
          <Link href="/entrepreneur/explore-campaigns">
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Target className="w-5 h-5 mr-2" />
              Explore More Campaigns
            </Button>
          </Link>
        </div>

        {/* Investment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Total Invested</p>
                  <p className="text-3xl font-bold text-black">{formatCurrency(totalInvested)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <Target className="w-6 h-6 text-gray-100" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Campaigns Backed</p>
                  <p className="text-3xl font-bold text-black">{allFundedCampaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Active Investments</p>
                  <p className="text-3xl font-bold text-black">{activeCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funded Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {fundedCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className={`bg-gradient-to-b from-blue-50 to-blue-50 border border-blue-200 shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer ${hoveredCard === campaign.id ? "scale-105 shadow-2xl" : "hover:scale-102"
                }`}
              onMouseEnter={() => setHoveredCard(campaign.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCampaignClick(campaign.id)}
            >
              <CardHeader className="pb-4 relative">
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(campaign.status)} border font-medium px-3 py-1 rounded-full`}>
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-white">
                    <Image
                      src={campaign.logo || "/placeholder.svg"}
                      alt={`${campaign.title} logo`}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 pr-16">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {campaign.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{campaign.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* My Investment Highlight */}
                <div className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-xl p-4 mb-6 border border-blue-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Your Investment</p>
                      <p className="text-2xl font-bold text-blue-700">{formatCurrency(campaign.myContribution)}</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full flex items-center justify-center">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">Campaign Progress</span>
                    <span className="text-sm font-bold text-green-500">
                      {Math.round(getProgressPercentage(campaign.amountRaised, campaign.targetAmount))}%
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-200 to-green-300 rounded-full"
                      style={{ width: `${getProgressPercentage(campaign.amountRaised, campaign.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="font-bold text-green-500 text-lg">
                      {formatCurrency(campaign.amountRaised)} raised
                    </span>
                    <span className="text-gray-500 font-medium">of {formatCurrency(campaign.targetAmount)}</span>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{campaign.backers} backers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">Ends {formatDate(campaign.endDate)}</span>
                  </div>
                </div>

                {/* Founder Profile & Action Buttons */}
                <div className="flex justify-between items-center">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                    onClick={(e) => handleFounderClick(campaign.founderName, e)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={campaign.founderAvatar || "/placeholder.svg"} alt={campaign.founderName} />
                      <AvatarFallback className="bg-blue-200 text-blue-700">
                        {campaign.founderName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{campaign.founderName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{campaign.founderRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {campaign.status === "Active" && (
                      <Link href="/payment">
                        <Button
                          size="sm"
                          onClick={(e) => handleInvestMore(campaign.id, e)}
                          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Invest More
                        </Button>
                      </Link>  
                    )}
                  </div>
                </div>

                {/* Click to view hint */}
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    Click to view details
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                }
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
