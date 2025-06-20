"use client"

import type * as React from "react"
// import Image from "next/image";
import { useState } from "react"
import Link from "next/link"
import { ChevronRight, LifeBuoy, Send, Settings2, Briefcase, UserCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useProfile } from "@/lib/profile-context"
import { usePathname } from "next/navigation"
import ProfileDialog from "@/components/Profile/ProfileEdit"
import { InvestorNavMain } from "@/constants"
import Logo from "@/components/Common/Logo"

// Define the ProfileData type
type ProfileData = {
  fullName?: string
  bio?: string
  skills?: string[]
  address?: string
  avatar?: string
  email?: string
}

// Provide a default profile as a fallback
const defaultProfile: ProfileData = {
  fullName: "John Doe",
  bio: "Default bio",
  skills: ["React", "Node.js"],
  address: "Default address",
  avatar: "/placeholder.jpg",
  email: "john.doe@example.com",
}

export function InvestorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  // Retrieve the profile data, falling back to defaults
  const { profile: userProfile } = useProfile() || { profile: defaultProfile }
  const profile: ProfileData = {
    fullName: userProfile?.fullName || defaultProfile.fullName,
    bio: userProfile?.bio || defaultProfile.bio,
    skills: userProfile?.skills || defaultProfile.skills,
    address: userProfile?.address || defaultProfile.address,
    avatar: userProfile?.avatar || defaultProfile.avatar,
    email: userProfile?.email || defaultProfile.email,
  }

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const pathname = usePathname()

  // Helper function to check if a menu item is active
  const isItemActive = (url: string, itemId: string, isCollapsible: boolean = false) => {
    if (!pathname) return false;
    
    // For dashboard, only match exact path
    if (itemId === 'dashboard') {
      return pathname === url;
    }
    
    // For collapsible items, only match exact path (not children)
    if (isCollapsible) {
      return pathname === url;
    }
    
    // For other items, check if the current path exactly matches the item's URL
    // or if it's a direct child of the item's URL (one level deep)
    const isExactMatch = pathname === url;
    const isDirectChild = pathname.startsWith(url + '/') && 
                         pathname.substring(url.length + 1).split('/').length === 1;
    
    return isExactMatch || isDirectChild;
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="bg-gray-100">
        <SidebarMenu className="flex justify-center items-center">
          <Link href="/">
            <Logo size={state === "collapsed" ? "sm" : "lg"} />
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gray-100">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarMenu>
            {InvestorNavMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.id === "my-investments" || item.id === "explore-campaigns"}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items && item.items.length > 0 ? (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.items && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  ) : (
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isItemActive(item.url, item.id)}
                        className={isItemActive(item.url, item.id) ? "bg-blue-400 text-white hover:bg-blue-500" : ""}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  )}

                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link href={subItem.url}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isItemActive(subItem.url, subItem.id)}
                                className={isItemActive(subItem.url, subItem.id) ? "bg-blue-400 text-white hover:bg-blue-500" : ""}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.fullName} />
                    <AvatarFallback className="rounded-lg">
                      {profile.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{profile.fullName}</span>
                    <span className="truncate text-xs">{profile.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.fullName} />
                      <AvatarFallback className="rounded-lg">
                        {profile.fullName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{profile.fullName}</span>
                      <span className="truncate text-xs">{profile.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Send className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ProfileDialog
              isOpen={isProfileDialogOpen}
              onClose={() => setIsProfileDialogOpen(false)}
              onSave={(updatedProfile) => {
                console.log("Updated Profile:", updatedProfile)
                setIsProfileDialogOpen(false)
              }}
              profileData={{
                fullName: profile.fullName || "",
                bio: profile.bio || "",
                skills: profile.skills || [],
                address: profile.address || "",
              }}
              availableSkills={["React", "Node.js", "Python", "JavaScript"]}
              availableLocations={["San Francisco", "Los Angeles", "New York"]}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
