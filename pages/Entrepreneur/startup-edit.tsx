"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Building2, FileText, CheckCircle, Upload, Globe, ChevronDown, X, Save } from "lucide-react"
import type { StaticImageData } from "next/image"

interface FormData {
  name: string
  logo: File | null
  logoUrl: string | StaticImageData
  tagline: string
  description: string
  industries: string[]
  fundGoal: string
  startupStage: string
  location: string
  amountRaised: string
  businessModel: string
  revenue: string
  website: string
  [key: string]: string | string[] | File | null | StaticImageData | undefined // Include StaticImageData in the index signature
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Dummy data to simulate retrieving an existing startup
const dummyStartupData = {
  name: "EcoTech Solutions",
  logoUrl: "/placeholder.jpg?height=200&width=200",
  tagline: "Sustainable technology for a greener tomorrow",
  description:
    "EcoTech Solutions is developing innovative clean energy solutions that help businesses reduce their carbon footprint while saving on operational costs. Our patented technology converts waste heat into electricity, providing a sustainable energy source for industrial applications.",
  industries: ["Technology", "Renewable Energy", "Manufacturing"],
  fundGoal: "500000",
  startupStage: "Series A",
  location: "Boston, USA",
  amountRaised: "250000",
  businessModel: "B2B SaaS",
  revenue: "120000",
  website: "https://ecotechsolutions.example.com",
}

export default function StartupEdit() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [otherIndustry, setOtherIndustry] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [locationError, setLocationError] = useState("")
  const [startupId, setStartupId] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    logo: null,
    logoUrl: "",
    tagline: "",
    description: "",
    industries: [],
    fundGoal: "",
    startupStage: "",
    location: "",
    amountRaised: "",
    businessModel: "B2B SaaS",
    revenue: "",
    website: "",
  })

  const totalSteps = 3

  const startupStages = [
    "Idea Stage",
    "Pre-Seed",
    "Seed Stage",
    "Series A",
    "Series B",
    "Series C+",
    "Growth Stage",
    "Mature",
  ]

  // type Industry =
  //   | "Technology"
  //   | "Healthcare"
  //   | "Finance"
  //   | "E-commerce"
  //   | "Education"
  //   | "Real Estate"
  //   | "Manufacturing"
  //   | "Food & Beverage"
  //   | "Entertainment"
  //   | "Transportation"
  //   | "Energy"
  //   | "Artificial Intelligence"
  //   | "Blockchain"
  //   | "Cybersecurity"
  //   | "Biotechnology"
  //   | "Renewable Energy"
  //   | "Logistics"
  //   | "Retail"
  //   | "Agriculture"
  //   | "Other"

  const industries = useMemo(() => [
    "Technology",
    "Healthcare",
    "Finance",
    "E-commerce",
    "Education",
    "Real Estate",
    "Manufacturing",
    "Food & Beverage",
    "Entertainment",
    "Transportation",
    "Energy",
    "Artificial Intelligence",
    "Blockchain",
    "Cybersecurity",
    "Biotechnology",
    "Renewable Energy",
    "Logistics",
    "Retail",
    "Agriculture",
    "Other"
  ], []) // Empty dependency array means this is only computed once

  const businessModels = [
    "B2B SaaS",
    "B2C Marketplace",
    "E-commerce",
    "Subscription",
    "Freemium",
    "Advertising",
    "Commission-based",
    "Licensing",
    "Hardware",
    "Consulting",
    "Other",
  ]

  // Get startup ID from URL and fetch data
  useEffect(() => {
    // Get startup ID from URL - only run on client side
    let id: string | null = null;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      id = urlParams.get('id')
      setStartupId(id)
    }

    const fetchStartupData = async () => {
      try {
        setIsLoading(true)
        
        // In a real app, you would fetch data from an API using the ID
        // For example: const response = await fetch(`/api/startups/${id}`)
        // const data = await response.json()
        
        // For now, we'll use dummy data
        setTimeout(() => {
          // Set form data from dummy data
          setFormData({
            name: dummyStartupData.name,
            logo: null, // No file object for existing logo
            logoUrl: dummyStartupData.logoUrl,
            tagline: dummyStartupData.tagline,
            description: dummyStartupData.description,
            industries: dummyStartupData.industries,
            fundGoal: dummyStartupData.fundGoal,
            startupStage: dummyStartupData.startupStage,
            location: dummyStartupData.location,
            amountRaised: dummyStartupData.amountRaised,
            businessModel: dummyStartupData.businessModel,
            revenue: dummyStartupData.revenue,
            website: dummyStartupData.website,
          })

          // Set selected industries for the dropdown
          setSelectedIndustries(
            dummyStartupData.industries.filter(
              (industry) => !industry.startsWith("Other:") && industries.includes(industry),
            ),
          )

          // Check if there's an "Other" industry and extract its value
          const otherIndustryValue = dummyStartupData.industries.find((industry) => industry.startsWith("Other:"))
          if (otherIndustryValue) {
            setSelectedIndustries((prev) => [...prev, "Other"])
            setOtherIndustry(otherIndustryValue.replace("Other: ", ""))
          }

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching startup data:', error)
        setIsLoading(false)
      }
    }


    if (id) {
      fetchStartupData()
    } else {
      // If no ID, this is a new startup
      setIsLoading(false)
    }
  }, [industries])

  // Add this after the existing useEffect for fetching project data
  useEffect(() => {
    // Get startup ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const projectId = urlParams.get("id")

    if (projectId) {
      console.log("Loading startup with ID:", projectId)
      // In a real app, you would fetch the specific startup data using this ID
    }
  }, [])

  // Update form data when selected industries or other industry text changes
  useEffect(() => {
    // If "Other" is selected and there's custom text, include it
    const updatedIndustries = [...selectedIndustries]
    const otherIndex = updatedIndustries.indexOf("Other")
    
    if (otherIndex !== -1 && otherIndustry) {
      updatedIndustries[otherIndex] = `Other: ${otherIndustry}`
    }
    
    // Update form data with the latest industries
    setFormData(prev => ({
      ...prev,
      industries: updatedIndustries
    }))
  }, [selectedIndustries, otherIndustry])

  const handleInputChange = (field: keyof FormData, value: string | string[] | File | null | StaticImageData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Validate location format when location changes
    if (field === "location") {
      validateLocation(value as string)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      const fileUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        logo: file,
        logoUrl: fileUrl
      }))
    }
  }

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industry)) {
        // If deselecting "Other", clear the custom text
        if (industry === "Other") {
          setOtherIndustry("")
        }
        return prev.filter((i) => i !== industry)
      } else {
        return [...prev, industry]
      }
    })
  }

  const removeIndustry = (industry: string) => {
    setSelectedIndustries((prev) => prev.filter((i) => i !== industry))
    // Only clear otherIndustry if the removed industry was "Other"
    if (industry === "Other") {
      setOtherIndustry("")
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateLocation = (value: string): boolean => {
    // Check if location contains both city and country (separated by comma)
    const locationRegex = /^[A-Za-z\s]+,\s*[A-Za-z\s]+$/
    if (value && !locationRegex.test(value)) {
      setLocationError("Please enter a valid location in the format 'City, Country'")
      return false
    } else {
      setLocationError("")
      return true
    }
  }
  
  // Initialize location validation
  useEffect(() => {
    if (formData.location) {
      validateLocation(formData.location)
    }
  }, [formData.location])

  const handleSubmitConfirm = async () => {
    // Validate location format if location is provided
    if (formData.location) {
      const isValid = validateLocation(formData.location)
      if (!isValid) {
        setShowConfirmDialog(false)
        return
      }
    }

    try {
      // In a real app, you would make an API call to save the data
      // For example:
      // const method = startupId ? 'PUT' : 'POST';
      // const url = startupId ? `/api/startups/${startupId}` : '/api/startups';
      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      // For now, just log the data and show success
      console.log("Saving startup changes:", formData)
      
      // Show success message
      setShowConfirmDialog(false)
      setShowSuccessModal(true)
      
      // In a real app, you might want to redirect after a delay
      // setTimeout(() => {
      //   router.push(`/Entrepreneur/startup-detail?id=${startupId || data.id}`)
      // }, 2000)
    } catch (error) {
      console.error('Error saving startup:', error)
      // Handle error (show error message to user)
    }
  }

  const formatCurrency = (amount: string) => {
    const num = Number.parseFloat(amount)
    return isNaN(num)
      ? "$0"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(num)
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Basic Information"
      case 2:
        return "Business Details"
      case 3:
        return "Review Changes"
      default:
        return ""
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && (formData.logo || formData.logoUrl) && formData.tagline && formData.description
      case 2:
        return formData.industries.length > 0 && formData.fundGoal && formData.startupStage && formData.location
      case 3:
        return true
      default:
        return false
    }
  }

  const getDropdownDisplayText = () => {
    if (formData.industries.length === 0) {
      return "Select industries"
    }
    if (formData.industries.length <= 2) {
      return formData.industries.join(", ")
    }
    return `${formData.industries.slice(0, 2).join(", ")} +${formData.industries.length - 2} more`
  }

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading startup data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-black flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Changes Saved Successfully!
              </DialogTitle>
              <DialogDescription>Your startup has been updated successfully.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setShowSuccessModal(false)
                  if (startupId) {
                    router.push(`/Entrepreneur/startup-detail?id=${startupId}`)
                  } else {
                    // If it's a new startup, go to the startups list
                    router.push('/Entrepreneur/startups')
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {startupId ? 'View Startup' : 'Back to Startups'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Changes</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to save these changes? The updated information will be visible to potential
                investors.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmitConfirm}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Edit Startup</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(`/startup/1`, '_blank')}
            >
              View Startup
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Startup Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Startup Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your project name"
                      className="border-gray-300"
                    />
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Startup Logo *</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                        {formData.logo || formData.logoUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={formData.logo ? URL.createObjectURL(formData.logo) : formData.logoUrl}
                              alt="Logo preview"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input type="file" accept="image/*" onChange={handleFileChange} className="border-gray-300" />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.logoUrl && !formData.logo
                            ? "Current logo will be used if no new file is selected"
                            : "Upload a square image (PNG, JPG)"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Tagline *</Label>
                    <Input
                      value={formData.tagline}
                      onChange={(e) => handleInputChange("tagline", e.target.value)}
                      placeholder="One sentence that describes your project"
                      className="border-gray-300"
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-500">{formData.tagline.length}/100 characters</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Startup Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your project, what problem it solves, and your vision..."
                      rows={6}
                      className="border-gray-300"
                      maxLength={1000}
                    />
                    <p className="text-xs text-gray-500">{formData.description.length}/1000 characters</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Business Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Industry Multi-Select Dropdown */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Industries *</Label>
                    <p className="text-xs text-gray-500 mb-2">Select all that apply</p>

                    {/* Custom Multi-Select Dropdown */}
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                        className="w-full justify-between border-gray-300 text-left font-normal"
                      >
                        <span className="truncate">{getDropdownDisplayText()}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isIndustryDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </Button>

                      {/* Dropdown Content */}
                      {isIndustryDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          <div className="p-2">
                            {industries.map((industry) => (
                              <div
                                key={industry}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => handleIndustryToggle(industry)}
                              >
                                <Checkbox
                                  id={`dropdown-industry-${industry}`}
                                  checked={selectedIndustries.includes(industry)}
                                  onChange={() => {}} // Handled by parent onClick
                                />
                                <label
                                  htmlFor={`dropdown-industry-${industry}`}
                                  className="text-sm font-medium leading-none cursor-pointer flex-1"
                                >
                                  {industry}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Click outside to close */}
                      {isIndustryDropdownOpen && (
                        <div className="fixed inset-0 z-40" onClick={() => setIsIndustryDropdownOpen(false)} />
                      )}
                    </div>

                    {/* Other Industry Input */}
                    {selectedIndustries.includes("Other") && (
                      <div className="mt-2">
                        <Input
                          value={otherIndustry}
                          onChange={(e) => setOtherIndustry(e.target.value)}
                          placeholder="Specify other industry"
                          className="border-gray-300"
                        />
                      </div>
                    )}

                    {/* Selected Industries Display */}
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-700 mb-2">Selected Industries:</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.industries.length === 0 ? (
                          <span className="text-sm text-gray-500">No industries selected</span>
                        ) : (
                          formData.industries.map((industry, index) => (
                            <div
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1"
                            >
                              {industry}
                              <button
                                type="button"
                                onClick={() => removeIndustry(industry)}
                                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fund Goal */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Funding Goal *</Label>
                    <Input
                      type="number"
                      value={formData.fundGoal}
                      onChange={(e) => handleInputChange("fundGoal", e.target.value)}
                      placeholder="100000"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Target: {formatCurrency(formData.fundGoal || "0")}</p>
                  </div>

                  {/* Startup Stage */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Startup Stage *</Label>
                    <Select
                      value={formData.startupStage}
                      onValueChange={(value) => handleInputChange("startupStage", value)}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select your current stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {startupStages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Location *</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, Country"
                      className={`border-gray-300 ${locationError ? "border-red-500" : ""}`}
                      required
                    />
                    {locationError ? (
                      <p className="text-xs text-red-500">{locationError}</p>
                    ) : (
                      <p className="text-xs text-gray-500">Format: City, Country (e.g., New York, USA)</p>
                    )}
                  </div>

                  {/* Amount Raised So Far */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Amount Raised So Far (Optional)</Label>
                    <Input
                      type="number"
                      value={formData.amountRaised}
                      onChange={(e) => handleInputChange("amountRaised", e.target.value)}
                      placeholder="0"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Raised: {formatCurrency(formData.amountRaised || "0")}</p>
                  </div>

                  {/* Business Model */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Business Model (Optional)</Label>
                    <Select
                      value={formData.businessModel}
                      onValueChange={(value) => handleInputChange("businessModel", value)}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select your business model" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessModels.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Revenue */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Annual Revenue (Optional)</Label>
                    <Input
                      type="number"
                      value={formData.revenue}
                      onChange={(e) => handleInputChange("revenue", e.target.value)}
                      placeholder="0"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Revenue: {formatCurrency(formData.revenue || "0")}</p>
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Website (Optional)</Label>
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="border-gray-300"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Changes */}
            {currentStep === 3 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Review Your Changes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Startup Summary */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      {(formData.logo || formData.logoUrl) && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={formData.logo ? URL.createObjectURL(formData.logo) : formData.logoUrl}
                            alt="Startup logo"
                            fill
                            className="rounded-lg object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.name}</h3>
                        <p className="text-blue-600 font-medium mb-2">{formData.tagline}</p>
                        <p className="text-gray-700 text-sm">{formData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(formData.fundGoal)}</div>
                        <div className="text-sm text-gray-600">Funding Goal</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{formData.startupStage}</div>
                        <div className="text-sm text-gray-600">Current Stage</div>
                      </div>
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Industries</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.industries.map((industry, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                          {industry}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Startup Details */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Startup Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium text-gray-900">{formData.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Business Model:</span>
                          <span className="font-medium text-gray-900">{formData.businessModel}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Raised:</span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(formData.amountRaised || "0")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Revenue:</span>
                          <span className="font-medium text-gray-900">{formatCurrency(formData.revenue || "0")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Website:</span>
                          <span className="font-medium text-gray-900 flex items-center gap-1">
                            {formData.website ? (
                              <>
                                <Globe className="w-3 h-3" />
                                <span className="truncate max-w-32">{formData.website}</span>
                              </>
                            ) : (
                              "Not specified"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-black">Edit Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step < currentStep
                            ? "bg-green-500 text-white"
                            : step === currentStep
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      <span
                        className={`text-sm ${step <= currentStep ? "text-gray-900 font-medium" : "text-gray-500"}`}
                      >
                        {getStepTitle(step)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-lg text-black">💡 Editing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  {currentStep === 1 && (
                    <>
                      <p>• Keep your startup name consistent with your brand</p>
                      <p>• You can keep your existing logo or upload a new one</p>
                      <p>• A clear tagline helps investors quickly understand your value</p>
                      <p>• Update your description with your latest achievements</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <p>• Select all industries that apply to your startup</p>
                      <p>• Update your funding goal if your needs have changed</p>
                      <p>• Make sure your startup stage reflects your current progress</p>
                      <p>• Enter your location in the format &quot;City, Country&quot; for better visibility</p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <p>• Review all changes carefully before saving</p>
                      <p>• You can use the &quot;Save All Changes&quot; button at any time</p>
                      <p>• Your changes will be visible to investors immediately</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirmDialog(true)}
                disabled={!isStepValid(currentStep)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
