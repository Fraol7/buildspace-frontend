import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STARTUPS } from "@/constants"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

const StartupsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemsPerPage = 2
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= STARTUPS.length ? 0 : prevIndex + itemsPerPage))
    }
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(0, STARTUPS.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage),
      )
    }
  
    const visibleInvestments = STARTUPS.slice(currentIndex, currentIndex + itemsPerPage)
  
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">My Startups</CardTitle>
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
            {visibleInvestments.map((startup) => (
              <Link href="/" key={startup.id} className="block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                        src={startup.image || "/placeholder.jpg"}
                        alt={startup.name}
                        width={72}
                        height={72}
                        className="rounded-lg bg-white p-2"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{startup.name}</h4>
                      <p className="text-sm text-gray-600">{startup.tagline}</p>
                      <div className="flex flex-wrap justify-start gap-2 mt-2">
                        {startup.industry.map((industry, index) => (
                          <Badge key={index} variant="outline" className="text-green-600 bg-white border-green-600">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {startup.stage}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount Raised</span>
                      <span className="text-sm font-medium">{startup.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Saved Counts</span>
                      <span className="text-sm font-medium text-green-600">
                        {startup.saved}
                      </span>
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
  
export default StartupsSection;