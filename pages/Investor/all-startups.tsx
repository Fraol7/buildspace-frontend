"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search, Star } from "lucide-react"
import { PROJECTS_GRID } from "@/constants"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function AllStartups() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  // Filter projects based on search query
  const filteredProjects = PROJECTS_GRID.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.industries.some((industry) => industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.founderName?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Generate page numbers for pagination
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search Field with proper spacing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl text-gray-900 font-bold">All Startups</h1>
        <div className="relative w-full sm:w-auto sm:min-w-[320px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10 bg-white border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-10 text-sm w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page on new search
            }}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <Link href={`/investor/startup-detail/${project.id}`} key={project.id} className="block">
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group h-full">
                {/* Project Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    width={40}
                    height={40}
                    className="rounded-lg bg-gray-100 p-1"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">{project.name}</h4>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">{project.category}</p>
                  </div>
                </div>

                {/* Industry Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.industries?.map((industry, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                      {project.funding}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs transition-colors ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                          : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                            : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <Progress
                    value={project.progress}
                    className={`h-2 ${
                      project.status === "Completed"
                        ? "bg-green-300"
                        : project.status === "In Progress"
                          ? "bg-blue-300"
                          : "bg-indigo-300"
                    }`}
                  />
                  <p className="text-xs text-gray-500 group-hover:text-blue-600">{project.progress}% funded</p>
                </div>

                {/* Founder/Investor Avatar with Rating */}
                <div className="flex mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                    <Image
                      src={project.avatar || "/placeholder.jpg?height=32&width=32"}
                      alt={project.founderName || "Founder"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 group-hover:text-blue-800">
                      {project.founderName || "Anonymous"}
                    </p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(project.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1 group-hover:text-blue-600">
                        ({project.rating || "0.0"})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-500">No projects found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pageNumbers.map((number) => {
                // Show first page, current page, last page, and one page before and after current
                if (
                  number === 1 ||
                  number === totalPages ||
                  number === currentPage ||
                  number === currentPage - 1 ||
                  number === currentPage + 1
                ) {
                  return (
                    <PaginationItem key={number}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(number)
                        }}
                        isActive={currentPage === number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }

                // Show ellipsis for gaps
                if ((number === 2 && currentPage > 3) || (number === totalPages - 1 && currentPage < totalPages - 2)) {
                  return (
                    <PaginationItem key={number}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return null
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Results count */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {currentProjects.length > 0 ? indexOfFirstProject + 1 : 0} to{" "}
        {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
      </div>
    </div>
  )
}
