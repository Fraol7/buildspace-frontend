"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  // ArrowUpRight,
  BaggageClaim,
  DollarSign,
  Star,
  TrendingUp,
} from "lucide-react";
// import Link from "next/link";
import { useEffect } from "react";
import { StatCard } from "@/constants";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";

// Component to render the star rating
export const StarRating = ({ rating }: { rating: number }) => {
  // Calculate the number of full and partial stars
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-500 fill-current"
        />
      ))}

      {/* Partial star */}
      {partialStar > 0 && (
        <div className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

// interface StatsCardsProps {
//   stats?: StatCard[];
// }

const StatsCards = () => {
  const { myStartups, earnings, userProfile, loading, fetchAll } =
    useDashboardStore();
  const { data: session } = useSession();

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (accessToken) {
      fetchAll(accessToken);
    }
  }, [fetchAll, session?.accessToken]);

  const totalStartups = Array.isArray(myStartups) ? myStartups.length : 0;
  const totalEarnings =
    (earnings?.total_investment || 0) + (earnings?.total_crowdfunding || 0);
  const rating = userProfile?.rating || 0;

  const statsData: StatCard[] = [
    {
      id: "startups",
      title: "Total Startups",
      value: totalStartups,
      icon: "dollar",
      link: "/startups",
    },
    {
      id: "earnings",
      title: "Total Earnings",
      value: `$${Number(totalEarnings).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: "trending",
      link: "/earnings",
    },
    {
      id: "rating",
      title: "Rating",
      value: `${rating}`,
      icon: "star",
      link: "/ratings",
      rating: rating,
    },
  ];

  // Function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "dollar":
        return <BaggageClaim className="w-6 h-6 text-white" />;
      case "trending":
        return <TrendingUp className="w-6 h-6 text-white" />;
      case "star":
        return <Star className="w-6 h-6 text-white" />;
      default:
        return <DollarSign className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading
        ? // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={`skeleton-${i}`}
              className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div className="animate-pulse flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="bg-blue-300 p-3 rounded-full">
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        : statsData.map((stat) => (
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>

                    {stat.id === "rating" && stat.rating !== null ? (
                      <div className="mt-1">
                        <StarRating rating={stat.rating || 0} />
                      </div>
                    ) : null}
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full">
                    {renderIcon(stat.icon)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
};

export default StatsCards;
