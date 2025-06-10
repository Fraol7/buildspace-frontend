import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PROJECTS_GRID } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

const ProjectsGrid = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recommended Startups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {PROJECTS_GRID.map((project) => (
            <Link href="/" key={project.id} className="block">
              <div className="bg-gradient-to-br from-blue-200 to-gray-50 rounded-lg p-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-300 hover:to-blue-100 group">
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
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-800">{project.name}</h4>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">{project.category}</p>
                  </div>
                </div>

                {/* Industry Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.industries?.map((industry, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-white/50 text-blue-700 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                      {project.funding}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs transition-colors ${project.status === "Completed"
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
                    className={`h-2 ${project.status === "Completed"
                      ? "bg-green-300"
                      : project.status === "In Progress"
                        ? "bg-blue-300"
                        : "bg-indigo-300"
                      }`}
                  />
                  <p className="text-xs text-gray-500 group-hover:text-blue-600">{project.progress}% funded</p>
                </div>

                {/* Founder/Investor Avatar with Rating */}
                <div className="flex items-center mt-4 pt-3 border-t border-gray-200 group-hover:border-blue-200">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectsGrid
