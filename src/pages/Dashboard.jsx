import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Database, DollarSign, Cloud, ArrowUpRight, ArrowDownRight, Bell, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import cloudStorageClient from '@/api/cloudStorageClient';
import Alert from '@/components/ui/alert';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [providers, setProviders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, providersData, alertsData, predictionsData] = await Promise.all([
          cloudStorageClient.getMetrics(),
          cloudStorageClient.getProviders(),
          cloudStorageClient.getAlerts(),
          cloudStorageClient.getPredictions()
        ]);
        setMetrics(metricsData);
        setProviders(providersData);
        setAlerts(alertsData);
        setPredictions(predictionsData);
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

  // Filter unacknowledged alerts
  const activeAlerts = alerts.filter(alert => !alert.acknowledged);

  // Prepare cost breakdown data for pie chart
  const costBreakdownData = providers.slice(0, 8).map(provider => ({
    name: provider.name.split(' ')[0], // Shorten names for pie chart
    value: provider.cost * 100,
    cost: provider.cost
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

  return (
    <div className="space-y-8">
      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Alerts</h2>
          </div>
          {activeAlerts.map((alert) => (
            <Alert
              key={alert.id}
              type={alert.severity}
              title={`${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert`}
              message={alert.message}
              onDismiss={() => {
                setAlerts(prev => prev.map(a =>
                  a.id === alert.id ? { ...a, acknowledged: true } : a
                ));
              }}
            />
          ))}
        </div>
      )}

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        {/* Cost Breakdown Pie Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Cost Distribution</CardTitle>
            <CardDescription>Cost breakdown by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
              </PieChart>
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

      {/* AI Predictions Section */}
      {predictions && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  AI Cost Predictions
                </CardTitle>
                <CardDescription>6-month cost and storage growth forecast</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Trend: {predictions.latencyTrend}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Growth: {predictions.storageGrowth}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cost Forecast</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={predictions.costPredictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => [`$${value}`, 'Predicted Cost']}
                    />
                    <Line type="monotone" dataKey="predictedCost" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Storage Forecast</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={predictions.costPredictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => [`${value} GB`, 'Predicted Storage']}
                    />
                    <Bar dataKey="predictedStorage" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI Recommendations</h5>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                {predictions.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

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
