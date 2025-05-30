import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { INVESTMENTS } from "@/constants"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

const InvestmentsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemsPerPage = 2
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= INVESTMENTS.length ? 0 : prevIndex + itemsPerPage))
    }
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(0, INVESTMENTS.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage),
      )
    }
  
    const visibleInvestments = INVESTMENTS.slice(currentIndex, currentIndex + itemsPerPage)
  
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Your Investments</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="h-8 w-8 p-0"
                aria-label="Previous INVESTMENTS"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="h-8 w-8 p-0"
                aria-label="Next INVESTMENTS"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleInvestments.map((investment) => (
              <Link href="/" key={investment.id} className="block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                        src={investment.image || "/placeholder.svg"}
                        alt={investment.name}
                        width={48} // 12 * 4 = 48px (w-12 equivalent)
                        height={48} // 12 * 4 = 48px (h-12 equivalent)
                        className="rounded-lg bg-white p-2"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                      <p className="text-sm text-gray-600">{investment.type}</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {investment.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Investment</span>
                      <span className="text-sm font-medium">{investment.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Returns</span>
                      <span className="text-sm font-medium text-green-600">
                        {investment.returns} ({investment.percentage})
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
  
export default InvestmentsSection;