"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvestorDashboardStore } from "@/store/dashboardStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

// Color palette for the bars (lighter shades)
const COLORS = [
  '#bfdbfe', // blue-200
  '#a7f3d0', // emerald-200
  '#ddd6fe', // violet-200
  '#fbcfe8', // pink-200
  '#fde68a', // amber-200
  '#99f6e4', // teal-200
  '#fed7aa', // orange-200
  '#c7d2fe', // indigo-200
];

const ChartsSection = () => {
  const { data: session } = useSession();
  const { 
    investmentsByStage, 
    spendData,
    loading, 
    fetchInvestmentsByStage,
    fetchInvestorChartData 
  } = useInvestorDashboardStore();

  useEffect(() => {
    if (session?.accessToken) {
      fetchInvestmentsByStage(session.accessToken);
      fetchInvestorChartData(session.accessToken);
    }
  }, [session?.accessToken, fetchInvestmentsByStage, fetchInvestorChartData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-0 shadow-lg animate-pulse">
          <CardContent className="p-6">
            <div className="h-96 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Startup Stages Distribution */}
      {investmentsByStage.length > 0 ? (
        <Card className="flex flex-col items-start shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Startup Stages Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={investmentsByStage}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  barCategoryGap={12}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    width={140}
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#4b5563" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                    formatter={(value) => [`${value} Startups`, "Count"]}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    barSize={50}
                    isAnimationActive={false}
                  >
                    {investmentsByStage.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                        style={{
                          transition: "none",
                          cursor: "default",
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {investmentsByStage.map((stage, index) => (
                <div
                  key={stage.stage}
                  className="flex items-center text-xs bg-gray-50 px-3 py-1.5 rounded-lg"
                >
                  <span
                    className="w-3 h-3 rounded-sm mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-gray-600">{stage.stage}</span>
                  <span className="ml-1 font-medium text-gray-900">
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-500">
            No investment data available. Start investing to see your portfolio distribution.
          </p>
        </Card>
      )}

      {/* Total Spending Section */}
      {spendData ? (
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Total Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              {/* Legend */}
              <div className="space-y-2 col-span-1">
                <Card className="shadow border border-green-300 flex items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-sm text-gray-500">Crowdfunding</span>
                    <span className="text-lg font-semibold text-green-600">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(spendData.total_crowdfunding)}
                    </span>
                  </CardContent>
                </Card>
                <Card className="shadow border border-blue-300 flex items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-sm text-gray-500">Investment</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(spendData.total_investment)}
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <div className="col-span-1 md:col-span-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={spendData.spend_over_time}
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
                      tickFormatter={(value) => 
                        new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          notation: 'compact',
                          compactDisplay: 'short'
                        }).format(value)
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        border: "none",
                      }}
                      formatter={(value) => [
                        new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(Number(value)),
                        'Amount'
                      ]}
                    />
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="Spend"
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
      ) : (
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-gray-500">
              No spending data available. Your spending history will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChartsSection;
