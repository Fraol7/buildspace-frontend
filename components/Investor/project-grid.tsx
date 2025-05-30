import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PROJECTS_GRID } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const ProjectsGrid = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS_GRID.map((project) => (
            <Link href="/" key={project.id} className="block">
              <div className="bg-gradient-to-br from-indigo-200 to-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                {/* Project Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={project.image || "/placeholder.jpg"}
                    alt={project.name}
                    width={40}
                    height={40}
                    className="rounded-lg bg-gray-100 p-1"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-xs text-gray-600">{project.category}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{project.funding}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
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
                        : "bg-purple-300"
                    }`}
                  />
                  <p className="text-xs text-gray-500">{project.progress}% funded</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsGrid;
