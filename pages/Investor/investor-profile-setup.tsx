"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CheckCircle, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

export default function InvestorProfileSetup() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedInvestmentPreferences, setSelectedInvestmentPreferences] = useState<string[]>([])
  const [selectedPreferredStages, setSelectedPreferredStages] = useState<string[]>([])
  const [selectedLocationPreferences, setSelectedLocationPreferences] = useState<string[]>([])
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false)
  const [isStagesDropdownOpen, setIsStagesDropdownOpen] = useState(false)
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [profileCreated, setProfileCreated] = useState(false)
  const [createdProfileId, setCreatedProfileId] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    investmentPreferences: [] as string[],
    minimumBudget: "",
    maximumBudget: "",
    preferredStages: [] as string[],
    locationPreferences: [] as string[],
  })

  const investmentPreferences = [
    "Technology",
    "Healthcare",
    "Finance & FinTech",
    "E-commerce",
    "Education & EdTech",
    "Real Estate",
    "Manufacturing",
    "Food & Beverage",
    "Entertainment & Media",
    "Transportation & Logistics",
    "Energy & CleanTech",
    "Artificial Intelligence",
    "Blockchain & Crypto",
    "Cybersecurity",
    "Biotechnology",
    "Renewable Energy",
    "Agriculture & AgTech",
    "Retail & Consumer Goods",
    "Gaming",
    "SaaS & Software",
  ]

  const preferredStages = [
    "Pre-Seed",
    "Seed Stage",
    "Series A",
    "Series B",
    "Series C",
    "Series D+",
    "Growth Stage",
    "Late Stage",
    "IPO Ready",
  ]

  const locationPreferences = [
    "North America",
    "United States",
    "Canada",
    "Europe",
    "United Kingdom",
    "Germany",
    "France",
    "Netherlands",
    "Asia Pacific",
    "Singapore",
    "Japan",
    "South Korea",
    "Australia",
    "India",
    "China",
    "Latin America",
    "Brazil",
    "Mexico",
    "Middle East",
    "Africa",
    "Global (No Preference)",
  ]

  // Update formData when selections change
  useEffect(() => {
    handleInputChange("investmentPreferences", selectedInvestmentPreferences)
  }, [selectedInvestmentPreferences])

  useEffect(() => {
    handleInputChange("preferredStages", selectedPreferredStages)
  }, [selectedPreferredStages])

  useEffect(() => {
    handleInputChange("locationPreferences", selectedLocationPreferences)
  }, [selectedLocationPreferences])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("profileImage", file)
    }
  }

  const handleMultiSelectToggle = (
    item: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const removeSelectedItem = (
    itemToRemove: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelectedItems((prev) => prev.filter((i) => i !== itemToRemove))
  }

  const handleSubmitConfirm = () => {
    console.log("Creating investor profile:", formData)

    // Simulate profile creation with an ID
    const newProfileId = `investor_${Date.now()}`
    setCreatedProfileId(newProfileId)
    setProfileCreated(true)

    setShowConfirmDialog(false)
    setShowSuccessModal(true)
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

  const getDropdownDisplayText = (items: string[], placeholder: string) => {
    if (items.length === 0) {
      return placeholder
    }
    if (items.length <= 2) {
      return items.join(", ")
    }
    return `${items.slice(0, 2).join(", ")} +${items.length - 2} more`
  }

  const isFormValid = () => {
    return (
      formData.investmentPreferences.length > 0 &&
      formData.minimumBudget &&
      formData.maximumBudget &&
      formData.preferredStages.length > 0 &&
      formData.locationPreferences.length > 0
    )
  }

  const MultiSelectDropdown = ({
    items,
    selectedItems,
    setSelectedItems,
    isOpen,
    setIsOpen,
    placeholder,
    label,
  }: {
    items: string[]
    selectedItems: string[]
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    placeholder: string
    label: string
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label} *</Label>
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between border-gray-300 text-left font-normal"
        >
          <span className="truncate">{getDropdownDisplayText(selectedItems, placeholder)}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  onClick={() => handleMultiSelectToggle(item, selectedItems, setSelectedItems)}
                >
                  <Checkbox id={`${label}-${item}`} checked={selectedItems.includes(item)} onChange={() => {}} />
                  <label
                    htmlFor={`${label}-${item}`}
                    className="text-sm font-medium leading-none cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
      </div>

      {/* Selected Items Display */}
      <div className="mt-4">
        <Label className="text-sm font-medium text-gray-700 mb-2">Selected {label}:</Label>
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedItems.length === 0 ? (
            <span className="text-sm text-gray-500">No {label.toLowerCase()} selected</span>
          ) : (
            selectedItems.map((item, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeSelectedItem(item, selectedItems, setSelectedItems)}
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
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Modal */}
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-black flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Investment Preferences Saved Successfully!
              </DialogTitle>
              <DialogDescription>
                Your investment preferences have been saved and will help match you with relevant opportunities.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccessModal(false)
                  window.location.reload()
                }}
              >
                Create Another
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessModal(false)
                  window.location.href = `/investor-profile/${createdProfileId}`
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                View Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Investment Preferences</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to save these investment preferences? This will help us match you with relevant
                investment opportunities.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmitConfirm}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Create Profile
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Set Your Investment Preferences</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investment Preferences */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-xl text-black flex items-center gap-2">Investment Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Preferences Multi-Select */}
                <MultiSelectDropdown
                  items={investmentPreferences}
                  selectedItems={selectedInvestmentPreferences}
                  setSelectedItems={setSelectedInvestmentPreferences}
                  isOpen={isInvestmentDropdownOpen}
                  setIsOpen={setIsInvestmentDropdownOpen}
                  placeholder="Select industries you're interested in"
                  label="Investment Industries"
                />

                {/* Budget Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Minimum Investment Budget *</Label>
                    <Input
                      type="number"
                      value={formData.minimumBudget}
                      onChange={(e) => handleInputChange("minimumBudget", e.target.value)}
                      placeholder="10000"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Minimum: {formatCurrency(formData.minimumBudget || "0")}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Maximum Investment Budget *</Label>
                    <Input
                      type="number"
                      value={formData.maximumBudget}
                      onChange={(e) => handleInputChange("maximumBudget", e.target.value)}
                      placeholder="1000000"
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Maximum: {formatCurrency(formData.maximumBudget || "0")}</p>
                  </div>
                </div>

                {/* Preferred Stages Multi-Select */}
                <MultiSelectDropdown
                  items={preferredStages}
                  selectedItems={selectedPreferredStages}
                  setSelectedItems={setSelectedPreferredStages}
                  isOpen={isStagesDropdownOpen}
                  setIsOpen={setIsStagesDropdownOpen}
                  placeholder="Select preferred investment stages"
                  label="Preferred Stages"
                />

                {/* Location Preferences Multi-Select */}
                <MultiSelectDropdown
                  items={locationPreferences}
                  selectedItems={selectedLocationPreferences}
                  setSelectedItems={setSelectedLocationPreferences}
                  isOpen={isLocationDropdownOpen}
                  setIsOpen={setIsLocationDropdownOpen}
                  placeholder="Select geographic preferences"
                  label="Location Preferences"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-black">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industries:</span>
                      <span className="font-medium text-gray-900">{formData.investmentPreferences.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget Range:</span>
                      <span className="font-medium text-gray-900">
                        {formData.minimumBudget && formData.maximumBudget
                          ? `${formatCurrency(formData.minimumBudget)} - ${formatCurrency(formData.maximumBudget)}`
                          : "Not set"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stages:</span>
                      <span className="font-medium text-gray-900">{formData.preferredStages.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Locations:</span>
                      <span className="font-medium text-gray-900">{formData.locationPreferences.length || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-200">
          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={!isFormValid()}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 text-lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Save Investment Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}
