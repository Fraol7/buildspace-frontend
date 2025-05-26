"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProfileData {
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
    name: "John Doe",
    email: "john@buildspace.com",
    avatar: null,
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
