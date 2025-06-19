"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, BarChart2, Star } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useInvestorDashboardStore } from "@/store/dashboardStore";

const StatsCards = () => {
  const { data: session } = useSession();
  const { stats, loading, fetchInvestorStats } = useInvestorDashboardStore();

  useEffect(() => {
    if (session?.accessToken) {
      fetchInvestorStats(session.accessToken);
    }
  }, [session?.accessToken, fetchInvestorStats]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-0 shadow-lg animate-pulse">
            <CardContent className="p-6">
              <div className="h-24 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Startups Backed Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Startups Backed</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.total_startups_backed || 0}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Invested Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Invested</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.total_invested ? formatCurrency(stats.total_invested) : '$0'}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Rating Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.user?.rating?.toFixed(1) || 'N/A'}/5
              </p>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(stats?.user?.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;