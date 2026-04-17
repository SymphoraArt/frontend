"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DataPoint {
  date: string;
  earnings?: number;
  sales?: number;
  views?: number;
  unlocks?: number;
  [key: string]: any;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  metrics: string[]; // e.g., ['earnings', 'sales']
  period?: string;
  showComparison?: boolean;
  height?: number;
}

export function AnalyticsChart({
  title,
  data,
  metrics,
  period = '30d',
  showComparison = false,
  height = 300
}: AnalyticsChartProps) {
  // Simple chart visualization (would use recharts in production)
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const calculateTrend = (current: number, previous: number) => {
    if (!previous) return { change: 0, direction: 'stable' as const };
    const change = ((current - previous) / previous) * 100;
    return {
      change: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
    };
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {period && (
          <div className="text-sm text-muted-foreground">
            Last {period}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart - in production would use recharts */}
        <div
          className="w-full bg-muted/20 rounded-lg border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground"
          style={{ height }}
        >
          <div className="text-center">
            <div className="text-lg font-medium mb-2">📊 Chart Visualization</div>
            <div className="text-sm">
              {data.length} data points available
              <br />
              Metrics: {metrics.join(', ')}
            </div>
            {latestData && (
              <div className="mt-4 text-xs">
                Latest: {new Date(latestData.date).toLocaleDateString()}
                {metrics.map(metric => (
                  <div key={metric} className="mt-1">
                    {metric}: {latestData[metric] || 0}
                    {showComparison && previousData && (
                      <span className="ml-2">
                        {(() => {
                          const trend = calculateTrend(
                            latestData[metric] || 0,
                            previousData[metric] || 0
                          );
                          const Icon = trend.direction === 'up' ? TrendingUp :
                                     trend.direction === 'down' ? TrendingDown : Minus;
                          const color = trend.direction === 'up' ? 'text-green-600 dark:text-green-400' :
                                      trend.direction === 'down' ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground';
                          return (
                            <span className={`inline-flex items-center ${color}`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {trend.change.toFixed(1)}%
                            </span>
                          );
                        })()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Data summary */}
        {data.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Data Points</div>
              <div className="font-medium">{data.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Latest Update</div>
              <div className="font-medium">
                {new Date(latestData.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simple metric card component
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, change, changeLabel, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className="flex items-center mt-2 text-sm">
                {change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : change < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground mr-1" />
                )}
                <span className={change > 0 ? 'text-green-600 dark:text-green-400' : change < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}>
                  {Math.abs(change).toFixed(1)}% {changeLabel || 'vs last period'}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}