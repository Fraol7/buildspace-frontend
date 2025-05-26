"use client"

import type * as React from "react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  LifeBuoy,
  Send,
  Settings2,
  Briefcase,
  UserCircle,
} from "lucide-react"

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
  SidebarGroupLabel,
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
// import { useRef } from "react"
import ProfileDialog from "@/components/Profile/ProfileEdit"
import { InvestorNavMain } from "@/constants"

// Navigation data
export function InvestorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const { profile } = useProfile() || {
    name: "John Doe", }
  const [activeItem, setActiveItem] = useState("dashboard")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
  }


  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader className="bg-indigo-300">
        <SidebarMenu className="flex justify-center items-center">
          <Link href="/">
            <Image
              src={state === "collapsed" ? "/images/buildspace-sm.png" : "/images/buildspace-lg.png"}
              alt="Buildspace"
              width={state === "collapsed" ? 24 : 300} // Increase width for visibility
              height={24} // Proportional height for clarity
              className={state === "collapsed" ? "h-4 w-4" : "h-12 w-auto"} // Adjust size based on state
            />
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-green-200">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {InvestorNavMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.id === "my-investments" || item.id === "explore"}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items && item.items.length > 0 ? (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleItemClick(item.id)}
                        isActive={activeItem === item.id}
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
                        isActive={activeItem === item.id}
                        onClick={() => handleItemClick(item.id)}
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
                                isActive={activeItem === subItem.id}
                                onClick={() => handleItemClick(subItem.id)}
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
      <SidebarFooter className="bg-indigo-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="rounded-lg">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{profile.name}</span>
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
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback className="rounded-lg">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{profile.name}</span>
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
                console.log("Updated Profile:", updatedProfile);
                setIsProfileDialogOpen(false);
              }}
              profileData={profile}
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
