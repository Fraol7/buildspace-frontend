"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Building2, FileText, CheckCircle, Upload, Globe, ChevronDown, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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
import { toast } from "sonner"

export default function StartupSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [otherIndustry, setOtherIndustry] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false)
  const [locationError, setLocationError] = useState("")
  // const [projectCreated, setProjectCreated] = useState(false)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data
  interface FormData {
    name: string;
    logo: File | null;
    tagline: string;
    description: string;
    industries: string[];
    fundGoal: string;
    startupStage: string;
    location: string;
    amountRaised: string;
    businessModel: string;
    revenue: string;
    website: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    logo: null,
    tagline: "",
    description: "",
    industries: [],
    fundGoal: "",
    startupStage: "",
    location: "",
    amountRaised: "",
    businessModel: "B2B SaaS", // Default to B2B
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

  const industries = [
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
    "Other",
  ]

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

  // Update formData.industries when selectedIndustries changes
  useEffect(() => {
    let updatedIndustries = [...selectedIndustries]

    // Add "Other" with custom text if it exists
    if (selectedIndustries.includes("Other") && otherIndustry.trim()) {
      updatedIndustries = updatedIndustries.filter((i) => i !== "Other")
      updatedIndustries.push(`Other: ${otherIndustry.trim()}`)
    }

    handleInputChange("industries", updatedIndustries)
  }, [selectedIndustries, otherIndustry])

  const handleInputChange = (field: string, value: string | File | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear location error when user types in location field
    if (field === "location") {
      setLocationError("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("logo", file)
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

  const removeIndustry = (industryToRemove: string) => {
    if (industryToRemove.startsWith("Other:")) {
      setSelectedIndustries((prev) => prev.filter((i) => i !== "Other"))
      setOtherIndustry("")
    } else {
      setSelectedIndustries((prev) => prev.filter((i) => i !== industryToRemove))
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

  const validateLocation = () => {
    // Check if location contains both city and country (separated by comma)
    const locationRegex = /^[A-Za-z\s]+,\s*[A-Za-z\s]+$/
    if (!locationRegex.test(formData.location)) {
      setLocationError("Please enter location in format: City, Country")
      return false
    }
    return true
  }

  const handleSubmitConfirm = async () => {
    // Validate location format
    if (!validateLocation()) {
      setShowConfirmDialog(false)
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would submit the project data to your API
      console.log("Creating project:", formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      toast.success("Startup created successfully!")
      
      // Redirect to entrepreneur dashboard
      router.push('/entrepreneur/dashboard')
    } catch (error) {
      console.error("Error creating project:", error)
      toast.error("Failed to create startup. Please try again.")
    } finally {
      console.log("isSubmitting", isSubmitting)
      setIsSubmitting(false)
      setShowConfirmDialog(false)
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
        return "Review & Create"
      default:
        return ""
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.logo && formData.tagline && formData.description
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success message will be shown via toast */}

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Startup</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to create this startup? Once created, it will be visible to potential investors.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmitConfirm}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Create Startup
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Set Up Your Startup</h1>
          </div>
        </div>

        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Progress value={(currentStep / totalSteps) * 100} className="flex-1 h-2" />
            <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{getStepTitle(currentStep)}</h2>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Startup Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Project Name *</Label>
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
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        {formData.logo ? (
                          <Image
                            src={URL.createObjectURL(formData.logo) || "/placeholder.jpg"}
                            alt="Logo preview"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="border-gray-300"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload a square image (PNG, JPG) - Required</p>
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

            {/* Step 3: Review & Create */}
            {currentStep === 3 && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl text-black flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Review Your Startup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Startup Summary */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      {formData.logo && (
                        <Image
                          src={URL.createObjectURL(formData.logo) || "/placeholder.jpg"}
                          alt="Project logo"
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
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

                  {/* Project Details */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Project Details</h4>
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
                <CardTitle className="text-lg text-black">Setup Progress</CardTitle>
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
                <CardTitle className="text-lg text-black">💡 Setup Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  {currentStep === 1 && (
                    <>
                      <p>• Choose a memorable name that reflects your project&apos;s mission</p>
                      <p>• Upload a high-quality logo that represents your brand</p>
                      <p>• Keep your tagline clear and compelling - it&apos;s the first thing investors see</p>
                      <p>• Write a description that tells your story and explains the problem you solve</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <p>• Select all industries that apply to your project from the dropdown</p>
                      <p>• Be realistic with your funding goal based on actual business needs</p>
                      <p>• Select the startup stage that best matches your current situation</p>
                      <p>• Enter your location in the format &quot;City, Country&quot; for better visibility</p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <p>• Review all information carefully - this is what investors will see</p>
                      <p>• Make sure your project tells a complete and compelling story</p>
                      <p>• Once created, you can always edit your project details later</p>
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
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
