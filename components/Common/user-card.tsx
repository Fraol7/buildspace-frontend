import Image from "next/image"
import { Star, MapPin, Briefcase, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type UserRole = "Entrepreneur" | "Investor"

export interface User {
  id: string
  name: string
  photo: string
  rating: number
  badges: string[]
  bio: string
  address: string
  role: UserRole
  startupCount?: number // For entrepreneurs
  totalInvestment?: string // For investors (e.g., "$2.5M")
}

interface UserCardProps {
  user: User
}

const badgeColors = [
  "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "bg-teal-100 text-teal-800 hover:bg-teal-100",
  "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
]

const userTypeConfig = {
  Entrepreneur: {
    bgGradient: "from-blue-50 to-blue-50",
    borderColor: "border-blue-200",
    icon: Briefcase,
    iconColor: "text-blue-600",
    badgeClasses: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  Investor: {
    bgGradient: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200",
    icon: TrendingUp,
    iconColor: "text-teal-600",
    badgeClasses: "bg-teal-100 text-teal-800 hover:bg-teal-100",
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  )
}

export default function UserCard({ user }: UserCardProps) {
  const config = userTypeConfig[user.role]
  const IconComponent = config.icon

  return (
    <Link href={`/profile/${user.id}`} className="block">
      <div
        className={`relative overflow-hidden rounded-xl border ${config.borderColor} bg-gradient-to-br ${config.bgGradient} p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer`}
      >
        {/* User Type Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`gap-1 ${config.badgeClasses}`}>
            <IconComponent className={`h-3 w-3 ${config.iconColor}`} />
            {user.role}
          </Badge>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Image
              src={user.photo || "/placeholder.svg"}
              alt={`${user.name}'s profile`}
              width={80}
              height={80}
              className="rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate mb-2">{user.name}</h3>
            <StarRating rating={user.rating} />
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{user.bio}</p>

        {/* Address and Stats */}
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{user.address}</span>
          </div>

          {/* Role-specific stats */}
          {user.role === "Entrepreneur" && user.startupCount !== undefined && (
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">
                {user.startupCount} {user.startupCount === 1 ? "Startup" : "Startups"}
              </span>
            </div>
          )}

          {user.role === "Investor" && user.totalInvestment && (
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">Total Investment: {user.totalInvestment}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge, index) => (
            <Badge key={`${badge}-${index}`} className={`text-xs ${badgeColors[index % badgeColors.length]}`}>
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}
