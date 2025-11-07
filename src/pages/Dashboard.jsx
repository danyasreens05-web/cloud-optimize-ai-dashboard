import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Database, DollarSign, Cloud, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import cloudStorageClient from '@/api/cloudStorageClient';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, providersData] = await Promise.all([
          cloudStorageClient.getMetrics(),
          cloudStorageClient.getProviders()
        ]);
        setMetrics(metricsData);
        setProviders(providersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-blue-400 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-400 rounded w-3/4"></div>
            <div className="h-4 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Storage',
      value: `${(metrics?.totalStorage / (1024 ** 3)).toFixed(2)} GB`,
      icon: Database,
      change: '+12.5%',
      trend: 'up',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Monthly Cost',
      value: `$${metrics?.totalCost}`,
      icon: DollarSign,
      change: '-3.2%',
      trend: 'down',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Requests',
      value: metrics?.totalRequests?.toLocaleString(),
      icon: Activity,
      change: '+8.1%',
      trend: 'up',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Avg Latency',
      value: `${metrics?.avgLatency}ms`,
      icon: TrendingUp,
      change: '-5.3%',
      trend: 'down',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Mock data for charts
  const latencyData = [
    { time: '00:00', aws: 45, azure: 52, gcp: 48 },
    { time: '04:00', aws: 52, azure: 48, gcp: 55 },
    { time: '08:00', aws: 48, azure: 58, gcp: 52 },
    { time: '12:00', aws: 55, azure: 50, gcp: 48 },
    { time: '16:00', aws: 50, azure: 55, gcp: 52 },
    { time: '20:00', aws: 48, azure: 52, gcp: 50 }
  ];

  const storageData = [
    { month: 'Jan', storage: 850 },
    { month: 'Feb', storage: 920 },
    { month: 'Mar', storage: 1100 },
    { month: 'Apr', storage: 1300 },
    { month: 'May', storage: 1580 },
    { month: 'Jun', storage: 1750 }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid with Modern Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="flex items-center mt-2">
                  <TrendIcon className={`h-4 w-4 mr-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <p className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Latency Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Provider Latency Comparison</CardTitle>
            <CardDescription>Real-time latency metrics across providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="aws" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="azure" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="gcp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Storage Growth Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Storage Growth Trend</CardTitle>
            <CardDescription>Storage usage over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={storageData}>
                <defs>
                  <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="storage" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorStorage)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Providers Table with Enhanced Styling */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Cloud Storage Providers</CardTitle>
              <CardDescription className="mt-2">
                Monitor the performance and status of your cloud storage providers
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Provider</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Latency</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Cost</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{provider.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        provider.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">{provider.latency}ms</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-900 dark:text-white">${provider.cost}</span>
                      <span className="text-gray-500 text-sm">/mo</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${provider.reliability}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">{provider.reliability}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
