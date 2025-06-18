"use client"

import { useState } from "react"
import {
  Share2,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Globe,
  BarChart3,
  ExternalLink,
  Star,
  ArrowUpRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"

// Shared components and data
import { projectData, ALL_PROJECTS } from "@/constants"

// StatsCards Component
const StatsCards = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const statsData = [
    {
      id: "funding",
      title: "Total Raised",
      value: formatCurrency(projectData.amountRaised),
      icon: "dollar",
      change: { trend: "up" as const, value: "+12%", text: "from last month" },
    },
    {
      id: "backers",
      title: "Total Backers",
      value: projectData.backersCount.toString(),
      icon: "trending",
      change: { trend: "up" as const, value: "+8", text: "new this week" },
    },
    {
      id: "rating",
      title: "Founder Rating",
      value: projectData.founder.rating.toString(),
      icon: "star",
      rating: projectData.founder.rating,
      change: { trend: "neutral" as const, value: "", text: "" },
    },
  ]

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "dollar":
        return <DollarSign className="w-6 h-6 text-white" />
      case "trending":
        return <TrendingUp className="w-6 h-6 text-white" />
      case "star":
        return <Star className="w-6 h-6 text-white" />
      default:
        return <DollarSign className="w-6 h-6 text-white" />
    }
  }

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating)
    const partialStar = rating % 1
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0)

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" />
        ))}
        {partialStar > 0 && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${partialStar * 100}%` }}>
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    )
  }

  const renderChangeIndicator = (change: { trend: string; value: string; text: string }, isRating: boolean) => {
    if (isRating) return null

    return (
      <p
        className={`text-sm flex items-center mt-1 ${
          change.trend === "up" ? "text-green-600" : change.trend === "down" ? "text-red-600" : "text-gray-600"
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

  const getCardColor = (index: number) => {
    if (index === 1) {
      return "bg-green-50 border-0 shadow-lg hover:shadow-xl transition-shadow"
    }
    return "bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-shadow"
  }

  const getIconColor = (index: number) => {
    if (index === 1) {
      return "bg-green-500 p-3 rounded-full"
    }
    return "bg-blue-500 p-3 rounded-full"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <Card key={stat.id} className={getCardColor(index)}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                {stat.id === "rating" && stat.rating ? (
                  <div className="mt-1">
                    <StarRating rating={stat.rating} />
                  </div>
                ) : (
                  renderChangeIndicator(stat.change, stat.id === "rating")
                )}
              </div>
              <div className={getIconColor(index)}>{renderIcon(stat.icon)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ProjectsGrid Component
const ProjectsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 3
  const totalPages = Math.ceil(ALL_PROJECTS.length / projectsPerPage)

  const getCurrentProjects = () => {
    const startIndex = (currentPage - 1) * projectsPerPage
    const endIndex = startIndex + projectsPerPage
    return ALL_PROJECTS.slice(startIndex, endIndex)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Similar Startups</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCurrentProjects().map((project: { id: string; name: string; image?: string; category: string; industries?: string[]; funding: string; status: string; progress: number; avatar?: string; founderName?: string; rating?: number }) => (
            <Link href="#" key={project.id} className="block">
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    width={40}
                    height={40}
                    className="rounded-lg bg-gray-100 p-1"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">{project.name}</h4>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">{project.category}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.industries?.map((industry: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                      {project.funding}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs transition-colors ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                          : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                            : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <Progress
                    value={project.progress}
                    className={`h-2 ${
                      project.status === "Completed"
                        ? "bg-green-300"
                        : project.status === "In Progress"
                          ? "bg-blue-300"
                          : "bg-indigo-300"
                    }`}
                  />
                  <p className="text-xs text-gray-500 group-hover:text-blue-600">{project.progress}% funded</p>
                </div>

                <div className="flex mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={project.avatar || "/placeholder.jpg?height=32&width=32"}
                      alt={project.founderName || "Founder"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 group-hover:text-blue-800">
                      {project.founderName || "Anonymous"}
                    </p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(project.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1 group-hover:text-blue-600">
                        ({project.rating || "0.0"})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function StartupDetailsGeneral() {
  const [isSaved, setIsSaved] = useState(false)
  const [showSentimentDialog, setShowSentimentDialog] = useState(false)
  const [sentimentLoading, setSentimentLoading] = useState(false)
  const [sentimentScore, setSentimentScore] = useState<{
    score: number
    sentiment: "positive" | "negative" | "neutral"
  } | null>(null)

  const fundingProgress = (projectData.amountRaised / projectData.fundingGoal) * 100

  const handleSentimentAnalysis = async () => {
    setSentimentLoading(true)
    setShowSentimentDialog(true)

    setTimeout(() => {
      setSentimentScore({
        score: 78,
        sentiment: "positive",
      })
      setSentimentLoading(false)
    }, 2000)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100"
      case "negative":
        return "text-red-600 bg-red-100"
      default:
        return "text-yellow-600 bg-yellow-100"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
              <div className="flex-shrink-0 self-center sm:self-start">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-md overflow-hidden border-4 border-white mx-auto sm:mx-0">
                  <Image
                    src={projectData.logo || "/placeholder.svg"}
                    alt={projectData.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{projectData.name}</h1>

                    <div className="flex gap-2 justify-center sm:justify-start">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSentimentAnalysis}
                        className="border-blue-200 hover:bg-blue-50 text-blue-700 text-xs px-2 py-1"
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Sentiment
                      </Button>
                    </div>
                  </div>

                  <p className="text-lg text-blue-600 font-medium mb-3">{projectData.tagline}</p>

                  <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                    {projectData.industry.map((industry: string, index: number) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm">
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 justify-center sm:justify-start">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{projectData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a
                        href={projectData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:w-48">
              <div className="flex gap-2 justify-center lg:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsSaved(!isSaved)}
                  className="border-blue-200 hover:bg-blue-50 p-2"
                  title="Save Startup"
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 hover:bg-gray-50 p-2"
                  title="Share Startup"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Funding Progress</h3>
              <div className="text-left sm:text-right">
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatCurrency(projectData.amountRaised)}
                </p>
                <p className="text-sm text-gray-600">of {formatCurrency(projectData.fundingGoal)} goal</p>
              </div>
            </div>
            <Progress value={fundingProgress} className="h-3 mb-4" />
            <div className="flex flex-wrap justify-between text-sm text-gray-600 gap-2">
              <span>{Math.round(fundingProgress)}% funded</span>
              <span>{projectData.backersCount} backers</span>
              <span>{projectData.savedCount} saved</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 md:mb-8">
          <StatsCards />
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <Card className="shadow-lg bg-white h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">About This Startup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">{projectData.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Current Stage</p>
                        <p className="text-lg font-semibold text-gray-900">{projectData.currentStage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Business Model</p>
                        <p className="text-lg font-semibold text-gray-900">{projectData.businessModel}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Funding Goal</p>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(projectData.fundingGoal)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Amount Raised</p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatCurrency(projectData.amountRaised)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saved by</span>
                    <span className="font-semibold">{projectData.savedCount} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Backers</span>
                    <span className="font-semibold">{projectData.backersCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold text-green-600">{Math.round(fundingProgress)}%</span>
                  </div>
                </CardContent>
              </Card>

              {sentimentScore && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Sentiment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full ${getSentimentColor(sentimentScore.sentiment)}`}
                      >
                        <span className="font-semibold capitalize">{sentimentScore.sentiment}</span>
                      </div>
                      <p className="text-3xl font-bold mt-4">{sentimentScore.score}%</p>
                      <p className="text-gray-600 text-sm">Overall sentiment score</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Meet the Founder */}
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Meet the Founder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 self-center md:self-start">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32">
                    <AvatarImage
                      src={projectData.founder.avatar || "/placeholder.svg"}
                      alt={projectData.founder.name}
                    />
                    <AvatarFallback>
                      {projectData.founder.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{projectData.founder.name}</h3>
                  <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((n: number) => (
                        <Star
                          key={n}
                          className={`w-5 h-5 ${n <= projectData.founder.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{projectData.founder.rating}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{projectData.founder.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects */}
          <ProjectsGrid />
        </div>

        {/* Sentiment Analysis Dialog */}
        <Dialog open={showSentimentDialog} onOpenChange={setShowSentimentDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sentiment Analysis</DialogTitle>
              <DialogDescription>Analyzing public sentiment about this project...</DialogDescription>
            </DialogHeader>
            <div className="py-8">
              {sentimentLoading ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing sentiment...</p>
                </div>
              ) : sentimentScore ? (
                <div className="text-center">
                  <div
                    className={`inline-flex items-center px-6 py-3 rounded-full ${getSentimentColor(sentimentScore.sentiment)}`}
                  >
                    <span className="font-semibold text-lg capitalize">{sentimentScore.sentiment}</span>
                  </div>
                  <p className="text-4xl font-bold mt-4">{sentimentScore.score}%</p>
                  <p className="text-gray-600">Overall sentiment score</p>
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSentimentDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
