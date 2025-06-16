import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SPENDING_DATA, CROWDFUNDING_TOTAL, INVEST_TOTAL } from "@/constants";
import { useDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartsSection = () => {
  const { earnings, loading, fetchAll } = useDashboardStore();
  const { data: session } = useSession();

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (accessToken) {
      fetchAll(accessToken);
    }
  }, [fetchAll]);

  const crowdfundingTotal = earnings?.total_crowdfunding ?? 0;
  const investmentTotal = earnings?.total_investment ?? 0;
  const spendingData = earnings?.gain_over_time ?? [];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
      {/* Startup Progress Section */}
      {/* <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Startup Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            
            <div className="col-span-1 md:col-span-4 h-64">
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
              <Card className="shadow border border-green-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-green-300" />
                    <span className="text-sm text-gray-500">MVP</span>
                    <span className="text-lg font-semibold text-green-600">{MVP_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow border border-blue-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-blue-300" />
                    <span className="text-sm text-gray-500">Seed</span>
                    <span className="text-lg font-semibold text-blue-600">{SEED_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow border border-indigo-300 flex items-center justify-center">
                <CardContent className="flex items-center justify-center p-4">
                  <div className="flex items-center space-x-4">
                    <span className="w-4 h-4 rounded-full bg-indigo-300" />
                    <span className="text-sm text-gray-500">Final</span>
                    <span className="text-lg font-semibold text-indigo-600">{FINAL_TOTAL}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Total Earning Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Total Earning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {/* Legend */}
            <div className="space-y-2 col-span-1">
              <Card className="shadow border border-green-300 flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <span className="text-sm text-gray-500">Crowdfunding</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${crowdfundingTotal}
                  </span>
                </CardContent>
              </Card>
              <Card className="shadow border border-blue-300 flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <span className="text-sm text-gray-500">Invest</span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${investmentTotal}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <div className="col-span-1 md:col-span-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={spendingData}
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
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="gain"
                    stroke="#2563eb"
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
