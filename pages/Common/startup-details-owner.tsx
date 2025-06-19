"use client";

import { useEffect, useState } from "react";
import {
  Edit,
  MapPin,
  Globe,
  Trash2,
  // Play,
  BarChart3,
  ExternalLink,
  Star,
  ArrowUpRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";

// Shared components and data
import {
  // projectData,
  // recommendedInvestors,
  ALL_PROJECTS,
  // type Project,
  // type Investor,
  INDUSTRIES,
} from "@/constants";
import { User, useStartupStore } from "@/store/startupStore";
import { useSession } from "next-auth/react";
import { useDashboardStore } from "@/store/dashboardStore";
import { Startup } from "@/components/Entrepreneur/project-grid";

// StatsCards Component
const StatsCards = ({ startup }: { startup: any }) => {
  const { earnings } = useDashboardStore();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsData = [
    {
      id: "funding",
      title: "Total Raised",
      value: formatCurrency(
        (earnings?.total_crowdfunding ?? 0) + (earnings?.total_investment ?? 0)
      ),
      icon: "dollar",
      change: { trend: "up" as const, value: "+12%", text: "from last month" },
    },
    {
      id: "rating",
      title: "Founder Rating",
      value: startup.founder?.rating?.toString() || "0",
      icon: "star",
      rating: startup.founder?.rating || 0,
      change: { trend: "neutral" as const, value: "", text: "" },
    },
  ];
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "dollar":
        return <DollarSign className="w-6 h-6 text-white" />;
      case "trending":
        return <TrendingUp className="w-6 h-6 text-white" />;
      case "star":
        return <Star className="w-6 h-6 text-white" />;
      default:
        return <DollarSign className="w-6 h-6 text-white" />;
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-500 fill-current"
          />
        ))}
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
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const renderChangeIndicator = (
    change: { trend: string; value: string; text: string },
    isRating: boolean
  ) => {
    if (isRating) return null;

    return (
      <p
        className={`text-sm flex items-center mt-1 ${
          change.trend === "up"
            ? "text-green-600"
            : change.trend === "down"
            ? "text-red-600"
            : "text-gray-600"
        }`}
      >
        {change.trend === "up" ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : change.trend === "down" ? (
          <ArrowUpRight className="w-4 h-4 mr-1 rotate-180" />
        ) : null}
        {change.value} {change.text}
      </p>
    );
  };

  const getCardColor = (index: number) => {
    if (index === 1) {
      return "bg-green-50 border-0 shadow-lg hover:shadow-xl transition-shadow";
    }
    return "bg-blue-50 border-0 shadow-lg hover:shadow-xl transition-shadow";
  };

  const getIconColor = (index: number) => {
    if (index === 1) {
      return "bg-green-500 p-3 rounded-full";
    }
    return "bg-blue-500 p-3 rounded-full";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <Card key={stat.id} className={getCardColor(index)}>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {stat.id === "rating" && stat.rating ? (
                  <div className="mt-1">
                    <StarRating rating={stat.rating} />
                  </div>
                ) : (
                  renderChangeIndicator(stat.change, stat.id === "rating")
                )}
              </div>
              <div className={getIconColor(index)}>{renderIcon(stat.icon)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// ProjectsGrid Component
const ProjectsGrid = ({ startups }: { startups: Startup[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(ALL_PROJECTS.length / projectsPerPage);
  const { data: session } = useSession();
  let role = session?.user?.role || "entrepreneur";
  if (role === "startup") {
    role = "entrepreneur";
  } else {
    role = "investor";
  }

  const getCurrentProjects = () => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return startups.slice(startIndex, endIndex);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Similar Startups
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.map((project: Startup) => (
            <Link
              href={`/${role}/startup-detail/${project.id}`}
              key={project.id}
              className="block"
            >
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={project.logo_url || "/placeholder.jpg"}
                    alt={project.startup_name}
                    width={40}
                    height={40}
                    className="rounded-lg bg-gray-100 p-1"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">
                      {project.startup_name}
                    </h4>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">
                      {INDUSTRIES[project.industry]}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                      {project.funding_goal}
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
                  <p className="text-xs text-gray-500 group-hover:text-blue-600">
                    {project.progress}% funded
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// InvestorCard Component
interface InvestorCardProps {
  user: User;
}

const InvestorCard = ({ user }: InvestorCardProps) => {
  const userTypeConfig = {
    Investor: {
      bgGradient: "from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
      icon: TrendingUp,
      iconColor: "text-teal-600",
      badgeClasses: "bg-teal-100 text-teal-800 hover:bg-teal-100",
    },
  };

  const config = userTypeConfig.Investor;
  const IconComponent = config.icon;

  const UserStarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <Link href={`/profile/${user.id}`} className="block">
      <div
        className={`relative overflow-hidden rounded-lg border ${config.borderColor} bg-gradient-to-br ${config.bgGradient} p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`}
      >
        <div className="flex justify-end mb-2">
          <Badge className={`gap-1 text-xs ${config.badgeClasses}`}>
            <IconComponent className={`h-3 w-3 ${config.iconColor}`} />
            {user.role}
          </Badge>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Image
              src={user.profile_picture_url || "/placeholder.svg"}
              alt={user.first_name[0]}
              width={48}
              height={48}
              className="rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
              {user.first_name + " " + user.last_name}
            </h3>
            <UserStarRating rating={user.rating} />
          </div>
        </div>

        <div className="flex justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-3 w-3 flex-shrink-0" />
          </div>

          {user.role === "investor" && (
            <div className="flex items-center gap-1 text-gray-600">
              <TrendingUp className="h-3 w-3 flex-shrink-0" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// RecommendedInvestorsGrid Component
const RecommendedInvestorsGrid = () => {
  const { recommendedInvestors, fetchRecommendedInvestors } =
    useDashboardStore();
  const { data: session } = useSession();
  const { startup } = useStartupStore();
  const [currentPage, setCurrentPage] = useState(1);
  const investorsPerPage = 3;
  const totalPages = Math.ceil(recommendedInvestors.length / investorsPerPage);

  useEffect(() => {
    if (session?.accessToken && startup?.id) {
      fetchRecommendedInvestors(session.accessToken, startup.id);
    }
  }, [session?.accessToken, startup?.id, fetchRecommendedInvestors]);

  const getCurrentInvestors = () => {
    const startIndex = (currentPage - 1) * investorsPerPage;
    const endIndex = startIndex + investorsPerPage;
    return recommendedInvestors.slice(startIndex, endIndex);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (!recommendedInvestors.length) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          Recommended Investors
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getCurrentInvestors().map((investor) =>
          investor.user ? (
            <InvestorCard key={investor.id} user={investor.user} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default function StartupDetailsOwner({
  startupId,
}: {
  startupId: string;
}) {
  const { data: session } = useSession();
  const { startup, loading, user } = useStartupStore();
  const { earnings, fetchAll, fetchRecommendedStartups, recommendedStartups } =
    useDashboardStore();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sentimentScore, setSentimentScore] = useState<{
    score: number;
    sentiment: "positive" | "negative" | "neutral";
  } | null>(null);

  const [showSentimentDialog, setShowSentimentDialog] = useState(false);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState<{
    overall: string;
    score: number;
  } | null>(null);

  const handleSentimentClick = async () => {
    setShowSentimentDialog(true);
    setSentimentLoading(true);
    setSentimentResult(null);
    try {
      const res = await fetch(
        "https://sentiment-api-x718.onrender.com/sentiment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "Artificial Intelligence" }),
        }
      );
      if (!res.ok) throw new Error("Failed to fetch sentiment");
      const data = await res.json();
      setSentimentResult({
        overall: data.sentiments.overall,
        score: data.sentiments.score,
      });
    } catch (e) {
      setSentimentResult(null);
    } finally {
      setSentimentLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchAll(session.accessToken);
      fetchRecommendedStartups(session.accessToken);
    }
  }, [session?.accessToken]);

  const fundingProgress =
    ((startup?.amount_raised || 0) / (startup?.funding_goal ?? 1)) * 100;

  const handleSentimentAnalysis = async () => {
    setSentimentLoading(true);
    setShowSentimentDialog(true);

    setTimeout(() => {
      setSentimentScore({
        score: 78,
        sentiment: "positive",
      });
      setSentimentLoading(false);
    }, 2000);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100";
      case "negative":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    console.log(loading, startup, startupId);
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Startup not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
              <div className="flex-shrink-0 self-center sm:self-start">
                <Image
                  src={startup.logo_url || "/placeholder.jpg"}
                  alt={startup.startup_name}
                  width={100}
                  height={100}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-md object-cover border-4 border-white mx-auto sm:mx-0"
                />
              </div>

              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {startup.startup_name}
                    </h1>

                    <div className="flex gap-2 justify-center sm:justify-start">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSentimentAnalysis}
                        className="border-blue-200 hover:bg-blue-50 text-blue-700 text-xs px-2 py-1"
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Sentiment
                      </Button>
                    </div>
                  </div>

                  <p className="text-lg text-blue-600 font-medium mb-3">
                    {startup.startup_name}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm">
                      {INDUSTRIES[startup.industry]}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 justify-center sm:justify-start">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <a
                        href={startup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:w-48">
              <div className="flex gap-2 justify-center lg:justify-end">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="p-2"
                  title="Delete Startup"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Funding Progress
              </h3>
              <div className="text-left sm:text-right">
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatCurrency(startup.amount_raised)}
                </p>
                <p className="text-sm text-gray-600">
                  of {formatCurrency(startup.funding_goal)} goal
                </p>
              </div>
            </div>
            <Progress value={fundingProgress} className="h-3 mb-4" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 md:mb-8">
          <StatsCards startup={startup} />
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8 w-full">
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <div>
              <Card className="shadow-lg bg-white h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    About This Startup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {startup.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Current Stage
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {startup.funding_stage}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Business Model
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {startup.business_model}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Funding Goal
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(startup.funding_goal)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Amount Raised
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatCurrency(
                            (earnings?.total_crowdfunding ?? 0) +
                              (earnings?.total_investment ?? 0)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* {sentimentScore && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                      Sentiment Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center px-4 py-2 rounded-full ${getSentimentColor(
                          sentimentScore.sentiment
                        )}`}
                      >
                        <span className="font-semibold capitalize">
                          {sentimentScore.sentiment}
                        </span>
                      </div>
                      <p className="text-3xl font-bold mt-4">
                        {sentimentScore.score}%
                      </p>
                      <p className="text-gray-600 text-sm">
                        Overall sentiment score
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )} */}

          {/* Analytics Section - Owner has full access */}
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Investment Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {formatCurrency(earnings?.total_investment || 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total Investments</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {formatCurrency(earnings?.total_crowdfunding || 0)}
                  </p>
                  <p className="text-sm text-gray-600">Crowdfunds Raised</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      (earnings?.total_crowdfunding ?? 0) +
                        (earnings?.total_investment ?? 0)
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Private Investments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects */}
          <ProjectsGrid startups={recommendedStartups.slice(0, 3)} />

          {/* Recommended Investors - Only for owners */}
          <RecommendedInvestorsGrid />
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Startup</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this startup? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Delete Startup
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Sentiment Analysis Dialog */}
        <Dialog
          open={showSentimentDialog}
          onOpenChange={setShowSentimentDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sentiment Analysis</DialogTitle>
              <DialogDescription>
                Analyzing public sentiment about this startup...
              </DialogDescription>
            </DialogHeader>
            <div className="py-8">
              {sentimentLoading ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing sentiment...</p>
                </div>
              ) : sentimentScore ? (
                <div className="text-center">
                  <div
                    className={`inline-flex items-center px-6 py-3 rounded-full ${getSentimentColor(
                      sentimentScore.sentiment
                    )}`}
                  >
                    <span className="font-semibold text-lg capitalize">
                      {sentimentScore.sentiment}
                    </span>
                  </div>
                  <p className="text-4xl font-bold mt-4">
                    {sentimentScore.score}%
                  </p>
                  <p className="text-gray-600">Overall sentiment score</p>
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSentimentDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
