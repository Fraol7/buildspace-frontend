import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PROJECTS_GRID, INDUSTRIES } from "@/constants";
import { useDashboardStore } from "@/store/dashboardStore";

export type Startup = {
  id: string;
  startup_name: string;
  logo_url: string;
  industry: number;
  funding_stage: string;
  funding_goal: number;
  amount_raised: number;
  status: string;
  progress: number;
  location: string;
  category?: string;
};

const ProjectsGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data: session } = useSession();
  const { investorStartups, fetchInvestorStartups, loading, error } = useDashboardStore();

  // Calculate pagination
  const totalPages = Math.ceil((investorStartups?.length || 0) / itemsPerPage);
  const currentItems = (investorStartups || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchInvestorStartups(session.accessToken);
    }
  }, [session?.accessToken, fetchInvestorStartups]);
  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recommended Startups</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading startups...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recommended Startups</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-2 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!investorStartups || investorStartups.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recommended Startups</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-600">No investment opportunities found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recommended Startups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((project) => {
              const progress = Math.min(Math.round((project.amount_raised / project.funding_goal) * 100), 100);
              const staticData = PROJECTS_GRID.find(p => p.id === project.id) || {};
              
              return (
                <Link href={`/startup/${project.id}`} key={project.id} className="block">
                 <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
                 {/* Project Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={project.logo_url || "/placeholder.jpg"}
                            alt={project.startup_name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{project.startup_name}</h3>
                        <p className="text-sm text-gray-500">{INDUSTRIES[project.industry] || 'Technology'}</p>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          ${project.amount_raised.toLocaleString()} raised
                        </span>
                        <span className="text-gray-500">
                          ${project.funding_goal.toLocaleString()} goal
                        </span>
                      </div>
                      
                      <Progress value={progress} className="h-2 bg-gray-100" />
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{progress}% funded</span>
                        <span className="capitalize">{project.funding_stage}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectsGrid
