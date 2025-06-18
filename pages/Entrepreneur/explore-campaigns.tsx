"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, ChevronDown, Calendar, Users, TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Dummy data for explore campaigns
const allCampaigns = [
  {
    id: "CAMP001",
    title: "EcoTech Smart Water Bottles",
    logo: "/images/Portfolio2.png",
    description:
      "Revolutionary smart water bottles that track hydration and reduce plastic waste through innovative IoT technology.",
    targetAmount: 15000,
    amountRaised: 8750,
    minimumFunding: 100,
    endDate: "2024-07-31",
    status: "Active",
    backers: 287,
    categories: ["Sustainability", "IoT"],
    founderName: "Sarah Chen",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.8,
  },
  {
    id: "CAMP002",
    title: "AI-Powered Learning Platform",
    logo: "/images/Portfolio2.png",
    description:
      "Personalized education platform using machine learning to adapt to individual student learning patterns.",
    targetAmount: 25000,
    amountRaised: 22100,
    minimumFunding: 50,
    endDate: "2024-06-15",
    status: "Active",
    backers: 356,
    categories: ["Education", "AI"],
    founderName: "Dr. Michael Rodriguez",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.9,
  },
  {
    id: "CAMP003",
    title: "Sustainable Fashion Marketplace",
    logo: "/images/Portfolio2.png",
    description: "Connecting eco-conscious consumers with sustainable fashion brands and second-hand luxury items.",
    targetAmount: 10000,
    amountRaised: 10000,
    minimumFunding: 25,
    endDate: "2024-05-20",
    status: "Ended",
    backers: 203,
    categories: ["Fashion", "Sustainability"],
    founderName: "Alex Thompson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.7,
  },
  {
    id: "CAMP004",
    title: "Urban Farming Solutions",
    logo: "/images/Portfolio2.png",
    description: "Vertical farming kits for urban apartments, making fresh produce accessible in city environments.",
    targetAmount: 8000,
    amountRaised: 3200,
    minimumFunding: 75,
    endDate: "2024-08-10",
    status: "Active",
    backers: 42,
    categories: ["Agriculture", "Technology"],
    founderName: "Emma Wilson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.6,
  },
  {
    id: "CAMP005",
    title: "Green Energy Storage Solutions",
    logo: "/images/Portfolio2.png",
    description:
      "Next-generation battery technology for renewable energy storage in residential and commercial applications.",
    targetAmount: 50000,
    amountRaised: 35000,
    minimumFunding: 200,
    endDate: "2024-08-15",
    status: "Active",
    backers: 175,
    categories: ["Energy", "Technology"],
    founderName: "James Park",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.5,
  },
  {
    id: "CAMP006",
    title: "Mental Health AI Assistant",
    logo: "/images/Portfolio2.png",
    description:
      "AI-powered mental health support platform providing 24/7 personalized guidance and therapy resources.",
    targetAmount: 30000,
    amountRaised: 28500,
    minimumFunding: 100,
    endDate: "2024-07-20",
    status: "Active",
    backers: 285,
    categories: ["Healthcare", "AI"],
    founderName: "Dr. Lisa Johnson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.9,
  },
  {
    id: "CAMP007",
    title: "Blockchain Supply Chain Tracker",
    logo: "/images/Portfolio2.png",
    description:
      "Transparent supply chain management using blockchain technology for food safety and authenticity verification.",
    targetAmount: 20000,
    amountRaised: 20000,
    minimumFunding: 150,
    endDate: "2024-05-30",
    status: "Ended",
    backers: 133,
    categories: ["Technology", "Supply Chain"],
    founderName: "Robert Chen",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.7,
  },
  {
    id: "CAMP008",
    title: "AR Learning Tools for Kids",
    logo: "/images/Portfolio2.png",
    description:
      "Augmented reality educational tools that make learning interactive and engaging for children aged 6-12.",
    targetAmount: 18000,
    amountRaised: 12600,
    minimumFunding: 75,
    endDate: "2024-09-01",
    status: "Active",
    backers: 168,
    categories: ["Education", "AR"],
    founderName: "Maria Garcia",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.6,
  },
  {
    id: "CAMP009",
    title: "Smart Home Security System",
    logo: "/images/Portfolio2.png",
    description:
      "AI-powered home security with facial recognition, smart alerts, and integration with existing smart home devices.",
    targetAmount: 40000,
    amountRaised: 31200,
    minimumFunding: 250,
    endDate: "2024-08-25",
    status: "Active",
    backers: 124,
    categories: ["Technology", "Security"],
    founderName: "David Kim",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.5,
  },
  {
    id: "CAMP010",
    title: "Sustainable Food Delivery",
    logo: "/images/Portfolio2.png",
    description: "Eco-friendly food delivery service using electric vehicles and biodegradable packaging solutions.",
    targetAmount: 22000,
    amountRaised: 18700,
    minimumFunding: 120,
    endDate: "2024-08-30",
    status: "Active",
    backers: 156,
    categories: ["Sustainability", "Food"],
    founderName: "Sophia Martinez",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.4,
  },
  {
    id: "CAMP011",
    title: "Wearable Health Monitor",
    logo: "/images/Portfolio2.png",
    description:
      "Advanced health monitoring wearable that tracks vital signs and provides early warning for potential health issues.",
    targetAmount: 35000,
    amountRaised: 27500,
    minimumFunding: 180,
    endDate: "2024-09-15",
    status: "Active",
    backers: 210,
    categories: ["Healthcare", "Wearable"],
    founderName: "Dr. Thomas Lee",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.8,
  },
  {
    id: "CAMP012",
    title: "Community Solar Initiative",
    logo: "/images/Portfolio2.png",
    description:
      "Neighborhood-based solar power sharing platform that reduces energy costs and carbon footprint for communities.",
    targetAmount: 45000,
    amountRaised: 32000,
    minimumFunding: 200,
    endDate: "2024-10-01",
    status: "Active",
    backers: 178,
    categories: ["Energy", "Community"],
    founderName: "Olivia Johnson",
    founderAvatar: "/images/Portfolio22.png",
    founderRating: 4.7,
  },
]

const categories = [
  "All Categories",
  "Technology",
  "Healthcare",
  "Education",
  "Sustainability",
  "Energy",
  "Agriculture",
  "Fashion",
  "IoT",
  "AI",
  "Supply Chain",
  "AR",
  "Security",
  "Food",
  "Wearable",
  "Community",
]

const ITEMS_PER_PAGE = 6

export default function ExploreCampaigns() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortOption, setSortOption] = useState("Most Popular")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  // Filter campaigns based on search, category, and tab
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || campaign.categories.includes(selectedCategory)

    // Only show active campaigns
    const isActive = campaign.status === "Active"

    return matchesSearch && matchesCategory && isActive
  })

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOption === "Most Popular") {
      return b.backers - a.backers
    } else if (sortOption === "Ending Soon") {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    } else if (sortOption === "Most Funded") {
      return b.amountRaised - a.amountRaised
    } else if (sortOption === "Newest") {
      return b.id.localeCompare(a.id)
    }
    return 0
  })

  const totalPages = Math.ceil(sortedCampaigns.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCampaigns = sortedCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
      ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300"
  }

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-gray-700">{rating}</span>
        <div className="flex">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={`full-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <div className="relative">
              <Star className="w-3 h-3 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
          ))}
        </div>
      </div>
    )
  }

  const handleCampaignClick = (campaignId: string) => {
    console.log(`Navigating to campaign details: ${campaignId}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50 md:m-4 rounded-lg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Explore Campaigns</h1>
          <p className="text-gray-600">Discover and support innovative startups and projects</p>
        </div>

        {/* Trending Campaigns Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">🔥 Trending Campaigns</h2>
            <p className="text-sm text-gray-500">Campaigns with high recent activity and growing fast</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCampaigns
              .sort((a, b) => b.backers - a.backers)
              .slice(0, 3)
              .map((campaign) => (
                <Link href={`/entrepreneur/campaigns/${campaign.id}`} key={campaign.id} className="h-full">
                  <Card
                    key={campaign.id}
                    className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transform transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    onClick={() => handleCampaignClick(campaign.id)}
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getStatusColor(campaign.status)} border px-2 py-1`}>{campaign.status}</Badge>
                    </div>
                    <CardHeader className="pb-2 pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-white">
                          <Image
                            src={campaign.logo || "/placeholder.svg"}
                            alt={`${campaign.title} logo`}
                            className="object-cover"
                            width={48}    // example width, adjust to your container size
                            height={48}   // example height, adjust to your container size
                          />
                        </div>
                        <div className="flex-1 pr-16">
                          <CardTitle className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                            {campaign.title}
                          </CardTitle>
                          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{campaign.description}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-2 flex-grow flex flex-col">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {campaign.categories.map((category, index) => (
                          <Badge key={index} className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {Math.round(getProgressPercentage(campaign.amountRaised, campaign.targetAmount))}% funded
                          </span>
                          <span className="text-sm text-gray-600">
                            {formatCurrency(campaign.amountRaised)} of {formatCurrency(campaign.targetAmount)}
                          </span>
                        </div>
                        <div className="relative h-2 bg-white rounded-full overflow-hidden shadow-inner">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                            style={{
                              width: `${getProgressPercentage(campaign.amountRaised, campaign.targetAmount)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-2 shadow-sm">
                          <Users className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{campaign.backers} backers</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-2 shadow-sm">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span>Ends {formatDate(campaign.endDate)}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={campaign.founderAvatar || "/placeholder.jpg"} alt={campaign.founderName} />
                              <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">
                                {campaign.founderName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">{campaign.founderName}</span>
                            {renderStarRating(campaign.founderRating)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <Filter size={16} />
                  {selectedCategory}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setCurrentPage(1)
                    }}
                    className={selectedCategory === category ? "bg-blue-50 text-blue-600" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <TrendingUp size={16} />
                  {sortOption}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSortOption("Most Popular")}
                  className={sortOption === "Most Popular" ? "bg-blue-50 text-blue-600" : ""}
                >
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Ending Soon")}
                  className={sortOption === "Ending Soon" ? "bg-blue-50 text-blue-600" : ""}
                >
                  Ending Soon
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Most Funded")}
                  className={sortOption === "Most Funded" ? "bg-blue-50 text-blue-600" : ""}
                >
                  Most Funded
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Newest")}
                  className={sortOption === "Newest" ? "bg-blue-50 text-blue-600" : ""}
                >
                  Newest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              Active Campaigns
              {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
            </h2>
            <span className="text-gray-500 text-sm">{filteredCampaigns.length} campaigns found</span>
          </div>

          {paginatedCampaigns.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any campaigns matching your search criteria. Try adjusting your filters or search
                terms.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All Categories")
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
              <div className="min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <TableHead className="font-semibold text-gray-900">Campaign</TableHead>
                      <TableHead className="font-semibold text-gray-900">Founder</TableHead>
                      <TableHead className="font-semibold text-gray-900">Progress</TableHead>
                      <TableHead className="font-semibold text-gray-900">Backers</TableHead>
                      <TableHead className="font-semibold text-gray-900">End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCampaigns.map((campaign) => (
                      <Link href={`/entrepreneur/campaigns/${campaign.id}`} key={campaign.id} style={{ display: 'contents' }}>
                        <TableRow
                          key={campaign.id}
                          className={`cursor-pointer transition-all duration-200 ${hoveredRow === campaign.id
                            ? "bg-blue-100 shadow-lg scale-[1.02] border-blue-300"
                            : "bg-green-50 hover:bg-blue-50"
                            }`}
                          onMouseEnter={() => setHoveredRow(campaign.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onClick={() => handleCampaignClick(campaign.id)}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-gray-50">
                                <Image
                                  src={campaign.logo || "/placeholder.jpg"}
                                  alt={`${campaign.title} logo`}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 truncate mb-1">{campaign.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-1 mb-2">{campaign.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {campaign.categories.map((category, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs"
                                    >
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={campaign.founderAvatar || "/placeholder.jpg"}
                                  alt={campaign.founderName}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 text-xs">
                                  {campaign.founderName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{campaign.founderName}</p>
                                {renderStarRating(campaign.founderRating)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-32">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                  {Math.round(getProgressPercentage(campaign.amountRaised, campaign.targetAmount))}%
                                </span>
                                <span className="text-xs text-gray-600">{formatCurrency(campaign.amountRaised)}</span>
                              </div>
                              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                  style={{
                                    width: `${getProgressPercentage(campaign.amountRaised, campaign.targetAmount)}%`,
                                  }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">of {formatCurrency(campaign.targetAmount)}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-700">
                              <Users className="w-4 h-4 mr-1 text-blue-500" />
                              {campaign.backers}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-700">
                              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                              {formatDate(campaign.endDate)}
                            </div>
                          </TableCell>
                        </TableRow>
                      </Link>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCampaigns.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 disabled:opacity-50"
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
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      : "border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100"
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
              className="border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
