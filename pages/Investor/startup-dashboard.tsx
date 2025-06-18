"use client";

import type React from "react";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, PlusCircle, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StartupCard } from "@/components/Entrepreneur/startup-card";
import { INDUSTRIES } from "@/constants";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";
import { useStartupStore } from "@/store/startupStore";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 5;

export default function StartupDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedStartups, setSavedStartups] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const { myStartups, loading, fetchAll } = useDashboardStore();
  const { saveStartup } = useStartupStore();

  // 2. Fetch startups on mount (replace with your auth logic)
  useEffect(() => {
    const accessToken = session?.accessToken;
    if (accessToken) {
      fetchAll(accessToken);
    }
  }, [session, fetchAll]);
  useEffect(() => {
    console.log("my startups:", myStartups);
  }, [myStartups]);

  // Filter startups based on search query
  const filteredStartups = useMemo(() => {
    if (!searchQuery.trim()) {
      return myStartups;
    }

    const query = searchQuery.toLowerCase().trim();
    return myStartups.filter((startup) => {
      return (
        startup.startup_name.toLowerCase().includes(query) ||
        startup.description.toLowerCase().includes(query) ||
        startup.location.toLowerCase().includes(query) ||
        startup.funding_stage.toLowerCase().includes(query) ||
        // startup.entrepreneur.name.toLowerCase().includes(query) ||
        INDUSTRIES[startup.industry]
      );
    });
  }, [searchQuery, myStartups]);

  // Reset to first page when search changes
  const resetPageOnSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Calculate pagination based on filtered results
  const totalPages = Math.ceil(filteredStartups.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStartups = filteredStartups.slice(startIndex, endIndex);

  // Calculate metrics based on filtered results
  const totalRaised = filteredStartups.reduce(
    (sum, startup) => sum + startup.amount_raised,
    0
  );

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };
  const { toast } = useToast();

  const handleSave = async (startupId: string) => {
    if (!session?.accessToken) return;
    setSavedStartups((prev) => {
      const newSaved = new Set(prev);
      if (newSaved.has(startupId)) {
        newSaved.delete(startupId);
      } else {
        newSaved.add(startupId);
      }
      return newSaved;
    });

    const success = await saveStartup(startupId, session.accessToken);
    if (!success) {
      // Revert UI if API failed
      setSavedStartups((prev) => {
        const newSaved = new Set(prev);
        if (newSaved.has(startupId)) {
          newSaved.delete(startupId);
        } else {
          newSaved.add(startupId);
        }
        return newSaved;
      });
      // Optionally show error toast here
      toast({
        title: "Failed to save startup",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useMemo hook above
  };

  return (
    <div className="space-y-8 p-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sky-600 mb-1">
                  {searchQuery ? "Filtered" : "Total"} Startups
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredStartups.length}
                </p>
                {searchQuery && (
                  <p className="text-xs text-sky-500 mt-1">
                    of {myStartups.length} total
                  </p>
                )}
              </div>
              <Building2 className="h-8 w-8 text-sky-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">
                  {searchQuery ? "Filtered" : "Total"} Raised
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(totalRaised)}
                </p>
                {searchQuery && (
                  <p className="text-xs text-emerald-500 mt-1">
                    from {filteredStartups.length} startup
                    {filteredStartups.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Button */}
      <Card className="shadow-none border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search startups by name, location, or stage..."
                  className="pl-10 pr-4 py-3 w-full bg-gray-50 border-sky-100 focus-visible:ring-sky-500 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => resetPageOnSearch(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => resetPageOnSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Add Startup Button */}
            <Link href="./add-startup">
              <Button className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6 py-3">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a Startup
              </Button>
            </Link>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-sky-100">
            <div className="text-sm text-gray-600">
              {searchQuery ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-sky-600">
                    {filteredStartups.length}
                  </span>{" "}
                  startup
                  {filteredStartups.length !== 1 ? "s" : ""} matching &quot;
                  {searchQuery}&quot;
                  {filteredStartups.length > 0 && (
                    <>
                      {" "}
                      • Showing{" "}
                      <span className="font-semibold text-sky-600">
                        {startIndex + 1}-
                        {Math.min(endIndex, filteredStartups.length)}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-sky-600">
                    {startIndex + 1}-
                    {Math.min(endIndex, filteredStartups.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-sky-600">
                    {filteredStartups.length}
                  </span>{" "}
                  startups
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Startup Cards */}
      <div className="space-y-6">
        {currentStartups.length > 0 ? (
          currentStartups.map((startup, index) => (
            <div
              key={startup.id}
              className="animate-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StartupCard
                startup={startup}
                isSaved={savedStartups.has(startup.id)}
                onSave={handleSave}
              />
            </div>
          ))
        ) : (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No startups found
              </h3>
              <p className="text-gray-500 mb-4">
                No startups match your search for &quot;{searchQuery}&quot;. Try
                adjusting your search terms.
              </p>
              <Button
                variant="outline"
                onClick={() => resetPageOnSearch("")}
                className="border-sky-200 text-sky-600 hover:bg-sky-50"
              >
                Clear search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={`rounded-xl transition-all duration-200 ${
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-sky-100 hover:text-sky-700 hover:shadow-md"
                    }`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
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
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
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
    </div>
  );
}
