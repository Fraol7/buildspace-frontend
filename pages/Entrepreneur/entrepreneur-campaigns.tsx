"use client"

import { useState } from "react"
import { Calendar, DollarSign, Eye, Target, Plus, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { allCampaigns } from '@/constants'
import Image from "next/image"

const ITEMS_PER_PAGE = 6

export default function EntrepreneurCampaigns() {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const totalPages = Math.ceil(allCampaigns.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const campaigns = allCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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

  const handleCampaignClick = (campaignId: string) => {
    console.log(campaignId, "hello")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (allCampaigns.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage and track your fundraising campaigns</p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                {
                  "You haven't launched any campaigns yet. Start your first campaign to begin raising funds for your startup."
                }
              </p>
              <Link href="/entrepreneur/add-campaign">
                <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Plus className="w-5 h-5 mr-2" />
                  Launch New Campaign
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage and track your fundraising campaigns</p>
          </div>
          <Link href="/entrepreneur/add-campaign">
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Plus className="w-5 h-5 mr-2" />
              Launch New Campaign
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Total Campaigns</p>
                  <p className="text-3xl font-bold text-gray-700">{allCampaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Total Raised</p>
                  <p className="text-3xl font-bold text-black">
                    {formatCurrency(allCampaigns.reduce((sum, campaign) => sum + campaign.amountRaised, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">Total Backers</p>
                  <p className="text-3xl font-bold text-black">
                    {allCampaigns.reduce((sum, campaign) => sum + campaign.backers, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <Link href={`/entrepreneur/campaigns-owned/${campaign.id}`} key={campaign.id}>
              <Card
                key={campaign.id}
                className={`bg-gradient-to-b from-blue-50 to-blue-50 border border-blue-200 shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer ${
                  hoveredCard === campaign.id ? "scale-105 shadow-2xl" : "hover:scale-102"
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
                        width={48}    // set to container size or desired width
                        height={48}   // set to container size or desired height
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
                  {/* Funding Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-700">Funding Progress</span>
                      <span className="text-sm font-bold text-blue-600">
                        {Math.round(getProgressPercentage(campaign.amountRaised, campaign.targetAmount))}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${getProgressPercentage(campaign.amountRaised, campaign.targetAmount)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="font-bold text-blue-600 text-lg">
                        {formatCurrency(campaign.amountRaised)} raised
                      </span>
                      <span className="text-gray-500 font-medium">of {formatCurrency(campaign.targetAmount)}</span>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium">Min: {formatCurrency(campaign.minimumFunding)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">Ends {formatDate(campaign.endDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 col-span-2 shadow-sm">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{campaign.backers} backers supporting this campaign</span>
                    </div>
                  </div>

                  {/* Click to view hint */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" />
                      Click to view details
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
