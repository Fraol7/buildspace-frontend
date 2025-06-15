import { LayoutDashboard, CircleDollarSign, Users, ChartCandlestick, Telescope, MessagesSquare, ChevronDown } from "lucide-react"
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

export function InvestorSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-green-100">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/investor/dashboard">
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
                          <CircleDollarSign />
                          <span>My Investments</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="/investor/invested">
                            <span>Invested Startups</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href="/investor/funded">
                            <span>Funded Campaigns</span>
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
                          <Telescope />
                          <span>Explore</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton asChild>
                          <a href="/investor/startups">
                            <span>All Startups</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href="/investor/saved">
                            <span>Saved Startups</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                          <a href="/investor/explore-campaigns">
                            <span>Campaigns</span>
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
                  <a href="/investor/market-insights">
                    <ChartCandlestick />
                    <span>Market Insights</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 5 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/investor/network">
                    <Users />
                    <span>Network</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* 6 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/investor/collab-space">
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
