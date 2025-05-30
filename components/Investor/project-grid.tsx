import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PROJECTS_GRID } from "@/constants";
import Link from "next/link";
import Image from 'next/image';

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
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                        src={project.image || "/placeholder.jpg"}
                        alt={project.name}
                        width={40} // 10 * 4 = 40px (w-10 equivalent)
                        height={40} // 10 * 4 = 40px (h-10 equivalent)
                        className="rounded-lg bg-white p-1"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      <p className="text-xs text-gray-600">{project.category}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{project.funding}</span>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-xs text-gray-500">{project.progress}% funded</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  
 export default ProjectsGrid; 