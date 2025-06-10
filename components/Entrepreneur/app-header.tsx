"use client"

import { ArrowLeft, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useProfile } from "@/lib/profile-context"

interface AppHeaderProps {
  showBackButton?: boolean
}

export function AppHeader({ showBackButton = true }: AppHeaderProps) {
  const router = useRouter()
  const { profile, hasUnreadNotifications, setHasUnreadNotifications } = useProfile()

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    return now.toLocaleDateString("en-UK", options).replace(",", " ");
  };

  const handleBackClick = () => {
    router.back()
  }

  const handleNotificationClick = () => {
    // Mark notifications as read when clicked
    setHasUnreadNotifications(false)
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-4 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:h-20 md:px-6">
      {/* Left section: Sidebar trigger, back button, and welcome message */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <SidebarTrigger className="-ml-1" />

        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={handleBackClick} className="h-8 w-8 md:h-10 md:w-10">
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        <div className="hidden md:flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">
            Welcome, {(profile.name?.split(" ")[0] ?? "John")}
          </h1>
          <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
        </div>
      </div>

      {/* Right section: Search and notifications */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search" className="w-40 pl-10 pr-4 h-9 bg-muted/50 md:w-64" />
        </div>

        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="h-9 w-9 relative" onClick={handleNotificationClick}>
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">Notifications</span>
          {/* Conditional notification badge */}
          {hasUnreadNotifications && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>}
        </Button>
      </div>
    </header>
  )
}
