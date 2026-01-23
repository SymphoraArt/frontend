"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye,
  Star,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CreatorAnalytics {
  creator: {
    id: string;
    username: string;
    displayName: string;
    joinedAt: string;
  };
  overview: {
    totalEarnings: number;
    monthlyEarnings: number;
    totalSales: number;
    monthlySales: number;
    totalPrompts: number;
    activePrompts: number;
    averageRating: number;
    totalViews: number;
    totalUnlocks: number;
    conversionRate: number;
  };
  timeSeries: Array<{
    date: string;
    earnings: number;
    sales: number;
  }>;
  topPrompts: Array<{
    promptId: string;
    title: string;
    sales: number;
    revenue: number;
    conversionRate: number;
  }>;
  recentActivity: Array<{
    type: 'sale' | 'view' | 'rating';
    promptTitle: string;
    amount?: number;
    timestamp: string;
  }>;
  period: string;
  generatedAt: string;
}

const TIME_PERIODS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' }
];

export function CreatorAnalyticsDashboard({ creatorId }: { creatorId: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const { data: analytics, isLoading, error, refetch } = useQuery<CreatorAnalytics>({
    queryKey: ['creator-analytics', creatorId, selectedPeriod],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/creators/${creatorId}?period=${selectedPeriod}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Failed to load analytics data. Please try again.
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your prompt performance and earnings
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_PERIODS.map(period => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${analytics.overview.totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">
                +${analytics.overview.monthlyEarnings.toFixed(2)} this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">{analytics.overview.totalSales}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-blue-600">
                +{analytics.overview.monthlySales} this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analytics.overview.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <Progress
                value={analytics.overview.conversionRate * 100}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(analytics.overview.conversionRate * 100).toFixed(1)}% conversion rate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{analytics.overview.averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-muted-foreground">
                {analytics.overview.activePrompts} active prompts
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prompts">Top Prompts</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings & Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Chart component would go here (using recharts or similar)
                <br />
                <small>Time series data available in analytics.timeSeries</small>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPrompts.map((prompt, index) => (
                  <div key={prompt.promptId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {prompt.sales} sales • {(prompt.conversionRate * 100).toFixed(1)}% conversion
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${prompt.revenue.toFixed(2)}</p>
                      <Badge variant="secondary">Top Performer</Badge>
                    </div>
                  </div>
                ))}
                {analytics.topPrompts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No sales data available yet. Start by listing some prompts!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                      activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'sale' ? <DollarSign className="h-4 w-4" /> :
                       activity.type === 'view' ? <Eye className="h-4 w-4" /> :
                       <Star className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium capitalize">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.promptTitle}</p>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <p className="font-medium">${activity.amount.toFixed(2)}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {analytics.recentActivity.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No recent activity. Activity will appear here as users interact with your prompts.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        Last updated: {new Date(analytics.generatedAt).toLocaleString()}
      </div>
    </div>
  );
}