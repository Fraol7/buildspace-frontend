import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { useAllStartupsStore, type Startup } from "@/store/allStartupsStore"
import { useSession } from "next-auth/react"
import { INDUSTRIES } from "@/constants"

interface StartupsGridProps {
  startups: Startup[]
  loading: boolean
  error: string | null
  onRetry?: () => void
}

export default function StartupsGrid({ 
  startups, 
  loading, 
  error, 
  onRetry 
}: StartupsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Calculate pagination
  const totalPages = Math.ceil((startups?.length || 0) / itemsPerPage)
  const currentItems = (startups || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Reset to first page when startups array changes
  useEffect(() => {
    setCurrentPage(1)
  }, [startups])

  if (loading && startups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="text-gray-600">Loading startups...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
        <p className="text-gray-600 max-w-md">{error}</p>
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline" 
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    )
  }

  if (!startups || startups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 p-6 text-center">
        <div className="bg-gray-100 p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No startups found</h3>
        <p className="text-gray-600">
          There are no startups available at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((startup) => (
          <Link href={`startup-detail/${startup.id}`} key={startup.id} className="block">
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:from-blue-100 hover:to-blue-50 group h-full border border-gray-100 hover:border-blue-200">
              {/* Startup Header */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={startup.logo_url || "/placeholder.jpg"}
                      alt={startup.startup_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{startup.startup_name}</h3>
                  <p className="text-sm text-gray-500">
                    {INDUSTRIES[startup.industry] || 'Technology'}
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    ${startup.amount_raised?.toLocaleString() || '0'} raised
                  </span>
                  <span className="text-gray-500">
                    ${startup.funding_goal?.toLocaleString() || '0'} goal
                  </span>
                </div>
                
                <Progress value={startup.progress || 0} className="h-2 bg-gray-100" />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{startup.progress || 0}% funded</span>
                  <span className="capitalize">{startup.funding_stage || 'N/A'}</span>
                </div>
              </div>

              {/* Location */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{startup.location || 'Location not specified'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="gap-1"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
