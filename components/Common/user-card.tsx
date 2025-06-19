import { useState } from "react";
import Image from "next/image";
import { Star, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useSession } from "next-auth/react";
import { User } from "@/store/userStore";

// type UserRole = "Entrepreneur" | "Investor";

interface UserCardProps {
  user: User;
}

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRate?.(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
          disabled={!interactive}
        >
          <Star
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
      {!interactive && <span className="ml-2 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>}
    </div>
  );
}

export default function UserCard({ user }: UserCardProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRating, setCurrentRating] = useState(user.rating);

  const { submitUserRating } = useUserStore();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const handleRate = async () => {
    if (selectedRating === null || !accessToken) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await submitUserRating(user.id, selectedRating, accessToken);
      if (updatedUser) {
        // Update the displayed rating with the one returned from the server
        setCurrentRating(updatedUser.rating || selectedRating);
        setSelectedRating(null);
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      // You might want to show an error toast/message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-blue-100 to-blue-50 p-6 py-10 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer">
      {/* User Type Badge */}
      <div className="absolute top-4 right-4">
        <Badge className="gap-1 bg-white text-blue-300 border-gray-300 hover:bg-gray-300">{user.role}</Badge>
      </div>

      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Image
            src={user.profile_picture_url || "/placeholder.jpg"}
            alt={`${user.first_name} ${user.last_name}'s profile`}
            width={70}
            height={70}
            className="rounded-full border-2 border-white shadow-md object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate mb-1">
            {user.first_name} {user.last_name}
          </h3>
          <StarRating rating={currentRating} />

          {/* Rating Input */}
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Rate this user:</p>
            <div className="flex items-center gap-2">
              <StarRating rating={selectedRating || 0} onRate={setSelectedRating} interactive={true} />
              <Button
                size="sm"
                onClick={handleRate}
                disabled={selectedRating === null || isSubmitting}
                className="ml-2 h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
