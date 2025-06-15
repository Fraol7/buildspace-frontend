"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, Settings, LogOut, ChevronRight } from "lucide-react"

interface HeaderProps {
  userName?: string
  userAvatar?: string
  notificationCount?: number
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onNotificationClick?: () => void
  onLogoutClick?: () => void
  onSearchChange?: (value: string) => void
}

export default function Header({
  userName = "Feven",
  userAvatar,
  notificationCount = 0,
  onProfileClick,
  onSettingsClick,
  onNotificationClick,
  onLogoutClick,
  onSearchChange,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearchChange?.(value)
  }

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

        {/* Center - Search bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="search..."
              value={searchValue}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          {/* <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100" onClick={onNotificationClick}>
            <Bell className="h-5 w-5 text-gray-600" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </Badge>
            )}
          </Button> */}

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar || "/placeholder.jpg"} alt={userName} />
                  <AvatarFallback className="bg-blue-500 text-white">{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <span className="flex-1">My Profile</span>
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
                <Settings className="mr-3 h-4 w-4" />
                <span className="flex-1">Settings</span>
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onNotificationClick} className="cursor-pointer">
                <Bell className="mr-3 h-4 w-4" />
                <span className="flex-1">Notification</span>
                <span className="ml-2 text-sm text-gray-500">Allow</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={onLogoutClick} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-3 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
