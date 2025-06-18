"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Users,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ExploreCampaign, useCampaignStore } from "@/store/campaignStore";

const ITEMS_PER_PAGE = 6;

export default function ExploreCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("Most Popular");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const [lastPage, setLastPage] = useState(false);
  const [previousCampaigns, setPreviousCampaigns] = useState<ExploreCampaign[]>(
    []
  );

  const { data: session } = useSession();
  const { allCampaigns, fetchAllCampaigns, loading, error } =
    useCampaignStore();

  useEffect(() => {
    if (session?.accessToken) {
      // For pagination, offset = (currentPage - 1) * ITEMS_PER_PAGE
      fetchAllCampaigns(
        session.accessToken,
        ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE
      ).then(() => {
        if (allCampaigns.length === 0 && currentPage > 1) {
          setLastPage(true);
          setCurrentPage((prev) => prev - 1);
          useCampaignStore.setState({ allCampaigns: previousCampaigns });
        } else {
          setLastPage(false);
          setPreviousCampaigns(allCampaigns);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setLastPage(false);
    }
  };

  useEffect(() => {
    console.log("All campaigns fetched:", allCampaigns);
  }, [allCampaigns]);

  // Filter and sort campaigns
  const filteredCampaigns = useMemo(() => {
    return allCampaigns.filter((campaign) => {
      const matchesSearch = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [allCampaigns, searchQuery, selectedCategory]);

  // Sort campaigns
  const sortedCampaigns = useMemo(() => {
    return [...filteredCampaigns].sort((a, b) => {
      if (sortOption === "Most Popular") {
        return (b.total_funders || 0) - (a.total_funders || 0);
      } else if (sortOption === "Ending Soon") {
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      } else if (sortOption === "Most Funded") {
        return (b.amount_raised || 0) - (a.amount_raised || 0);
      } else if (sortOption === "Newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });
  }, [filteredCampaigns, sortOption]);

  const totalPages = Math.ceil(sortedCampaigns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCampaigns = sortedCampaigns.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-gray-300";
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        <span className="text-xs font-medium text-gray-700">{rating}</span>
        <div className="flex">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`full-${i}`}
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
            />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <div className="relative">
              <Star className="w-3 h-3 text-gray-300" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
          ))}
        </div>
      </div>
    );
  };

  const handleCampaignClick = (campaignId: string) => {
    console.log(`Navigating to campaign details: ${campaignId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 md:m-4 rounded-lg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Explore Campaigns
          </h1>
          <p className="text-gray-600">
            Discover and support innovative startups and projects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <Filter size={16} />
                  {selectedCategory}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent> */}
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <TrendingUp size={16} />
                  {sortOption}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSortOption("Most Popular")}
                  className={
                    sortOption === "Most Popular"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }
                >
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Ending Soon")}
                  className={
                    sortOption === "Ending Soon"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }
                >
                  Ending Soon
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Most Funded")}
                  className={
                    sortOption === "Most Funded"
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }
                >
                  Most Funded
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("Newest")}
                  className={
                    sortOption === "Newest" ? "bg-blue-50 text-blue-600" : ""
                  }
                >
                  Newest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {lastPage && (
          <div className="text-center text-blue-600 font-semibold mb-4">
            You have reached the last page.
          </div>
        )}

        {/* Campaigns Table */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              Active Campaigns
              {selectedCategory !== "All Categories" &&
                ` in ${selectedCategory}`}
            </h2>
            <span className="text-gray-500 text-sm">
              {filteredCampaigns.length} campaigns found
            </span>
          </div>

          {paginatedCampaigns.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t find any campaigns matching your search
                criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
              <div className="min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <TableHead className="font-semibold text-gray-900">
                        Campaign
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Founder
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Progress
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        Backers
                      </TableHead>
                      <TableHead className="font-semibold text-gray-900">
                        End Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCampaigns.map((campaign) => (
                      <Link
                        href={`campaigns/${campaign.id}`}
                        key={campaign.id}
                        style={{ display: "contents" }}
                      >
                        <TableRow
                          key={campaign.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            hoveredRow === campaign.id
                              ? "bg-blue-100 shadow-lg scale-[1.02] border-blue-300"
                              : "bg-green-50 hover:bg-blue-50"
                          }`}
                          onMouseEnter={() => setHoveredRow(campaign.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onClick={() => handleCampaignClick(campaign.id)}
                        >
                          <TableCell className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 truncate mb-1">
                                  {campaign.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                                  {campaign.description}
                                </p>
                                {/* <div className="flex flex-wrap gap-1">
                                  {campaign.categories.map(
                                    (category, index) => (
                                      <Badge
                                        key={index}
                                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs"
                                      >
                                        {category}
                                      </Badge>
                                    )
                                  )}
                                </div> */}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={
                                    campaign.founder_avatar ||
                                    "/placeholder.jpg"
                                  }
                                  alt={campaign.founder_name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 text-xs">
                                  {campaign.founder_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {campaign.founder_name}
                                </p>
                                {renderStarRating(campaign.founder_rating)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-32">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                  {Math.round(
                                    getProgressPercentage(
                                      campaign.amount_raised,
                                      campaign.target_amount
                                    )
                                  )}
                                  %
                                </span>
                                <span className="text-xs text-gray-600">
                                  {formatCurrency(campaign.amount_raised)}
                                </span>
                              </div>
                              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                  style={{
                                    width: `${getProgressPercentage(
                                      campaign.amount_raised,
                                      campaign.target_amount
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                of {formatCurrency(campaign.target_amount)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-700">
                              <Users className="w-4 h-4 mr-1 text-blue-500" />
                              {campaign.total_funders}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-700">
                              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                              {formatDate(campaign.end_date)}
                            </div>
                          </TableCell>
                        </TableRow>
                      </Link>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCampaigns.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        : "border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={lastPage}
              className="border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
