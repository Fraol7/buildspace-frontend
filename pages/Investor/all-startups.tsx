"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import StartupsGrid from "@/components/Investor/StartupsGrid"
import { useAllStartupsStore } from "@/store/allStartupsStore"

export default function AllStartups() {
  const { data: session } = useSession()
  const { 
    filteredStartups, 
    loading, 
    error, 
    fetchAllStartups,
    searchStartups,
    currentSearchQuery
  } = useAllStartupsStore()
  
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery || '')

  // Fetch startups when component mounts or session changes
  useEffect(() => {
    if (session?.accessToken) {
      fetchAllStartups(session.accessToken)
    }
  }, [session, fetchAllStartups])

  // Handle retry
  const handleRetry = () => {
    if (session?.accessToken) {
      fetchAllStartups(session.accessToken)
    }
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchStartups(query)
  }

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl text-gray-900 font-bold">All Startups</h1>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search startups..."
            className="w-full rounded-lg bg-background pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <StartupsGrid 
        startups={filteredStartups} 
        loading={loading} 
        error={error}
        onRetry={handleRetry}
      />
      
      {/* Results count - Only show if not loading and no error */}
      {!loading && !error && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredStartups.length} {filteredStartups.length === 1 ? 'startup' : 'startups'}
        </div>
      )}
    </div>
  )
}
