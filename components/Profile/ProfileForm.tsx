"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Plus, X, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { DEFAULT_SKILLS, DEFAULT_LOCATIONS, INITIAL_PROFILE_DATA, INITIAL_EMAIL_ADDRESSES } from "@/constants"

interface EmailAddress {
  id: string
  email: string
  addedDate: string
}

interface ProfileData {
  fullName: string
  bio: string
  skills: string[]
  address: string
  avatar: string | null
}

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE_DATA)

  const [availableSkills, setAvailableSkills] = useState<string[]>(DEFAULT_SKILLS)
  const [availableLocations, setAvailableLocations] = useState<string[]>(DEFAULT_LOCATIONS)
  const [customSkill, setCustomSkill] = useState("")
  const [customLocation, setCustomLocation] = useState("")
  const [showCustomSkill, setShowCustomSkill] = useState(false)
  const [showCustomLocation, setShowCustomLocation] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)

  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>(INITIAL_EMAIL_ADDRESSES)

  const [newEmail, setNewEmail] = useState("")
  const [showAddEmail, setShowAddEmail] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSkillToggle = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleLocationChange = (location: string) => {
    setProfileData((prev) => ({
      ...prev,
      address: location,
    }))
  }

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !availableSkills.includes(customSkill.trim())) {
      const newSkill = customSkill.trim()
      setAvailableSkills((prev) => [...prev, newSkill])
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }))
      setCustomSkill("")
      setShowCustomSkill(false)
    }
  }

  const handleAddCustomLocation = () => {
    if (customLocation.trim() && !availableLocations.includes(customLocation.trim())) {
      const newLocation = customLocation.trim()
      setAvailableLocations((prev) => [...prev, newLocation])
      setProfileData((prev) => ({
        ...prev,
        address: newLocation,
      }))
      setCustomLocation("")
      setShowCustomLocation(false)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleAddEmail = () => {
    if (newEmail && newEmail.includes("@")) {
      const newEmailObj: EmailAddress = {
        id: Date.now().toString(),
        email: newEmail,
        addedDate: "Just now",
      }
      setEmailAddresses((prev) => [...prev, newEmailObj])
      setNewEmail("")
      setShowAddEmail(false)
    }
  }

  const handleRemoveEmail = (id: string) => {
    setEmailAddresses((prev) => prev.filter((email) => email.id !== id))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile data:", profileData)
    console.log("Email addresses:", emailAddresses)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="w-full mx-auto p-2 space-y-6">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-lg"></div>

      {/* Profile Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar || undefined} />
                  <AvatarFallback className="bg-gray-500 text-white">
                    {getInitials(profileData.fullName)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{profileData.fullName}</h2>
                <p className="text-sm text-gray-600">{emailAddresses[0]?.email}</p>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Cancel
                </Button>
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder="Your Full Name"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="space-y-2">
                <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between" disabled={!isEditing}>
                      {profileData.skills.length > 0
                        ? `${profileData.skills.length} skill(s) selected`
                        : "Select skills"}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="max-h-60 overflow-y-auto p-2">
                      {availableSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={profileData.skills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="flex-1 cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        {!showCustomSkill ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowCustomSkill(true)}
                            className="w-full justify-start"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add custom skill
                          </Button>
                        ) : (
                          <div className="flex space-x-2">
                            <Input
                              value={customSkill}
                              onChange={(e) => setCustomSkill(e.target.value)}
                              placeholder="Enter custom skill"
                              className="flex-1"
                              onKeyPress={(e) => e.key === "Enter" && handleAddCustomSkill()}
                            />
                            <Button size="sm" onClick={handleAddCustomSkill}>
                              Add
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setShowCustomSkill(false)
                                setCustomSkill("")
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {profileData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                        )}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself"
              disabled={!isEditing}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Location</Label>
            <div className="space-y-2">
              <Select value={profileData.address} onValueChange={handleLocationChange} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your location" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {availableLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isEditing && (
                <div className="mt-2">
                  {!showCustomLocation ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCustomLocation(true)}
                      className="w-full justify-start text-blue-500 hover:text-blue-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add custom location
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        placeholder="Enter custom location (e.g., Country - City)"
                        className="flex-1"
                        onKeyPress={(e) => e.key === "Enter" && handleAddCustomLocation()}
                      />
                      <Button size="sm" onClick={handleAddCustomLocation}>
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setShowCustomLocation(false)
                          setCustomLocation("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {profileData.address && (
                <div className="mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    {profileData.address}
                    {isEditing && (
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => setProfileData((prev) => ({ ...prev, address: "" }))}
                      />
                    )}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Addresses Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">My Email Address</h3>
            <Button
              onClick={() => setShowAddEmail(true)}
              variant="ghost"
              size="sm"
              className="text-blue-500 hover:text-blue-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Email Address
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {emailAddresses.map((email) => (
            <div key={email.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">{email.email}</p>
                  <p className="text-sm text-gray-500">{email.addedDate}</p>
                </div>
              </div>
              {emailAddresses.length > 1 && (
                <Button
                  onClick={() => handleRemoveEmail(email.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {showAddEmail && (
            <div className="flex items-center space-x-2 p-3 border border-dashed border-gray-300 rounded-lg">
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email address"
                type="email"
                className="flex-1"
              />
              <Button onClick={handleAddEmail} size="sm">
                Add
              </Button>
              <Button
                onClick={() => {
                  setShowAddEmail(false)
                  setNewEmail("")
                }}
                variant="ghost"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
