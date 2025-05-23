import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { EntrepreneurSidebar } from "@/components/Entrepreneur/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <EntrepreneurSidebar />
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="bg-gray-100 p-4 border-b border-gray-200 flex items-center gap-8">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Dashboard Header</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  )
}
