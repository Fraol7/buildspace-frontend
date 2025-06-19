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

const StartupsSection = () => {
  const { myStartups, fetchAll } = useDashboardStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const { data: session } = useSession();

  let role = session?.user?.role || "entrepreneur";
  if (role === "startup") {
    role = "entrepreneur";
  } else {
    role = "investor";
  }

  useEffect(() => {
    // Replace with your actual accessToken logic
    const accessToken = session?.accessToken;
    if (!accessToken) {
      return;
    }
    fetchAll(accessToken);
    console.log("this my startup", myStartups);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= myStartups.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, myStartups.length - itemsPerPage)
        : Math.max(0, prevIndex - itemsPerPage)
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            My Startups
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="h-8 w-8 p-0"
              aria-label="Previous STARTUPS"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="h-8 w-8 p-0"
              aria-label="Next STARTUPS"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myStartups.map((startup) => (
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
      </CardContent>
    </Card>
  );
};

export default StartupsSection;
