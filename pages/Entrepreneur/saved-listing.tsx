"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { StartupCard } from "@/components/Entrepreneur/startup-card"
import { DUMMY_SAVED } from "@/constants"

const ITEMS_PER_PAGE = 5

export default function SavedListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const [savedStartups, setSavedStartups] = useState<Set<string>>(new Set())

  const totalPages = Math.ceil(DUMMY_SAVED.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentStartups = DUMMY_SAVED.slice(startIndex, endIndex)

  const handleSave = (startupId: string) => {
    setSavedStartups((prev) => {
      const newSaved = new Set(prev)
      if (newSaved.has(startupId)) {
        newSaved.delete(startupId)
      } else {
        newSaved.add(startupId)
      }
      return newSaved
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        {/* Startup Cards */}
        <div className="space-y-8 mb-16">
          {currentStartups.map((startup, index) => (
            <div
              key={startup.id}
              className="animate-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StartupCard startup={startup} isSaved={savedStartups.has(startup.id)} onSave={handleSave} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-200/50 p-3">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault()
                        if (currentPage > 1) handlePageChange(currentPage - 1)
                      }}
                      className={`rounded-xl transition-all duration-200 ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-sky-100 hover:text-sky-700 hover:shadow-md"
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}
                        isActive={currentPage === page}
                        className={`rounded-xl transition-all duration-200 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                            : "hover:bg-sky-100 hover:text-sky-700 hover:shadow-md"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                      }}
                      className={`rounded-xl transition-all duration-200 ${
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-sky-100 hover:text-sky-700 hover:shadow-md"
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-sky-700 font-semibold rounded-full py-3 px-6 shadow-lg border border-sky-200/50">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
            Showing {startIndex + 1}-{Math.min(endIndex, DUMMY_SAVED.length)} of {DUMMY_SAVED.length} startups
          </div>
        </div>
      </div>
    </div>
  )
}
