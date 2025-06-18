"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UserCardGroup from "@/components/Investor/user-card-group"
import { sampleUsers } from "@/constants"

export default function Network() {
  const [filter, setFilter] = useState<"all" | "Entrepreneur" | "Investor">("all")

  const filteredUsers = filter === "all" ? sampleUsers : sampleUsers.filter((user) => user.role === filter)

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:mb-0">Professional Network</h1>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
              }
            >
              All
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("Entrepreneur")}
              className={
                filter === "Entrepreneur"
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
              }
            >
              Entrepreneurs
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("Investor")}
              className={
                filter === "Investor"
                  ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"
                  : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
              }
            >
              Investors
            </Button>
          </div>
        </div>

        <UserCardGroup users={filteredUsers} title={`${filter === "all" ? "All" : filter} Profiles`} usersPerPage={6} />
      </div>
    </main>
  )
}
