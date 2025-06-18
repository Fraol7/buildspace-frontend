"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import PaymentPopup from "@/pages/Common/payment-popup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCampaignStore } from "@/store/campaignStore";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 6;

export default function InvestorCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { data: session } = useSession();
  const { investedCampaigns, fetchMyInvestedCampaigns, loading, fundCampaign } =
    useCampaignStore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.accessToken) {
      fetchMyInvestedCampaigns(session.accessToken);
    }
  }, [session?.accessToken, fetchMyInvestedCampaigns]);

  const totalPages = Math.ceil(investedCampaigns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const fundedCampaigns = investedCampaigns.slice(
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
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-blue-100 text-blue-600 border-blue-200";
  };

  const totalInvested = investedCampaigns.reduce(
    (sum, campaign) => sum + (campaign.my_invested_amount || 0),
    0
  );
  const activeCampaigns = investedCampaigns.filter((c) => c.is_active).length;

  const handleCampaignClick = (campaignId: string) => {
    // Dummy navigation to campaign details
    console.log(`Navigating to campaign details: ${campaignId}`);
    // In real app: router.push(`/campaigns/${campaignId}`)
  };

  const handleInvestMore = async (campaignId: string, amount: number) => {
    if (!session?.accessToken) {
      toast({
        title: "Please login to invest",
        variant: "destructive",
      });
      return;
    }
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const redirect_url = `${baseUrl}${pathname}`;
    const result = await fundCampaign(
      { campaign_id: campaignId, amount: amount.toString(), redirect_url },
      session.accessToken
    );
    if (result.payment_url) {
      window.location.href = result.payment_url;
    } else {
      toast({
        title: "Payment Error",
        description: result.error || "Could not initiate payment.",
        variant: "destructive",
      });
    }
  };

  const handleFounderClick = (founderName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Dummy navigation to founder profile
    console.log(`Navigating to founder profile: ${founderName}`);
    // In real app: router.push(`/founders/${founderName}`)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="animate-spin text-blue-500 w-12 h-12 mb-4" />
        <p className="text-lg text-gray-700 font-medium">
          Loading your contributions...
        </p>
      </div>
    );
  }

  if (investedCampaigns.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white md:m-4 rounded-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">My contributions</h1>
            <p className="text-gray-600 mt-2">
              Track campaigns you&apos;ve supported
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <DollarSign className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No contributions yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md">
                {
                  "You haven't invested in any campaigns yet. Explore campaigns to start supporting innovative startups."
                }
              </p>
              <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Target className="w-5 h-5 mr-2" />
                Explore Campaigns
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:m-4 rounded-lg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My contributions</h1>
            <p className="text-gray-600 mt-2">
              Track campaigns you&apos;ve supported and their progress
            </p>
          </div>
          <Link href="/investor/explore-campaigns">
            <Button className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Target className="w-5 h-5 mr-2" />
              Explore More Campaigns
            </Button>
          </Link>
        </div>

        {/* Investment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">
                    Total Invested
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {formatCurrency(totalInvested)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <Target className="w-6 h-6 text-gray-100" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">
                    Campaigns Backed
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {investedCampaigns.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-200 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-black/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-sm font-medium">
                    Active contributions
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {activeCampaigns}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funded Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {fundedCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className={`bg-gradient-to-b from-blue-50 to-blue-50 border border-blue-200 shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer ${
                hoveredCard === campaign.id
                  ? "scale-105 shadow-2xl"
                  : "hover:scale-102"
              }`}
              onMouseEnter={() => setHoveredCard(campaign.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCampaignClick(campaign.id)}
            >
              <CardHeader className="pb-4 relative">
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`${getStatusColor(
                      campaign.is_active ? "Active" : "Inactive"
                    )} border font-medium px-3 py-1 rounded-full`}
                  >
                    {campaign.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1 pr-16">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {campaign.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Campaign Title */}
                <h3 className="text-lg font-semibold text-gray-900 my-2">
                  {campaign.title}
                </h3>

                {/* My Investment Highlight */}
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-2 mb-6 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium text-gray-600">
                        Your Investment
                      </p>
                      <p className="text-xl font-bold text-blue-700">
                        {formatCurrency(campaign.my_invested_amount)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-b from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">
                      Campaign Progress
                    </span>
                    <span className="text-sm font-bold text-green-500">
                      {Math.round(
                        getProgressPercentage(
                          campaign.amount_raised,
                          campaign.target_amount
                        )
                      )}
                      %
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-200 to-green-300 rounded-full"
                      style={{
                        width: `${getProgressPercentage(
                          campaign.amount_raised,
                          campaign.target_amount
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="font-bold text-green-500 text-lg">
                      {formatCurrency(campaign.amount_raised)} raised
                    </span>
                    <span className="text-gray-500 font-medium">
                      of {formatCurrency(campaign.target_amount)}
                    </span>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">
                      {campaign.total_funders} backers
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">
                      Ends {formatDate(campaign.end_date)}
                    </span>
                  </div>
                </div>

                {/* Founder Profile & Action Buttons */}
                <div className="flex justify-between items-center">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                    onClick={(e) =>
                      handleFounderClick(campaign.founder_name, e)
                    }
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={"/placeholder.jpg"}
                        alt={campaign.founder_name}
                      />
                      <AvatarFallback className="bg-blue-200 text-blue-700">
                        {campaign.founder_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {campaign.founder_name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {campaign.founder_rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {campaign.is_active && (
                      <PaymentPopup
                        campaignTitle={campaign.title}
                        amount={campaign.minimum_investment}
                        buttonLabel="Invest More"
                        onPaymentSuccess={async (amount) => {
                          await handleInvestMore(campaign.id, amount);
                        }}
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Invest More
                        </Button>
                      </PaymentPopup>
                    )}
                  </div>
                </div>

                {/* Click to view hint */}
                {/* <div className="text-center mt-4">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    Click to view details
                  </p>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                }
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
