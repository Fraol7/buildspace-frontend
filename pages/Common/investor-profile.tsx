"use client"

import { useState } from "react"
import { MapPin, Target, ChevronLeft, ChevronRight, Star, DollarSign, TrendingUp, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for investor
const investorData = {
  id: "1",
  name: "Michael Chen",
  location: "New York, NY",
  bio: "Angel investor and venture capitalist with 15+ years of experience, focused on early-stage tech startups.",
  profileImage: "/images/person1.jpg",
  averageRating: 4.9,
  verified: true,
  joinedDate: "March 2019",
  preferredIndustries: ["AI/ML", "FinTech", "CleanTech", "HealthTech", "SaaS"],
  metrics: {
    totalProjectsBacked: 47,
    totalInvestment: "$8.2M",
    totalCampaignsBacked: 23,
  },
}

const backedProjects = [
  {
    id: "1",
    name: "TechFlow",
    image: "/placeholder.jpg",
    category: "SaaS",
    industries: ["SaaS", "Automation", "Enterprise"],
    investmentAmount: "$50K",
    investmentDate: "March 2023",
    description: "Cloud-based workflow automation platform for enterprises",
    stage: "Series A",
    savedCount: 189,
  },
  {
    id: "2",
    name: "DataMind",
    image: "/placeholder.jpg",
    category: "AI/ML",
    industries: ["AI/ML", "Analytics", "SaaS"],
    investmentAmount: "$100K",
    investmentDate: "January 2023",
    description: "AI-powered data analytics platform for small businesses",
    stage: "Series B",
    savedCount: 267,
  },
  {
    id: "3",
    name: "CloudSync",
    image: "/placeholder.jpg",
    category: "Cloud",
    industries: ["Cloud", "Storage", "Security"],
    investmentAmount: "$75K",
    investmentDate: "June 2022",
    description: "Multi-cloud synchronization and backup solutions",
    stage: "Acquired",
    savedCount: 145,
  },
  {
    id: "4",
    name: "GreenTech Solutions",
    image: "/placeholder.jpg",
    category: "CleanTech",
    industries: ["CleanTech", "Energy", "IoT"],
    investmentAmount: "$120K",
    investmentDate: "September 2022",
    description: "Renewable energy management systems for smart cities",
    stage: "Series A",
    savedCount: 298,
  },
]

const supportedCampaigns = [
  {
    id: "1",
    title: "EcoTech Series A Funding",
    target: "$2,000,000",
    raised: "$1,500,000",
    progress: 75,
    backers: 156,
    daysLeft: 15,
    myInvestment: "$25K",
  },
  {
    id: "2",
    title: "HealthAI Product Launch",
    target: "$500,000",
    raised: "$225,000",
    progress: 45,
    backers: 89,
    daysLeft: 28,
    myInvestment: "$15K",
  },
  {
    id: "3",
    title: "FinanceFlow Expansion",
    target: "$1,200,000",
    raised: "$1,350,000",
    progress: 100,
    backers: 203,
    daysLeft: 0,
    myInvestment: "$40K",
  },
  {
    id: "4",
    title: "AgriTech Innovation",
    target: "$800,000",
    raised: "$480,000",
    progress: 60,
    backers: 124,
    daysLeft: 22,
    myInvestment: "$20K",
  },
]

const ITEMS_PER_PAGE = 3

export default function InvestorProfile() {
  const [projectsPage, setProjectsPage] = useState(1)
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
  const totalProjectsPages = Math.ceil(backedProjects.length / ITEMS_PER_PAGE)
  const projectStartIndex = (projectsPage - 1) * ITEMS_PER_PAGE
  const paginatedProjects = backedProjects.slice(projectStartIndex, projectStartIndex + ITEMS_PER_PAGE)

  const totalCampaignsPages = Math.ceil(supportedCampaigns.length / ITEMS_PER_PAGE)
  const campaignStartIndex = (campaignsPage - 1) * ITEMS_PER_PAGE
  const paginatedCampaigns = supportedCampaigns.slice(campaignStartIndex, campaignStartIndex + ITEMS_PER_PAGE)

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
                  <AvatarImage src={investorData.profileImage || "/placeholder.svg"} alt={investorData.name} />
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                    {investorData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {investorData.verified && (
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
                    <h1 className="text-4xl font-bold text-gray-900">{investorData.name}</h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Investor
                    </Badge>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {investorData.location}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">{investorData.bio}</p>

                  {/* Preferred Industries */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preferred Industries:</p>
                    <div className="flex flex-wrap gap-2">
                      {investorData.preferredIndustries.map((industry, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {renderStars(investorData.averageRating)}
                    <span className="text-xl font-semibold text-gray-900">{investorData.averageRating}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 text-blue-900">{investorData.metrics.totalProjectsBacked}</p>
                  <p className="text-blue-700">Total Projects Backed</p>
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
                  <p className="text-3xl font-bold mb-1 text-green-900">{investorData.metrics.totalInvestment}</p>
                  <p className="text-green-700">Total Investment</p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <DollarSign className="w-7 h-7 text-green-900" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1 text-blue-900">{investorData.metrics.totalCampaignsBacked}</p>
                  <p className="text-blue-700">Total Campaigns Backed</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <TrendingUp className="w-7 h-7 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invested Startups Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Invested Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group cursor-pointer"
                >
                  {/* Project Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-10 h-10 rounded-lg bg-gray-100 p-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">{project.name}</h4>
                      <p className="text-xs text-gray-600 group-hover:text-blue-600">{project.category}</p>
                    </div>
                  </div>

                  {/* Industry Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.industries?.map((industry, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  {/* Investment Amount */}
                  <div className="bg-blue-100 p-2 rounded text-center mb-3">
                    <span className="text-sm font-bold text-blue-800">My Investment: {project.investmentAmount}</span>
                  </div>

                  {/* Saved Count */}
                  <div className="flex mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200 items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-800 group-hover:text-blue-800">
                        {project.savedCount} saves
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PaginationControls
              currentPage={projectsPage}
              totalPages={totalProjectsPages}
              onPageChange={setProjectsPage}
              totalItems={backedProjects.length}
              type="projects"
            />
          </CardContent>
        </Card>

        {/* Supported Campaigns Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Supported Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>My Investment</TableHead>
                  <TableHead className="w-80">Funding Progress</TableHead>
                  <TableHead>Backers</TableHead>
                  <TableHead>Days Left</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{campaign.title}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{campaign.myInvestment}</TableCell>
                    <TableCell className="w-80">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-green-600">{campaign.raised}</span>
                          <span className="text-gray-600">of {campaign.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-medium text-blue-600">{campaign.progress}% funded</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-600 font-medium">{campaign.backers}</TableCell>
                    <TableCell className="text-orange-600 font-medium">
                      {campaign.daysLeft > 0 ? campaign.daysLeft : "Completed"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationControls
              currentPage={campaignsPage}
              totalPages={totalCampaignsPages}
              onPageChange={setCampaignsPage}
              totalItems={supportedCampaigns.length}
              type="campaigns"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
