"use client";

import { useEffect, useState } from "react";
import {
  Edit3,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  X,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Campaign,
  FundraisingHistoryPoint,
  useCampaignStore,
} from "@/store/campaignStore";

export default function CampaignOwnerDashboard() {
  const params = useParams();
  const campaignId = params?.id as string;
  const { data: session } = useSession();
  const { getCampaignById, getStartupEarnings, loading, editCampaign } =
    useCampaignStore();
  const [campaignData, setCampaignData] = useState<Campaign | null>(null);

  const [fundraisingHistory, setFundraisingHistory] = useState<
    FundraisingHistoryPoint[]
  >([]);
  const [earningsLoading, setEarningsLoading] = useState(false);

  // For edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTargetAmount, setEditedTargetAmount] = useState(0);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (campaignId && session?.accessToken) {
        const campaign = await getCampaignById(campaignId, session.accessToken);
        if (campaign) {
          setCampaignData(campaign);
          setEditedTitle(campaign.title);
          setEditedDescription(campaign.description);
          setEditedTargetAmount(campaign.target_amount);
        }
      }
    };
    fetchCampaign();
  }, [campaignId, session?.accessToken]);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (session?.accessToken) {
        setEarningsLoading(true);
        const earnings = await getStartupEarnings(
          campaignId,
          session.accessToken
        );
        setFundraisingHistory(earnings.slice(-7)); // Last 7 days
        setEarningsLoading(false);
      }
    };
    fetchEarnings();
  }, [campaignData?.startup_id, session?.accessToken]);

  if (loading || !campaignData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg text-gray-600">Loading campaign...</span>
      </div>
    );
  }

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

  const getDaysRemaining = () => {
    const endDate = new Date(campaignData.end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSaveChanges = async () => {
    if (!campaignData || !session?.accessToken) return;
    const payload = {
      id: campaignData.id,
      title: editedTitle,
      description: editedDescription,
      target_amount: editedTargetAmount,
    };
    const updated = await editCampaign(payload, session.accessToken);
    if (updated) {
      setCampaignData(updated);
      setShowEditModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  // Calculate the maximum amount for the fundraising chart
  const maxAmount = Math.max(...fundraisingHistory.map((day) => day.amount));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <CheckCircle className="w-5 h-5" />
            <span>Campaign updated successfully!</span>
            <Button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Header - Enlarged */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {campaignData.title}
                </h1>
                <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 mt-1">
                  {campaignData.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Edit3 className="w-4 h-4" />
                  Edit Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-black">
                    Edit Campaign
                  </DialogTitle>
                  <DialogDescription>
                    Update your campaign details and information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Campaign Title
                    </Label>
                    <Input
                      id="title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Campaign Description
                    </Label>
                    <Textarea
                      id="description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows={4}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="target"
                      className="text-sm font-medium text-gray-700"
                    >
                      Target Amount
                    </Label>
                    <Input
                      id="target"
                      type="number"
                      value={editedTargetAmount}
                      onChange={(e) =>
                        setEditedTargetAmount(Number(e.target.value))
                      }
                      className="border-gray-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Start Date
                      </Label>
                      <Input
                        value={formatDate(campaignData.start_date)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        End Date
                      </Label>
                      <Input
                        value={formatDate(campaignData.end_date)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Campaign Description */}
          <Card className="shadow-none border-0 bg-gradient-to-br from-white to-blue-50/30">
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {campaignData.description}
              </p>
            </CardContent>
          </Card>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Raised
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(campaignData.amount_raised)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.round(
                        getProgressPercentage(
                          campaignData.amount_raised,
                          campaignData.target_amount
                        )
                      )}
                      % of goal
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Backers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {campaignData.total_funders}
                    </p>
                    {/* <p className="text-xs text-gray-500">
                      Avg: {formatCurrency(campaignData.averageInvestment)}
                    </p> */}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Days Remaining
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {getDaysRemaining()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Ends {formatDate(campaignData.end_date)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Progress and Description */}
          <div className="grid grid-cols-1 gap-6 my-2">
            {/* Campaign Progress */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <CardTitle className="text-xl text-black flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Campaign Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-900">
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
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>
                      {Math.round(
                        getProgressPercentage(
                          campaignData.amount_raised,
                          campaignData.target_amount
                        )
                      )}
                      % funded
                    </span>
                    <span>{getDaysRemaining()} days to go</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Campaign Details
                  </h3>
                  <div className="space-y-2 text-sm">
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Investment</span>
                      <span className="text-gray-900">
                        {formatCurrency(campaignData.minimum_investment)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-gray-600">Categories</span>
                      <span className="text-gray-900">
                        {campaignData.ca.join(", ")}
                      </span>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Fundraising History Chart */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <CardTitle className="text-xl text-black flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Fundraising History (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="h-80 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                  {fundraisingHistory.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No fundraising data available.
                    </div>
                  ) : (
                    <>
                      {/* Y-axis labels */}
                      <div className="absolute left-2 top-6 bottom-16 flex flex-col justify-between text-xs text-gray-500">
                        <span>{formatCurrency(maxAmount)}</span>
                        <span>{formatCurrency(maxAmount * 0.75)}</span>
                        <span>{formatCurrency(maxAmount * 0.5)}</span>
                        <span>{formatCurrency(maxAmount * 0.25)}</span>
                        <span>$0</span>
                      </div>
                      {/* Chart Area */}
                      <div className="ml-16 mr-4 h-64 relative">
                        {/* ...SVG and chart code as before... */}
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          {/* Area fill */}
                          <defs>
                            <linearGradient
                              id="areaGradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(59, 130, 246)"
                                stopOpacity="0.3"
                              />
                              <stop
                                offset="100%"
                                stopColor="rgb(59, 130, 246)"
                                stopOpacity="0.05"
                              />
                            </linearGradient>
                          </defs>
                          {/* Create path for area */}
                          <path
                            d={`M 0 ${
                              100 -
                              (fundraisingHistory[0].amount / maxAmount) * 100
                            } ${fundraisingHistory
                              .map(
                                (day, index) =>
                                  `L ${
                                    (index / (fundraisingHistory.length - 1)) *
                                    100
                                  } ${100 - (day.amount / maxAmount) * 100}`
                              )
                              .join(" ")} L 100 100 L 0 100 Z`}
                            fill="url(#areaGradient)"
                          />
                          {/* Line */}
                          <path
                            d={`M 0 ${
                              100 -
                              (fundraisingHistory[0].amount / maxAmount) * 100
                            } ${fundraisingHistory
                              .map(
                                (day, index) =>
                                  `L ${
                                    (index / (fundraisingHistory.length - 1)) *
                                    100
                                  } ${100 - (day.amount / maxAmount) * 100}`
                              )
                              .join(" ")}`}
                            fill="none"
                            stroke="rgb(59, 130, 246)"
                            strokeWidth="0.5"
                            className="drop-shadow-sm"
                          />
                          {/* Data points */}
                          {fundraisingHistory.map((day, index) => (
                            <circle
                              key={index}
                              cx={
                                (index / (fundraisingHistory.length - 1)) * 100
                              }
                              cy={100 - (day.amount / maxAmount) * 100}
                              r="1"
                              fill="rgb(59, 130, 246)"
                              className="drop-shadow-sm"
                            />
                          ))}
                        </svg>
                        {/* Data point tooltips */}
                        <div className="absolute inset-0">
                          {fundraisingHistory.map((day, index) => (
                            <div
                              key={index}
                              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                              style={{
                                left: `${
                                  (index / (fundraisingHistory.length - 1)) *
                                  100
                                }%`,
                                top: `${100 - (day.amount / maxAmount) * 100}%`,
                              }}
                            >
                              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {formatCurrency(day.amount)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* X-axis labels */}
                      <div className="ml-16 mr-4 flex justify-between text-xs text-gray-600 mt-2">
                        {fundraisingHistory.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="font-medium">{day.day}</div>
                            <div className="text-gray-500">
                              {day.date.split(" ")[1]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(
                        fundraisingHistory.reduce(
                          (sum, day) => sum + day.amount,
                          0
                        )
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Raised (7 days)
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {fundraisingHistory.length > 0
                        ? formatCurrency(
                            fundraisingHistory.reduce(
                              (sum, day) => sum + day.amount,
                              0
                            ) / fundraisingHistory.length
                          )
                        : formatCurrency(0)}
                    </div>
                    <div className="text-sm text-gray-600">Daily Average</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {fundraisingHistory.length > 0
                        ? formatCurrency(
                            Math.max(
                              ...fundraisingHistory.map((day) => day.amount)
                            )
                          )
                        : formatCurrency(0)}
                    </div>
                    <div className="text-sm text-gray-600">Best Day</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
