"use client"

import React from "react"
import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "@/types/user"
import UserCard from "./user-card"
import Pagination from "./pagination"

interface UserCardGroupProps {
  users: User[]
  title?: string
  className?: string
  usersPerPage?: number
}

export default function UserCardGroup({
  users,
  title = "User Profiles",
  className = "",
  usersPerPage = 6,
}: UserCardGroupProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users

    const query = searchQuery.toLowerCase().trim()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.badges.some((badge: string) => badge.toLowerCase().includes(query)) ||
        user.role.toLowerCase().includes(query),
    )
  }, [users, searchQuery])

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setCurrentPage(1)
  }

  if (users.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500 text-lg">No users to display</p>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>

          {/* Search Bar */}
          <div className="relative max-w-md mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, bio, location, or expertise..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 px-3 hover:bg-transparent"
              >
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            )}
          </div>

          <p className="text-gray-600">
            {searchQuery ? (
              <>
                Found {filteredUsers.length} result{filteredUsers.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                {filteredUsers.length > 0 && (
                  <>
                    {" "}
                    • Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                  </>
                )}
              </>
            ) : (
              <>
                Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
                professionals
              </>
            )}
          </p>
        </div>
      )}

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">No results found</p>
          <p className="text-gray-400">Try adjusting your search terms or clear the search to see all users.</p>
          <Button onClick={clearSearch} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Clear Search
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  )
}
