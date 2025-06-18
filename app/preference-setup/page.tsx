"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Target, MapPin, TrendingUp, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface InvestmentPreferences {
  investment_preferences: string[]
  minimum_ticket_size: number
  maximum_ticket_size: number
  preferred_stages: string[]
  location_preferences: string[]
}

interface FormErrors {
  investment_preferences?: string
  minimum_ticket_size?: string
  maximum_ticket_size?: string
  preferred_stages?: string
  location_preferences?: string
  general?: string
}

interface MultiSelectProps {
  options: { id: string; label: string; icon?: string }[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder: string
  error?: string
}

function MultiSelect({ options, selected, onSelectionChange, placeholder, error }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (optionId: string) => {
    if (selected.includes(optionId)) {
      onSelectionChange(selected.filter((id) => id !== optionId))
    } else {
      onSelectionChange([...selected, optionId])
    }
  }

  const removeOption = (optionId: string) => {
    onSelectionChange(selected.filter((id) => id !== optionId))
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "min-h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300",
          error && "border-red-300 focus:border-red-300 focus:ring-red-200",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {selected.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selected.map((selectedId) => {
              const option = options.find((opt) => opt.id === selectedId)
              return option ? (
                <Badge key={selectedId} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {option.icon && <span className="mr-1">{option.icon}</span>}
                  {option.label}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(selectedId)
                    }}
                  />
                </Badge>
              ) : null
            })
          )}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-blue-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center gap-2",
                selected.includes(option.id) && "bg-blue-100",
              )}
              onClick={() => toggleOption(option.id)}
            >
              {option.icon && <span>{option.icon}</span>}
              <span>{option.label}</span>
              {selected.includes(option.id) && <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export default function InvestmentForm() {
  const [formData, setFormData] = useState<InvestmentPreferences>({
    investment_preferences: [],
    minimum_ticket_size: 0,
    maximum_ticket_size: 0,
    preferred_stages: [],
    location_preferences: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const investmentOptions = [
    { id: "cleantech", label: "Clean Technology", icon: "🌱" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "design", label: "Design", icon: "🎨" },
  ]

  const stageOptions = [
    { id: "angel", label: "Angel Round", icon: "👼" },
    { id: "series-a", label: "Series A", icon: "🚀" },
  ]

  const locationOptions = [
    { id: "USA", label: "United States", icon: "🇺🇸" },
    { id: "AGO", label: "Angola", icon: "🇦🇴" },
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Investment preferences validation
    if (formData.investment_preferences.length === 0) {
      newErrors.investment_preferences = "Please select at least one investment preference"
    }

    // Minimum ticket size validation
    if (!formData.minimum_ticket_size || formData.minimum_ticket_size <= 0) {
      newErrors.minimum_ticket_size = "Minimum ticket size must be greater than 0"
    } else if (formData.minimum_ticket_size < 1000) {
      newErrors.minimum_ticket_size = "Minimum ticket size should be at least $1,000"
    }

    // Maximum ticket size validation
    if (!formData.maximum_ticket_size || formData.maximum_ticket_size <= 0) {
      newErrors.maximum_ticket_size = "Maximum ticket size must be greater than 0"
    } else if (formData.maximum_ticket_size < formData.minimum_ticket_size) {
      newErrors.maximum_ticket_size = "Maximum ticket size must be greater than minimum ticket size"
    }

    // Preferred stages validation
    if (formData.preferred_stages.length === 0) {
      newErrors.preferred_stages = "Please select at least one preferred investment stage"
    }

    // Location preferences validation
    if (formData.location_preferences.length === 0) {
      newErrors.location_preferences = "Please select at least one location preference"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof InvestmentPreferences, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleArrayChange = (
    field: keyof Pick<InvestmentPreferences, "investment_preferences" | "preferred_stages" | "location_preferences">,
    value: string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user makes selection
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to save data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Investment Preferences Submitted:", formData)

      // Save to localStorage for persistence
      localStorage.setItem("investmentPreferences", JSON.stringify(formData))

      // Mark as submitted to show success state
      setIsSubmitted(true)
    } catch (error) {
      setErrors({ general: "Failed to save preferences. Please try again." })
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Show success state with link to dashboard
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Preferences Saved Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Your investment preferences have been saved and your profile is now complete.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/investor/dashboard">
                  <Button className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-semibold px-8 py-3">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3"
                >
                  Edit Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Investment Preferences</h1>
          <p className="text-lg text-gray-600">Tell us about your investment goals and preferences</p>
        </div>

        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-8">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Investment Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-blue-600" />
                  <Label className="text-lg font-semibold text-gray-800">Investment Sectors *</Label>
                </div>
                <MultiSelect
                  options={investmentOptions}
                  selected={formData.investment_preferences}
                  onSelectionChange={(selected) => handleArrayChange("investment_preferences", selected)}
                  placeholder="Select investment sectors..."
                  error={errors.investment_preferences}
                />
              </div>

              <Separator className="bg-blue-100" />

              {/* Ticket Size */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <Label className="text-lg font-semibold text-gray-800">Investment Range *</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="min-ticket" className="text-sm font-medium text-gray-700">
                      Minimum Budget
                    </Label>
                    <Input
                      id="min-ticket"
                      type="number"
                      placeholder="50000"
                      value={formData.minimum_ticket_size || ""}
                      onChange={(e) => handleInputChange("minimum_ticket_size", Number.parseInt(e.target.value) || 0)}
                      className={cn(
                        "border-blue-200 focus:border-blue-300 focus:ring-blue-200",
                        errors.minimum_ticket_size && "border-red-300 focus:border-red-300 focus:ring-red-200",
                      )}
                    />
                    {errors.minimum_ticket_size && <p className="text-sm text-red-600">{errors.minimum_ticket_size}</p>}
                    {formData.minimum_ticket_size > 0 && !errors.minimum_ticket_size && (
                      <p className="text-sm text-blue-600">{formatCurrency(formData.minimum_ticket_size)}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-ticket" className="text-sm font-medium text-gray-700">
                      Maximum Budget
                    </Label>
                    <Input
                      id="max-ticket"
                      type="number"
                      placeholder="500000"
                      value={formData.maximum_ticket_size || ""}
                      onChange={(e) => handleInputChange("maximum_ticket_size", Number.parseInt(e.target.value) || 0)}
                      className={cn(
                        "border-blue-200 focus:border-blue-300 focus:ring-blue-200",
                        errors.maximum_ticket_size && "border-red-300 focus:border-red-300 focus:ring-red-200",
                      )}
                    />
                    {errors.maximum_ticket_size && <p className="text-sm text-red-600">{errors.maximum_ticket_size}</p>}
                    {formData.maximum_ticket_size > 0 && !errors.maximum_ticket_size && (
                      <p className="text-sm text-blue-600">{formatCurrency(formData.maximum_ticket_size)}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-blue-100" />

              {/* Preferred Stages */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <Label className="text-lg font-semibold text-gray-800">Preferred Investment Stages *</Label>
                </div>
                <MultiSelect
                  options={stageOptions}
                  selected={formData.preferred_stages}
                  onSelectionChange={(selected) => handleArrayChange("preferred_stages", selected)}
                  placeholder="Select investment stages..."
                  error={errors.preferred_stages}
                />
              </div>

              <Separator className="bg-blue-100" />

              {/* Location Preferences */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <Label className="text-lg font-semibold text-gray-800">Geographic Preferences *</Label>
                </div>
                <MultiSelect
                  options={locationOptions}
                  selected={formData.location_preferences}
                  onSelectionChange={(selected) => handleArrayChange("location_preferences", selected)}
                  placeholder="Select geographic preferences..."
                  error={errors.location_preferences}
                />
              </div>
              <Separator className="bg-blue-100" />
              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-semibold px-12 py-3 text-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Investment Preferences"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
