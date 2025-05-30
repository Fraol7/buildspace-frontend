"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProfileData {
  address: string | undefined
  skills: string[] | undefined
  bio: string | undefined
  fullName: string | undefined
  name: string
  email: string
  avatar: string | null
}

interface ProfileContextType {
  profile: ProfileData
  updateProfile: (updates: Partial<ProfileData>) => void
  hasUnreadNotifications: boolean
  setHasUnreadNotifications: (hasUnread: boolean) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "John Doe",
    bio: "Default bio",
    skills: ["React", "Node.js"],
    address: "Default address",
    avatar: "/placeholder.jpg",
    email: "john.doe@example.com",
    name: ""
  })

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        hasUnreadNotifications,
        setHasUnreadNotifications,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
