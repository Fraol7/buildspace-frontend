"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TrendingUp,
  TrendingDown,
  ExternalLink,
  BookOpen,
  BarChart3,
  Activity,
  Search,
  ChevronsUpDown,
  Check,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { industriesWithIcons as industries } from "@/constants";
import { useSentimentStore } from "@/store/sentimentStore";

// const getSentimentColor = (rating: string) => {
//   switch (rating) {
//     case "Good":
//       return "text-green-600"
//     case "Neutral":
//       return "text-yellow-600"
//     case "Bad":
//       return "text-red-600"
//     default:
//       return "text-gray-600"
//   }
// }

const getSentimentBg = (rating: string) => {
  switch (rating) {
    case "positive":
      return "bg-green-500 text-white";
    case "neutral":
      return "bg-yellow-400 text-gray-900";
    case "negative":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const getSentimentEmoji = (rating: string) => {
  switch (rating) {
    case "positive":
      return "😊";
    case "neutral":
      return "😐";
    case "negative":
      return "😟";
    default:
      return "🤔";
  }
};

const CircularProgress = ({
  value,
  size = 120,
  rating,
}: {
  value: number;
  size?: number;
  rating: "positive" | "neutral" | "negative";
}) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getColor = () => {
    switch (rating) {
      case "positive":
        return "#4CAF50"; // green
      case "neutral":
        return "#FFC107"; // yellow
      case "negative":
        return "#F44336"; // red
      default:
        return "#9CA3AF"; // gray
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{value}%</span>
      </div>
    </div>
  );
};

export default function Component() {
  const [selectedIndustry, setSelectedIndustry] = useState<
    (typeof industries)[0] | null
  >(null);
  const [showInsights, setShowInsights] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { loading, error, report, sentiment, sources, fetchSentiment, reset } =
    useSentimentStore();

  const filteredIndustries = useMemo(() => {
    return industries.filter((industry) =>
      industry.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const handleGenerateInsights = async () => {
    if (!selectedIndustry) return;
    setShowInsights(true);
    await fetchSentiment(selectedIndustry.name);
  };

  const handleSelectIndustry = (industry: (typeof industries)[0]) => {
    setSelectedIndustry(industry);
    setShowInsights(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 m-4 rounded-lg">
      {/* Header */}
      <div className="relative bg-gradient-to-r p-4 from-gray-100 to-blue-100 border-b border-blue-200 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-indigo-300/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 max-w-7xl flex items-center justify-evenly">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-200/80 text-blue-800 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-blue-300/50">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Live Market Data
            </div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Market Insights
              </h1>
            </div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Real-time sentiment analysis across key industries
            </p>
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">42 Industries</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Live Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-lg backdrop-blur-sm border border-blue-200/50 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">95% Accuracy</span>
              </div>
            </div>
          </div>
          <Image
            src="/images/market-insight.png"
            alt="Market Insights"
            width={350}
            height={350}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Selection */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Select Industry
            </h2>
            <p className="text-gray-600 mb-6">
              Search and select from 42 tracked industries to analyze market
              sentiment
            </p>
          </div>
          {/* Searchable Dropdown */}
          <div className="mb-6">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-12 text-left"
                >
                  {selectedIndustry ? (
                    <div className="flex items-center gap-2">
                      <selectedIndustry.icon className="w-4 h-4" />
                      {selectedIndustry.name}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Search className="w-4 h-4" />
                      Search industries...
                    </div>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search industries..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>No industry found.</CommandEmpty>
                    <CommandGroup>
                      {filteredIndustries.map((industry) => {
                        const Icon = industry.icon;
                        return (
                          <CommandItem
                            key={industry.id}
                            value={industry.name}
                            onSelect={() => {
                              handleSelectIndustry(industry);
                              setOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <Icon className="w-4 h-4" />
                              <span>{industry.name}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                selectedIndustry?.id === industry.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {/* Generate Insights Button */}
          {selectedIndustry && (
            <Button
              onClick={handleGenerateInsights}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={showInsights && !error && !loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Insights...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {showInsights && !error
                    ? "Insights Generated"
                    : "Generate Insights"}
                </>
              )}
            </Button>
          )}
        </div>

        {/* Error State */}
        {error && showInsights && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-4 rounded-lg text-center flex items-center gap-2 justify-center">
              {error}
            </div>
          </div>
        )}

        {/* Sentiment Analysis Section */}
        {selectedIndustry &&
          showInsights &&
          !loading &&
          !error &&
          sentiment && (
            <div className="animate-in slide-in-from-bottom-4 duration-700 space-y-8">
              {/* Sentiment Percentages */}
              <Card className="bg-white shadow-xl border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    {selectedIndustry.name} Sentiment Analysis
                  </CardTitle>
                  <CardDescription>
                    Market sentiment analysis results
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8">
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Circular Progress */}
                    <div className="flex flex-col items-center">
                      <CircularProgress
                        value={Math.round(sentiment.score * 100)}
                        size={150}
                        rating={sentiment.overall}
                      />
                      <p className="text-lg font-medium text-gray-700 mt-4">
                        Overall Sentiment
                      </p>
                      <div
                        className={`px-4 py-2 rounded-full text-lg font-bold mt-2 ${getSentimentBg(
                          sentiment.overall
                        )}`}
                      >
                        {getSentimentEmoji(sentiment.overall)}{" "}
                        {sentiment.overall.charAt(0).toUpperCase() +
                          sentiment.overall.slice(1)}
                      </div>
                    </div>
                    {/* Sentiment Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-2xl">
                      <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-600" />
                        <p className="text-lg font-semibold text-green-800 mb-1">
                          Positive Signals
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                          {Math.round(sentiment.probabilities.positive * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                        <Activity className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                        <p className="text-lg font-semibold text-yellow-800 mb-1">
                          Neutral
                        </p>
                        <p className="text-3xl font-bold text-yellow-600">
                          {Math.round(sentiment.probabilities.neutral * 100)}%
                        </p>
                      </div>
                      <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                        <TrendingDown className="w-8 h-8 mx-auto mb-3 text-red-600" />
                        <p className="text-lg font-semibold text-red-800 mb-1">
                          Negative Signals
                        </p>
                        <p className="text-3xl font-bold text-red-600">
                          {Math.round(sentiment.probabilities.negative * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Full Width Markdown Report */}
              <Card className="bg-white shadow-xl border-blue-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="w-6 h-6 text-green-600" />
                    Comprehensive Market Analysis Report
                  </CardTitle>
                  <CardDescription>
                    AI-generated insights and market analysis for{" "}
                    {selectedIndustry.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown>
                      {report || "*No report available.*"}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
              {/* Sources Section */}
              <Card className="bg-white shadow-xl border-blue-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    Sources & References
                  </CardTitle>
                  <CardDescription>
                    Articles and data sources used in this analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {sources && sources.length > 0 ? (
                      sources.map(([url, title], index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                              {title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="px-2 py-1 bg-white rounded text-xs font-medium border">
                                {(() => {
                                  try {
                                    return new URL(url).hostname.replace(
                                      "www.",
                                      ""
                                    );
                                  } catch {
                                    return "";
                                  }
                                })()}
                              </span>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                View Article
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center">
                        No sources available.
                      </div>
                    )}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Sources are automatically collected
                      from reputable financial and industry publications.
                      Analysis is based on sentiment extracted from these
                      articles and market data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        {/* Empty State */}
        {!selectedIndustry && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Analyze Market Sentiment
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              Select an industry from the dropdown above to generate
              comprehensive sentiment analysis and market insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
