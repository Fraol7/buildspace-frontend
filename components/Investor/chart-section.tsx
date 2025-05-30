import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RISING_PROJECTS_DATA, SPENDING_DATA, CROWDFUNDING_TOTAL, INVEST_TOTAL, MVP_TOTAL, SEED_TOTAL, FINAL_TOTAL } from "@/constants";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartsSection = () => {

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Startup Progress Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Startup Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 items-start">
            <div className="col-span-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={RISING_PROJECTS_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="MVP"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Seed"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Final"
                    stroke="#d946ef"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {/* MVP Card */}
              <Card className="shadow border border-green-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-green-300"/ >
                    <span className="text-sm text-gray-500">MVP</span>
                    <span className="text-lg font-semibold text-green-600">{MVP_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Seed Card */}
              <Card className="shadow border border-blue-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-blue-300"/ >
                    <span className="text-sm text-gray-500">Seed</span>
                    <span className="text-lg font-semibold text-blue-600">{SEED_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Final Card */}
              <Card className="shadow border border-purple-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-purple-300"/ >
                    <span className="text-sm text-gray-500">Final</span>
                    <span className="text-lg font-semibold text-purple-600">{FINAL_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Spending Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Total Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 items-start">
            <div className="space-y-2 col-span-1">
              <Card className="shadow border border-green-300 flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <span className="text-sm text-gray-500">Crowdfunding</span>
                  <span className="text-lg font-semibold text-green-600">{CROWDFUNDING_TOTAL}</span>
                </CardContent>
              </Card>
              <Card className="shadow border border-green-300 flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <span className="text-sm text-gray-500">Invest</span>
                  <span className="text-lg font-semibold text-blue-600">{INVEST_TOTAL}</span>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={SPENDING_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
