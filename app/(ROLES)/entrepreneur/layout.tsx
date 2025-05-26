import { SidebarProvider } from "@/components/ui/sidebar"
// import { EntrepreneurSidebar } from "@/components/Entrepreneur/sidebar"
import { AppHeader } from "@/components/Entrepreneur/app-header"
import { EntrepreneurSidebar } from "@/components/Entrepreneur/app-sidebar"
import { ProfileProvider } from '@/lib/profile-context';
// import Header from "@/components/Common/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <EntrepreneurSidebar />
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          {/* <Header /> */}
          <AppHeader />
          {/* <header className="sticky top-0 z-50 w-full bg-gray-100 p-4 border-b border-gray-200 flex items-center gap-8">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard Header</h1>
          </header> */}

          {/* Page Content */}
          <main className="flex-1 p-6 bg-slate-100">
            {children}
          </main>
        </div>
      </ProfileProvider>
    </SidebarProvider>
  )
}
