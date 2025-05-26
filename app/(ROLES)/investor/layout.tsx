import { SidebarProvider } from "@/components/ui/sidebar"
import { InvestorSidebar } from "@/components/Investor/app-sidebar"
import { AppHeader } from "@/components/Investor/app-header"
import { ProfileProvider } from '@/lib/profile-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <InvestorSidebar />
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <AppHeader />
          {/* <header className="bg-gray-100 p-4 border-b border-gray-200 flex items-center gap-8">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard Header</h1>
          </header> */}

          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </ProfileProvider>
    </SidebarProvider>
  )
}
