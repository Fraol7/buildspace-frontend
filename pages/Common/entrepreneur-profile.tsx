"use client"

import { useState } from "react"
import { MapPin, Building, Target, ChevronLeft, ChevronRight, Star, DollarSign, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for entrepreneur
const entrepreneurData = {
  id: "1",
  name: "Sarah Johnson",
  location: "San Francisco, CA",
  bio: "Serial entrepreneur with 10+ years in tech, passionate about sustainable startups and innovative solutions.",
  profileImage: "/images/person2.jpg",
  averageRating: 4.7,
  verified: true,
  joinedDate: "January 2020",
  metrics: {
    activeCampaigns: 5,
    startupsFounded: 8,
    totalRaised: "$12.5M",
  },
}

const startups = [
  {
    id: "1",
    name: "EcoTech Solutions",
    image: "/placeholder.jpg",
    category: "CleanTech",
    tagline: "Building tomorrow's sustainable cities",
    industries: ["CleanTech", "IoT", "Smart Cities"],
    funding: "$2.5M raised",
    totalRaised: "$2.5M",
    stage: "Series A",
    employees: "25-50",
    founded: "2021",
    status: "Active",
    progress: 85,
    savedCount: 234,
  },
  {
    id: "2",
    name: "HealthAI",
    image: "/placeholder.jpg",
    category: "HealthTech",
    tagline: "AI-powered healthcare for everyone",
    industries: ["HealthTech", "AI/ML", "Medical"],
    funding: "$1.8M raised",
    totalRaised: "$1.8M",
    stage: "Seed",
    employees: "10-25",
    founded: "2022",
    status: "Active",
    progress: 75,
    savedCount: 189,
  },
  {
    id: "3",
    name: "GreenEnergy Co",
    image: "/placeholder.jpg",
    category: "Energy",
    tagline: "Renewable energy made simple",
    industries: ["Energy", "Solar", "Sustainability"],
    funding: "$3.2M raised",
    totalRaised: "$3.2M",
    stage: "Series A",
    employees: "50-100",
    founded: "2020",
    status: "Active",
    progress: 90,
    savedCount: 312,
  },
  {
    id: "4",
    name: "FoodTech Innovations",
    image: "/placeholder.jpg",
    category: "FoodTech",
    tagline: "Sustainable food for the future",
    industries: ["FoodTech", "Agriculture", "Sustainability"],
    funding: "$950K raised",
    totalRaised: "$950K",
    stage: "Pre-Seed",
    employees: "5-10",
    founded: "2023",
    status: "Fundraising",
    progress: 60,
    savedCount: 156,
  },
]

const campaigns = [
  {
    id: "1",
    title: "EcoTech Series A Funding",
    progress: 75,
    target: "$2,000,000",
    raised: "$1,500,000",
    backers: 156,
    daysLeft: 15,
  },
  {
    id: "2",
    title: "HealthAI Product Launch",
    progress: 45,
    target: "$500,000",
    raised: "$225,000",
    backers: 89,
    daysLeft: 28,
  },
  {
    id: "3",
    title: "GreenEnergy Expansion",
    progress: 60,
    target: "$1,200,000",
    raised: "$720,000",
    backers: 203,
    daysLeft: 22,
  },
  {
    id: "4",
    title: "FoodTech R&D Initiative",
    progress: 30,
    target: "$800,000",
    raised: "$240,000",
    backers: 67,
    daysLeft: 35,
  },
]

const ITEMS_PER_PAGE = 3

export default function EntrepreneurProfile() {
  const [startupsPage, setStartupsPage] = useState(1)
  const [campaignsPage, setCampaignsPage] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleRating = (rating: number) => {
    setUserRating(rating)
    console.log("Rating submitted:", rating)
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= (interactive ? hoveredStar || userRating : rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
              } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={interactive ? () => handleRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          />
        ))}
      </div>
    )
  }

  // Pagination logic
  const totalStartupsPages = Math.ceil(startups.length / ITEMS_PER_PAGE)
  const startupStartIndex = (startupsPage - 1) * ITEMS_PER_PAGE
  const paginatedStartups = startups.slice(startupStartIndex, startupStartIndex + ITEMS_PER_PAGE)

  const totalCampaignsPages = Math.ceil(campaigns.length / ITEMS_PER_PAGE)
  const campaignStartIndex = (campaignsPage - 1) * ITEMS_PER_PAGE
  const paginatedCampaigns = campaigns.slice(campaignStartIndex, campaignStartIndex + ITEMS_PER_PAGE)

  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    type,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems: number
    type: string
  }) => (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-600">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of{" "}
        {totalItems} {type}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Section - Top Right Corner with margin */}
        <div className="fixed top-28 right-8 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-lg z-10">
          <p className="text-sm font-medium text-blue-900 mb-2">Rate this profile:</p>
          {renderStars(0, true)}
          {userRating > 0 && <p className="text-xs text-blue-700 mt-1">Thanks for your feedback!</p>}
        </div>

        {/* Profile Header */}
        <Card className="mb-8 shadow-xl border-0 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="relative">
                <Avatar className="w-36 h-36 border-4 border-blue-200 shadow-lg">
                  <AvatarImage src={entrepreneurData.profileImage || "/placeholder.svg"} alt={entrepreneurData.name} />
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                    {entrepreneurData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {entrepreneurData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">{entrepreneurData.name}</h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Entrepreneur
                    </Badge>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {entrepreneurData.location}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">{entrepreneurData.bio}</p>

                  <div className="flex items-center gap-3">
                    {renderStars(entrepreneurData.averageRating)}
                    <span className="text-xl font-semibold text-gray-900">{entrepreneurData.averageRating}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entrepreneur Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 text-blue-900">{entrepreneurData.metrics.activeCampaigns}</p>
                  <p className="text-blue-700">Active Campaigns</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <Target className="w-7 h-7 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 text-green-900">{entrepreneurData.metrics.startupsFounded}</p>
                  <p className="text-green-700">Startups Founded</p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <Building className="w-7 h-7 text-green-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 text-blue-900">{entrepreneurData.metrics.totalRaised}</p>
                  <p className="text-blue-700">Total Raised</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <DollarSign className="w-7 h-7 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Startups Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">My Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {paginatedStartups.map((startup) => (
                <div
                  key={startup.id}
                  className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group cursor-pointer"
                >
                  {/* Project Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={startup.image || "/placeholder.svg"}
                      alt={startup.name}
                      className="w-10 h-10 rounded-lg bg-gray-100 p-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">{startup.name}</h4>
                      <p className="text-xs text-gray-600 group-hover:text-blue-600">{startup.category}</p>
                    </div>
                  </div>

                  {/* Industry Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {startup.industries?.map((industry, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                        {startup.funding}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs transition-colors ${startup.status === "Active"
                            ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                            : startup.status === "Fundraising"
                              ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                              : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                          }`}
                      >
                        {startup.status}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <Progress
                      value={startup.progress}
                      className={`h-2 ${startup.status === "Active"
                          ? "bg-green-300"
                          : startup.status === "Fundraising"
                            ? "bg-blue-300"
                            : "bg-indigo-300"
                        }`}
                    />
                    <p className="text-xs text-gray-500 group-hover:text-blue-600">{startup.progress}% complete</p>
                  </div>

                  {/* Saved Count */}
                  <div className="flex mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200 items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-800 group-hover:text-blue-800">
                        {startup.savedCount} saves
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PaginationControls
              currentPage={startupsPage}
              totalPages={totalStartupsPages}
              onPageChange={setStartupsPage}
              totalItems={startups.length}
              type="startups"
            />
          </CardContent>
        </Card>

        {/* Active Campaigns Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="w-80">Funding Progress</TableHead>
                  <TableHead>Backers</TableHead>
                  <TableHead>Days Left</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{campaign.title}</TableCell>
                    <TableCell className="w-80">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-green-600">{campaign.raised}</span>
                          <span className="text-gray-600">of {campaign.target}</span>
                        </div>
                        <Progress value={campaign.progress} className="h-3" />
                        <div className="text-center">
                          <span className="text-sm font-medium text-blue-600">{campaign.progress}% funded</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-600 font-medium">{campaign.backers}</TableCell>
                    <TableCell className="text-orange-600 font-medium">{campaign.daysLeft}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationControls
              currentPage={campaignsPage}
              totalPages={totalCampaignsPages}
              onPageChange={setCampaignsPage}
              totalItems={campaigns.length}
              type="campaigns"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
