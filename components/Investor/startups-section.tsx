import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { INDUSTRIES } from "@/constants"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { useDashboardStore } from "@/store/dashboardStore"
import { useSession } from "next-auth/react"

interface Investment {
  id: string;
  startup_id: {
    id: string;
    startup_name: string;
    logo_url: string;
    industry: number;
    location: string;
    stage?: string;
    tagline?: string;
    funding_stage?: string;
  };
  amount: number;
  invested_at: string;
  status: string;
}

const StartupsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 2
  const { data: session } = useSession()
  const { investments, fetchInvestments, loading, error } = useDashboardStore()

  useEffect(() => {
    if (session?.accessToken) {
      fetchInvestments(session.accessToken)
    }
  }, [session?.accessToken, fetchInvestments])

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      Math.min(prevIndex + itemsPerPage, Math.max(0, investments.length - itemsPerPage))
    )
  }

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      Math.max(0, prevIndex - itemsPerPage)
    )
  }

  const visibleInvestments = investments.slice(currentIndex, currentIndex + itemsPerPage)

  if (loading) {
    return (
      <Card className="shadow-sm border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-gray-700">My Investments</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-7 h-7 border-3 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Loading your investments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-sm border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-gray-700">My Investments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-40 text-center px-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Couldn't load investments</p>
              <p className="text-xs text-gray-400 mt-1">We're having trouble loading your investments</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3"
              onClick={() => session?.accessToken && fetchInvestments(session.accessToken)}
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (investments.length === 0) {
    return (
      <Card className="shadow-sm border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-gray-700">My Investments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-40 text-center px-4">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">No investments yet</p>
              <p className="text-xs text-gray-400 mt-1">Your investments will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">My Investments</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="h-8 w-8 p-0"
              disabled={currentIndex === 0}
              aria-label="Previous investments"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="h-8 w-8 p-0"
              disabled={currentIndex + itemsPerPage >= investments.length}
              aria-label="Next investments"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleInvestments.map((investment: Investment) => (
            <Link 
              href={`/investor/startup/${investment.startup_id.id}`} 
              key={investment.id} 
              className="block"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white border border-gray-100 overflow-hidden">
                        <Image
                          // src={investment.startup_id.logo_url || "/placeholder.jpg"}
                          src={"/placeholder.jpg"}
                          alt={investment.startup_id.startup_name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                        {investment.startup_id.startup_name}
                      </h4>
                    </div>
                    <Badge variant="outline" className="bg-white border-blue-500 text-blue-600 text-xs whitespace-nowrap h-fit">
                      {investment.startup_id.funding_stage || 'Early Stage'}
                    </Badge>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-green-600 bg-white border-green-600 text-xs">
                        {INDUSTRIES[investment.startup_id.industry] || 'Other'}
                      </Badge>
                      <Badge variant="outline" className="text-gray-500 bg-white border-gray-200 text-xs">
                        {investment.startup_id.location}
                      </Badge>
                    </div>
                  </div>
                
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Invested on</p>
                    <p className="text-sm font-medium">
                      {new Date(investment.invested_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Amount Invested</p>
                    <p className="text-sm font-semibold text-green-600">
                      ${investment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default StartupsSection;