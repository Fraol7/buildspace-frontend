import { LayoutDashboard, CircleDollarSign, Users, ChartCandlestick, Telescope, MessagesSquare } from "lucide-react"

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
    url: "/investor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Investments",
    url: "/investor/my-investments",
    icon: CircleDollarSign,
  },
  {
    title: "Explore",
    url: "/investor/explore",
    icon: Telescope,
  },
  {
    title: "Market Insights",
    url: "/investor/market-insights",
    icon: ChartCandlestick,
  },
  {
    title: "Network",
    url: "/investor/network",
    icon: Users,
  },
  {
    title: "Collab Space",
    url: "/investor/collab-space",
    icon: MessagesSquare,
  },
]

export function InvestorSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-green-100">
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
