"use client";

import { useState, useEffect } from "react";
import PaymentPopup from "./payment-popup";

// type InvestmentTier = {
//   amount: number;
//   title: string;
//   perks: string[];
// };

// type CampaignData = {
//   id: string;
//   startup_id: string;
//   title: string;
//   logo: string;
//   coverImage: string;
//   description: string;
//   shortDescription: string;
//   targetAmount: number;
//   amountRaised: number;
//   minimumFunding: number;
//   endDate: string;
//   startDate: string;
//   status: string;
//   backers: number;
//   categories: string[];
//   founderName: string;
//   founderAvatar: string;
//   founderBio: string;
//   founderRating: number;
//   investmentTiers: InvestmentTier[];
// };

import {
  Star,
  Calendar,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import React from "react";
import Image from "next/image";
import { Campaign, useCampaignStore } from "@/store/campaignStore";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";

// First, define the component
const CampaignDetailsComponent = () => {
  // const [isBookmarked, setIsBookmarked] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const params = useParams();
  const id = params?.id as string;

  const { getCampaignById, loading, fundCampaign } = useCampaignStore();

  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);

    // Fetch campaign data
    const fetchCampaign = async () => {
      try {
        // Replace with your auth logic
        const accessToken = session?.accessToken || "";
        const data = await getCampaignById(id, accessToken);
        if (data) {
          setCampaign({
            ...data,
          });
        }
      } catch {}
    };

    if (id) fetchCampaign();

    // eslint-disable-next-line
  }, [id, getCampaignById]);

  useEffect(() => {
    console.log(campaign);
  }, [campaign]);

  // Don't render anything during SSR
  if (!isClient) {
    return null;
  }

  // Show loading state
  if (loading || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Use the campaign data from state
  // Use campaign with sampleCampaignData as fallback
  const currentCampaign = campaign;

  // Replace all campaignData references with currentCampaign
  const campaignData = currentCampaign;

  const formatCurrency = (amount: number | undefined) => {
    if (typeof amount !== "number") return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressPercentage = (
    raised: number | undefined,
    target: number | undefined
  ) => {
    if (typeof raised !== "number" || typeof target !== "number" || target <= 0)
      return 0;
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  const getDaysRemaining = () => {
    const endDate = new Date(campaignData.end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-700">{rating}</span>
        <div className="flex">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star
              key={`full-${i}`}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <div className="relative">
              <Star className="w-4 h-4 text-gray-300" />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
          ))}
        </div>
      </div>
    );
  };

  const pathname = usePathname();

  const handleInvest = async (campaignId: string, amount: number) => {
    if (!session?.accessToken) {
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
    }
  };

  // const handleGoBack = () => {
  //   console.log("Navigating back to campaigns list")
  //   // In a real app, this would navigate back to the campaigns list
  // }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        {/* <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Button>
        </div> */}

        {/* Campaign Header - Minimized */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-48">
          {/* Background with Logo */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/20"></div>
          </div>

          {/* Status Badge - Top Right */}
          <div className="absolute top-4 right-4 z-30">
            <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 px-3 py-1 text-sm font-medium">
              {campaignData.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center p-6 z-20">
            <div className="flex items-center gap-5">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {campaignData.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Description - Shortened */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  About This Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-base">
                  {campaignData.description}
                </p>
              </CardContent>
            </Card>

            {/* Campaign Stats - Moved up, yellow replaced with blue */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {Math.round(
                      getProgressPercentage(
                        campaignData.amount_raised,
                        campaignData.target_amount
                      )
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Funded</div>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {campaignData.backer_count}
                  </div>
                  <div className="text-sm text-gray-600">Backers</div>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {getDaysRemaining()}
                  </div>
                  <div className="text-sm text-gray-600">Days Left</div>
                </CardContent>
              </Card>
            </div>

            {/* Founder Information - Moved up */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Meet the Founder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                    <Image
                      src={campaignData.founder_avatar || "/placeholder.jpg"}
                      alt={campaignData.founder_name}
                      className="w-full h-full object-cover"
                      width={100} // Adjust width as per requirement
                      height={100} // Adjust height as per requirement
                      priority // Optional: Ensures critical images load faster
                      placeholder="blur" // Optional: Adds a low-quality blur placeholder
                      blurDataURL="/placeholder.jpg" // Optional: Base64-encoded placeholder for blur effect
                    />
                  </div>
                  <div className="flex-1">
                    <div className=" gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {campaignData.founder_name}
                      </h3>
                      {renderStarRating(campaignData.founder_rating)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Investment Info */}
          <div className="space-y-6">
            <Card className="sticky top-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-2xl text-black">
                  Campaign Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(campaignData.amount_raised)}
                    </span>
                    <span className="text-gray-500">
                      of {formatCurrency(campaignData.target_amount)} goal
                    </span>
                  </div>
                  <Progress
                    value={getProgressPercentage(
                      campaignData.amount_raised,
                      campaignData.target_amount
                    )}
                    className="h-3 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  {campaignData?.title &&
                    typeof campaignData?.minimum_investment === "number" && (
                      <PaymentPopup
                        campaignTitle={campaignData.title}
                        amount={campaignData.minimum_investment}
                        buttonLabel="Contribute Now"
                        onPaymentSuccess={async (amount) => {
                          await handleInvest(campaign.id, amount);
                        }}
                      />
                    )}

                  {/* Keep the existing dialog for reference, but it's now replaced by PaymentPopup */}
                  <Dialog
                    open={showInvestModal}
                    onOpenChange={setShowInvestModal}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-3 opacity-0 h-0 p-0 border-0 m-0">
                        Contribute Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-black">
                          Invest in {campaignData.title}
                        </DialogTitle>
                        <DialogDescription>
                          Choose your investment amount and tier
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Investment Amount
                          </label>
                          <Input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) =>
                              setInvestmentAmount(Number(e.target.value))
                            }
                            min={campaignData.minimum_investment}
                            className="border-gray-300"
                          />
                          <p className="text-xs text-gray-500">
                            Minimum investment:{" "}
                            {formatCurrency(campaignData.minimum_investment)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Investment Tiers
                          </label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setShowInvestModal(false)}
                          className="border-gray-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          // onClick={handleInvest}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          Confirm Investment
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Started</span>
                    <span className="text-gray-900">
                      {formatDate(campaignData.start_date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Ends</span>
                    <span className="text-gray-900">
                      {formatDate(campaignData.end_date)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsComponent;
