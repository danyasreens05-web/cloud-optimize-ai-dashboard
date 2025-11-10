import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart, LineChart, Map, Activity, Zap } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';
import { useEffect, useState } from 'react';
import cloudStorageClient from '@/api/cloudStorageClient';
import CloudMap from '@/components/ui/map';
import Heatmap from '@/components/ui/heatmap';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [metrics, providers, costBreakdown, heatmapData, locations] = await Promise.all([
          cloudStorageClient.getMetrics(),
          cloudStorageClient.getProviders(),
          cloudStorageClient.getCostBreakdown(),
          cloudStorageClient.getPerformanceHeatmap(),
          cloudStorageClient.getProviderLocations()
        ]);

        setAnalyticsData({
          metrics,
          providers,
          costBreakdown,
          heatmapData,
          locations
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">No analytics data available</div>
      </div>
    );
  }

  const { metrics, providers, costBreakdown, heatmapData, locations } = analyticsData;

  // Prepare data for various charts
  const usageTrendData = [
    { month: 'Jan', storage: 1200, requests: 45000 },
    { month: 'Feb', storage: 1350, requests: 52000 },
    { month: 'Mar', storage: 1180, requests: 48000 },
    { month: 'Apr', storage: 1420, requests: 61000 },
    { month: 'May', storage: 1580, requests: 58000 },
    { month: 'Jun', storage: 1750, requests: 67000 }
  ];

  const performanceData = providers.map(provider => ({
    name: provider.name.split(' ')[0],
    latency: provider.latency,
    reliability: provider.reliability,
    cost: provider.cost * 100
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Detailed analytics and insights for your cloud storage</p>
      </div>

      {/* Geographic Map */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Map className="h-6 w-6 text-blue-600" />
            <CardTitle>Provider Geographic Distribution</CardTitle>
          </div>
          <CardDescription>Global distribution of your cloud storage providers</CardDescription>
        </CardHeader>
        <CardContent>
          <CloudMap providers={locations} className="w-full" />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Usage Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <CardTitle>Usage Trends</CardTitle>
            </div>
            <CardDescription>Storage usage and request patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsLineChart data={usageTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="storage" stroke="#3b82f6" strokeWidth={3} name="Storage (GB)" />
                <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={3} name="Requests" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <CardTitle>Performance Comparison</CardTitle>
            </div>
            <CardDescription>Latency and reliability across providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="latency" fill="#3b82f6" name="Latency (ms)" />
                <Bar dataKey="reliability" fill="#10b981" name="Reliability (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <PieChart className="h-6 w-6 text-purple-600" />
              <CardTitle>Cost Breakdown</CardTitle>
            </div>
            <CardDescription>Cost distribution by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Heatmap */}
        <Card className="shadow-lg border-0 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-orange-600" />
              <CardTitle>Performance Heatmap</CardTitle>
            </div>
            <CardDescription>Latency patterns across providers and time</CardDescription>
          </CardHeader>
          <CardContent>
            <Heatmap data={heatmapData} className="w-full" />
          </CardContent>
        </Card>

        {/* Request Analytics */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <LineChart className="h-6 w-6 text-orange-600" />
              <CardTitle>Request Patterns</CardTitle>
            </div>
            <CardDescription>API request distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={usageTrendData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Metrics */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-yellow-600" />
              <CardTitle>Efficiency Metrics</CardTitle>
            </div>
            <CardDescription>Cost per GB and performance efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" dataKey="cost" name="Cost ($/GB)" stroke="#6b7280" />
                <YAxis type="number" dataKey="latency" name="Latency (ms)" stroke="#6b7280" />
                <ZAxis type="number" dataKey="reliability" range={[50, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value, name) => [value, name]}
                />
                <Scatter name="Providers" dataKey="reliability" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2">Bubble size represents reliability</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
