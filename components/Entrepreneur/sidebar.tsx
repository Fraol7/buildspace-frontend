import { LayoutDashboard, BriefcaseBusiness, ChartCandlestick, HandCoins, Users, MessagesSquare } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/entrepreneur/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Startups",
    url: "/entrepreneur/my-startups",
    icon: BriefcaseBusiness,
  },
  {
    title: "Crowdfunding",
    url: "/entrepreneur/crowdfunding",
    icon: HandCoins,
  },
  {
    title: "Market Insights",
    url: "/entrepreneur/market-insights",
    icon: ChartCandlestick,
  },
  {
    title: "Network",
    url: "/entrepreneur/network",
    icon: Users,
  },
  {
    title: "Collab Space",
    url: "/entrepreneur/collab-space",
    icon: MessagesSquare,
  },
]

export function EntrepreneurSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-blue-100">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
