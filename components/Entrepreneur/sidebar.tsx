import { LayoutDashboard, BriefcaseBusiness, ChartCandlestick, HandCoins, Users, MessagesSquare, ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

// Menu items.

export function EntrepreneurSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-blue-100">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/entrepreneur/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 2 */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                        <div>
                          <BriefcaseBusiness />
                          <span>Startups</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="/entrepreneur/my-startups">
                            <span>My Startups</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href="/entrepreneur/saved">
                            <span>Saved Startups</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* 3 */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                        <div>
                          <HandCoins />
                          <span>Crowdfunding</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="/entrepreneur/my-campaigns">
                            <span>My Campaigns</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href="/entrepreneur/explore-campaigns">
                            <span>Explore Campaigns</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              
              {/* 4 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/entrepreneur/market-insights">
                    <ChartCandlestick />
                    <span>Market Insights</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 5 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/entrepreneur/network">
                    <Users />
                    <span>Network</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* 6 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/entrepreneur/collab-space">
                    <MessagesSquare />
                    <span>Collab Space</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

