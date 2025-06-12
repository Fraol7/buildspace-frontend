"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Star,
  ExternalLink,
  CheckCircle,
  X,
  Calendar,
  Users,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import React from "react"

// Sample campaign data with appropriate logos
const campaignData = {
  id: "CAMP002",
  title: "AI-Powered Learning Platform",
  logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=120&h=120&fit=crop&crop=center", // AI/Tech themed
  coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop&crop=center", // Education/Learning themed
  description:
    "Personalized education platform using machine learning to adapt to individual student learning patterns. Our AI-driven system analyzes learning behaviors and creates custom curriculum paths that evolve with each student's progress.",
  shortDescription:
    "An AI-powered education platform that creates personalized learning experiences. Our system adapts to each student's unique learning style, providing custom curriculum paths and real-time feedback to improve educational outcomes.",
  targetAmount: 25000,
  amountRaised: 22100,
  minimumFunding: 50,
  endDate: "2024-06-15",
  startDate: "2024-03-15",
  status: "Active",
  backers: 356,
  categories: ["Education", "AI", "Technology", "SaaS"],
  founderName: "Dr. Michael Rodriguez",
  founderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  founderBio:
    "Former education technology researcher with 15+ years of experience in AI and machine learning applications for education. PhD in Educational Technology from Stanford University.",
  founderRating: 4.9,
  investmentTiers: [
    {
      amount: 50,
      title: "Early Supporter",
      perks: ["1-month free subscription", "Early access to new features"],
    },
    {
      amount: 250,
      title: "Education Advocate",
      perks: ["6-month free subscription", "Early access to new features", "Quarterly investor updates"],
    },
    {
      amount: 1000,
      title: "Learning Partner",
      perks: [
        "12-month free subscription",
        "Early access to new features",
        "Quarterly investor updates",
        "Recognition on our platform",
      ],
    },
    {
      amount: 5000,
      title: "Education Innovator",
      perks: [
        "Lifetime free subscription",
        "Early access to new features",
        "Quarterly investor updates",
        "Recognition on our platform",
        "Advisory board invitation",
      ],
    },
  ],
}

export default function CampaignDetails() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState(campaignData.investmentTiers[0].amount)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const params = useParams()
  const campaignId = params?.id as string

  // In a real app, we would fetch the campaign data based on the ID
  console.log(`Fetching campaign details for ID: ${campaignId}`)

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
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
  }

  const getDaysRemaining = () => {
    const endDate = new Date(campaignData.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-700">{rating}</span>
        <div className="flex">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <div className="relative">
              <Star className="w-4 h-4 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
          ))}
        </div>
      </div>
    )
  }

  const handleInvest = () => {
    // In a real app, this would handle the investment process
    setShowInvestModal(false)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 5000)
  }

  const handleGoBack = () => {
    console.log("Navigating back to campaigns list")
    // In a real app, this would navigate back to the campaigns list
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <CheckCircle className="w-5 h-5" />
            <span>Investment successful! Thank you for your support.</span>
            <Button onClick={() => setShowSuccessMessage(false)} className="ml-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Back Button */}
        {/* <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Button>
        </div> */}

        {/* Campaign Header - Minimized */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-48">
          {/* Background with Logo */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300">
            {/* Logo as background */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <img
                src={campaignData.logo || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover object-center scale-150 blur-sm"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/20"></div>
          </div>

          {/* Status Badge - Top Right */}
          <div className="absolute top-4 right-4 z-30">
            <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 px-3 py-1 text-sm font-medium">
              {campaignData.status}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center p-6 z-20">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-lg ring-2 ring-white/30">
                <img
                  src={campaignData.logo || "/placeholder.svg"}
                  alt={`${campaignData.title} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaignData.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {campaignData.categories.map((category, index) => (
                    <Badge
                      key={index}
                      className="bg-white/80 text-sky-700 border-sky-200 backdrop-blur-sm text-xs px-2 py-0.5"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Description - Shortened */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  About This Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-base">{campaignData.shortDescription}</p>
              </CardContent>
            </Card>

            {/* Campaign Stats - Moved up, yellow replaced with blue */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {Math.round(getProgressPercentage(campaignData.amountRaised, campaignData.targetAmount))}%
                  </div>
                  <div className="text-sm text-gray-600">Funded</div>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{campaignData.backers}</div>
                  <div className="text-sm text-gray-600">Backers</div>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{getDaysRemaining()}</div>
                  <div className="text-sm text-gray-600">Days Left</div>
                </CardContent>
              </Card>
            </div>

            {/* Founder Information - Moved up */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Meet the Founder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                    <img
                      src={campaignData.founderAvatar || "/placeholder.svg"}
                      alt={campaignData.founderName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{campaignData.founderName}</h3>
                      {renderStarRating(campaignData.founderRating)}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{campaignData.founderBio}</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Investment Info */}
          <div className="space-y-6">
            <Card className="sticky top-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(campaignData.amountRaised)}
                    </span>
                    <span className="text-gray-500">of {formatCurrency(campaignData.targetAmount)} goal</span>
                  </div>
                  <Progress
                    value={getProgressPercentage(campaignData.amountRaised, campaignData.targetAmount)}
                    className="h-3 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Dialog open={showInvestModal} onOpenChange={setShowInvestModal}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-3">
                        Contribute Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-black">Invest in {campaignData.title}</DialogTitle>
                        <DialogDescription>Choose your investment amount and tier</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Investment Amount</label>
                          <Input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                            min={campaignData.minimumFunding}
                            className="border-gray-300"
                          />
                          <p className="text-xs text-gray-500">
                            Minimum investment: {formatCurrency(campaignData.minimumFunding)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Investment Tiers</label>
                          <div className="space-y-2">
                            {campaignData.investmentTiers.map((tier, index) => (
                              <div
                                key={index}
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                  investmentAmount >= tier.amount ? "border-blue-300 bg-blue-50" : "border-gray-200"
                                }`}
                                onClick={() => setInvestmentAmount(tier.amount)}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium text-gray-900">{tier.title}</h4>
                                  <span className="text-blue-600 font-medium">{formatCurrency(tier.amount)}</span>
                                </div>
                                <ul className="mt-2 space-y-1">
                                  {tier.perks.map((perk, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      {perk}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowInvestModal(false)} className="border-gray-300">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleInvest}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          Confirm Investment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 mr-2 text-blue-600" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save Startup
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Started</span>
                    <span className="text-gray-900">{formatDate(campaignData.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Ends</span>
                    <span className="text-gray-900">{formatDate(campaignData.endDate)}</span>
                  </div>
                </div>

                <Button variant="link" className="w-full text-blue-600 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Project Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
