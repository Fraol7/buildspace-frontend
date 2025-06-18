"use client";

import { ArrowLeft, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/profile-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface AppHeaderProps {
  showBackButton?: boolean;
}

export function AppHeader({ showBackButton = true }: AppHeaderProps) {
  const router = useRouter();
  const { profile } = useProfile();

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
    router.back();
  };

  // const handleNotificationClick = () => {
  //   // Mark notifications as read when clicked
  //   setHasUnreadNotifications(false)
  // }

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-4 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:h-20 md:px-6">
      {/* Left section: Sidebar trigger, back button, and welcome message */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <SidebarTrigger className="-ml-1" />

        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="h-8 w-8 md:h-10 md:w-10"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}

        <div className="hidden md:flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">
            Welcome, {profile.name?.split(" ")[0] ?? "John"}
          </h1>
          <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
        </div>
      </div>

      {/* Right section: Profile */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={profile?.avatar || ""}
                  alt={profile?.name || "User"}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end" forceMount>
            <DropdownMenuItem
              onClick={() => router.push("/entrepreneur/profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
