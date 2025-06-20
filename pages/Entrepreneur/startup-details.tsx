"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useRef } from "react"
import { DEFAULT_LOCATIONS, INITIAL_FORM_DATA, FUNDING_ROUNDS, PRODUCT_STAGES, FormData } from "@/constants"

export default function StartupDetails() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: keyof FormData, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateFormData("logo", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.startupName && formData.location)
      case 2:
        return !!(formData.productStage && formData.startupDescription)
      case 3:
        return true // Review step doesn't need validation
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setErrors({})
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1)
      }
    } else {
      // Set error messages for required fields
      const newErrors: Record<string, string> = {}
      if (currentStep === 1) {
        if (!formData.startupName) newErrors.startupName = "Startup name is required"
        if (!formData.location) newErrors.location = "Location is required"
      }
      if (currentStep === 2) {
        if (!formData.productStage) newErrors.productStage = "Product stage is required"
        if (!formData.startupDescription) newErrors.startupDescription = "Description is required"
      }
      setErrors(newErrors)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate all required fields before submitting
    const allFieldsValid = validateStep(1) && validateStep(2)
    if (!allFieldsValid) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    // You can add success notification here
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Brand Basics"
      case 2:
        return "What You're Building"
      case 3:
        return "Review Your Information"
      default:
        return ""
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with the essentials"
      case 2:
        return "Tell us more about your journey"
      case 3:
        return "Please review all details before submitting"
      default:
        return ""
    }
  }

  const renderProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${step < currentStep
                  ? "bg-blue-600 text-white"
                  : step === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 mx-2 transition-all duration-300 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={formData.logo || undefined} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
              {formData.startupName ? formData.startupName[0].toUpperCase() : "L"}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
            size="sm"
          >
            <Camera className="w-4 h-4" />
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
        <p className="text-sm text-gray-500">Upload your logo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startupName">Startup Name *</Label>
          <Input
            id="startupName"
            value={formData.startupName}
            onChange={(e) => updateFormData("startupName", e.target.value)}
            placeholder="Acme"
            className={errors.startupName ? "border-red-500" : ""}
          />
          {errors.startupName && <p className="text-sm text-red-500">{errors.startupName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => updateFormData("tagline", e.target.value)}
            placeholder="Your pitch in one sentence"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location / Country *</Label>
          <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
            <SelectTrigger className={errors.location ? "border-red-500" : ""}>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateFormData("website", e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productStage">Product Stage *</Label>
          <Select value={formData.productStage} onValueChange={(value) => updateFormData("productStage", value)}>
            <SelectTrigger className={errors.productStage ? "border-red-500" : ""}>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_STAGES.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productStage && <p className="text-sm text-red-500">{errors.productStage}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fundingRoundType">Funding Round Type</Label>
          <Select
            value={formData.fundingRoundType}
            onValueChange={(value) => updateFormData("fundingRoundType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select round" />
            </SelectTrigger>
            <SelectContent>
              {FUNDING_ROUNDS.map((round) => (
                <SelectItem key={round} value={round}>
                  {round}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startupDescription">Startup Description *</Label>
        <Textarea
          id="startupDescription"
          value={formData.startupDescription}
          onChange={(e) => updateFormData("startupDescription", e.target.value)}
          placeholder="Describe what your startup does..."
          rows={4}
          className={errors.startupDescription ? "border-red-500" : ""}
        />
        {errors.startupDescription && <p className="text-sm text-red-500">{errors.startupDescription}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="totalRaised">Total Raised</Label>
          <Input
            id="totalRaised"
            value={formData.totalRaised}
            onChange={(e) => updateFormData("totalRaised", e.target.value)}
            placeholder="$0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Info</Label>
          <Input
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => updateFormData("additionalInfo", e.target.value)}
            placeholder="Any additional information"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Brand Basics Review */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">Brand Basics</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={formData.logo || undefined} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {formData.startupName ? formData.startupName[0].toUpperCase() : "S"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{formData.startupName || "Not provided"}</p>
              <p className="text-sm text-gray-600">{formData.tagline || "No tagline"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Location:</span> {formData.location || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Website:</span> {formData.website || "Not provided"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Info Review */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">What You&apos;re Building</h4>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Product Stage: </span> {formData.productStage || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Funding Round: </span> {formData.fundingRoundType || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Total Raised: $</span> {formData.totalRaised || "Not provided"}
            </div>
            <div>
              <span className="font-medium">Additional Info: </span> {formData.additionalInfo || "Not provided"}
            </div>
          </div>
          {formData.startupDescription && (
            <div>
              <span className="font-medium">Description:</span>
              <p className="text-sm text-gray-600 mt-1">{formData.startupDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Startup Details</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            <p className="text-gray-600">{getStepSubtitle()}</p>
          </CardHeader>

          <CardContent>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              {currentStep < 3 ? (
                <Button onClick={nextStep} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
