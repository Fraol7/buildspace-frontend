import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PROJECTS_GRID } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

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
  embedding: any; // or null, or a more specific type if known
  created_at: string;
  updated_at: string;
  status: string;
  progress: number;
};

const ProjectsGrid = () => {
  const [projects, setProjects] = useState<Startup[]>([]);

  useEffect(() => {
    fetch("/api/my-startups")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched projects for recommendation:", data);
        if (data && Array.isArray(data.result) && data.result.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.result.length);
          const randomId = data.result[randomIndex].id;
          console.log("Randomly selected id:", randomId);
          fetch(`/api/recommend-startups?startup_id=${randomId}`)
            .then((res) => res.json())
            .then((recommendData) => {
              if (recommendData && Array.isArray(recommendData.result)) {
                if (data.result) {
                  setProjects(
                    data.result.map((item: any) => {
                      const progress =
                        item.funding_goal > 0
                          ? Math.round(
                              (item.amount_raised / item.funding_goal) * 100
                            )
                          : 0;
                      return {
                        id: item.id,
                        user_id: item.user_id,
                        startup_name: item.startup_name,
                        tag_line: item.tag_line,
                        logo_url: item.logo_url,
                        description: item.description,
                        website: item.website,
                        industry: item.industry,
                        funding_stage: item.funding_stage,
                        funding_goal: item.funding_goal,
                        amount_raised: item.amount_raised,
                        business_model: item.business_model,
                        revenue: item.revenue,
                        location: item.location,
                        embedding: item.embedding,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
                        status:
                          item.amount_raised === 0
                            ? "New"
                            : item.amount_raised < item.funding_goal
                            ? "In Progress"
                            : "Completed",
                        progress,
                      };
                    })
                  );
                }
              }
            });
        }
      });
  }, []);
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recommended Startups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              href={`/entrepreneur/startup-detail/${project.id}`}
              key={project.id}
              className="block"
            >
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
                {/* Project Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={"/placeholder.jpg"}
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
                      {project.industry}
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
      </CardContent>
    </Card>
  );
};

export default ProjectsGrid;
