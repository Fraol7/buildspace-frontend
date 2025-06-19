import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { INDUSTRIES } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";

export type Startup = {
  id: string;
  user_id: string;
  startup_name: string;
  tag_line: string;
  logo_url: string;
  description: string;
  website: string;
  industry: number;
  funding_stage: string;
  funding_goal: number;
  amount_raised: number;
  business_model: string;
  revenue: number;
  location: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embedding: any; // or null, or a more specific type if known
  created_at: string;
  updated_at: string;
  status: string;
  progress: number;
};

const ITEMS_PER_PAGE = 6;

const ProjectsGrid = () => {
  const { recommendedStartups, fetchRecommendedStartups } =
    useDashboardStore();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recommendedStartups.length / ITEMS_PER_PAGE);
  const paginatedStartups = recommendedStartups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (accessToken) {
      fetchRecommendedStartups(accessToken);
    }
  }, [fetchRecommendedStartups, session?.accessToken]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recommended Startups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedStartups.map((project) => (
            <Link
              href={`/entrepreneur/startup-detail/${project.id}`}
              key={project.id}
              className="block"
            >
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
                {/* Project Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={project.logo_url}
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
                      <Badge
                        variant="outline"
                        className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                      >
                        {INDUSTRIES[project.industry]}
                      </Badge>
                    </p>
                  </div>
                </div>

                {/* Project Details */}
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

                  {/* Progress Bar */}
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

                {/* Founder/Investor Avatar with Rating */}
                {/* <div className="flex mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={project.avatar || "/placeholder.jpg?height=32&width=32"}
                      alt={project.founderName || "Founder"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-800 group-hover:text-blue-800">
                      {project.founderName || "Anonymous"}
                    </p>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(project.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1 group-hover:text-blue-600">
                        ({project.rating || "0.0"})
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              «
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show up to 5 page numbers, centered around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === pageNum 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ›
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              »
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsGrid;
