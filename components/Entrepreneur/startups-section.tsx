import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INDUSTRIES } from "@/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Startup } from "./project-grid";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 2;

const StartupsSection = () => {
  const { myStartups, fetchAll } = useDashboardStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();
  
  const totalPages = Math.ceil(myStartups.length / ITEMS_PER_PAGE);
  const paginatedStartups = myStartups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  let role = session?.user?.role || "entrepreneur";
  if (role === "startup") {
    role = "entrepreneur";
  } else {
    role = "investor";
  }

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (!accessToken) {
      return;
    }
    fetchAll(accessToken);
  }, [session]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            My Startups
          </CardTitle>
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
                aria-label="First page"
              >
                «
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
                aria-label="Previous page"
              >
                ‹
              </Button>
              <span className="px-3 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
                aria-label="Next page"
              >
                ›
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
                aria-label="Last page"
              >
                »
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedStartups.map((startup) => (
            <Link
              href={`/${role}/startup-detail/${startup.id}`}
              key={startup.id}
              className="block"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={startup.logo_url || "/placeholder.jpg"}
                    alt={startup.startup_name}
                    width={72}
                    height={72}
                    className="rounded-lg bg-white p-2"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {startup.startup_name}
                    </h4>
                    <p className="text-sm text-gray-600">{startup.tag_line}</p>
                    <div className="flex flex-wrap justify-start gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="text-green-600 bg-white border-green-600"
                      >
                        {INDUSTRIES[startup.industry] || startup.industry}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    {startup.funding_stage}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount Raised</span>
                    <span className="text-sm font-medium">
                      {startup.amount_raised}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {myStartups.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No startups found. Create your first startup to get started!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StartupsSection;
