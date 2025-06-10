import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link href="/" className="block">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-3xl font-bold text-gray-900">$4K</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/" className="block">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-3xl font-bold text-gray-900">$5,000.00</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +8% this quarter
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/" className="block">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-yellow-600 flex items-center mt-1">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Excellent performance
                </p>
              </div>
              <div className="bg-yellow-500 p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default StatsCards;