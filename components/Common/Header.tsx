"use client"

import type React from "react"


import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"

interface HeaderProps {
  userName?: string
  userAvatar?: string
  onProfileClick?: () => void
  onLogoutClick?: () => void
}

export default function Header({
  userName = "Feven",
  userAvatar,
  onProfileClick = () => {},
  onLogoutClick = () => {},
}: HeaderProps) {
  
  const getCurrentDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
    return now.toLocaleDateString("en-US", options)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Welcome message */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">Welcome, {userName}</h1>
          <p className="text-sm text-gray-500">{getCurrentDate()}</p>
        </div>

        {/* Center - Profile Avatar */}
        <div className="flex-1 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar || "/placeholder.jpg"} alt={userName} />
                  <AvatarFallback className="bg-blue-500 text-white">{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="center" forceMount>
              <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side - Empty div to balance the layout */}
        <div className="w-10"></div>
      </div>
    </header>
  )
}
