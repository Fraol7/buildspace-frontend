"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, Home, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SystemErrorPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate a delay before refreshing
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-14 h-14 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Something went wrong</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            We&apos;re experiencing some technical difficulties. Please try again or check back later.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 h-auto"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <span className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 animate-spin" />
                Refreshing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </span>
            )}
          </Button>
          <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50 px-4 py-3 h-auto">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
