import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STARTUPS, sampleUsers } from "@/constants"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image'
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
            <CardTitle className="text-lg font-semibold text-gray-900">My Investments</CardTitle>
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
                  <div className="grid grid-cols-2 gap-4 pt-3 mt-3 border-t border-gray-200">
                    {/* Left Column - Amount Raised */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Amount Raised</span>
                      <span className="text-sm font-medium text-gray-800">{startup.amount}</span>
                    </div>
                    
                    {/* Right Column - Founder Avatar */}
                    <div className="flex items-center justify-end space-x-2">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src={"/images/person1.jpg"}
                          alt={"Founder"}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-medium text-gray-800">Founder</span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            (4.5)
                          </span>
                        </div>
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
  
export default StartupsSection;