 "use client"

import AutoScrollingTrendingProjects from "@/components/Common/autochanging-trends"
import ChartsSection from "@/components/Investor/chart-section"
import InvestmentsSection from "@/components/Investor/startups-section"
import ProjectsGrid from "@/components/Investor/project-grid"
import StatsCards from "@/components/Investor/stats-card"

export default function Dashboard() {
  // This function could be replaced with a data fetching hook in the future
  // Example: const { data: trendingProjects, isLoading } = useTrendingProjects();

  // You could add loading states for when data is being fetched
  // if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Auto-scrolling Trending Projects */}
        <AutoScrollingTrendingProjects />

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <ChartsSection />

        {/* Projects Grid */}
        <ProjectsGrid />

        {/* Investments Section with Manual Navigation */}
        <InvestmentsSection />
      </div>
    </div>
  )
}
