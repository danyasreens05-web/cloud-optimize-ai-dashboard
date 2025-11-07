import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Database, DollarSign, Cloud } from 'lucide-react';
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
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Storage',
      value: `${(metrics?.totalStorage / (1024 ** 3)).toFixed(2)} GB`,
      icon: Database,
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Monthly Cost',
      value: `$${metrics?.totalCost}`,
      icon: DollarSign,
      change: '-3.2%',
      trend: 'down'
    },
    {
      title: 'Total Requests',
      value: metrics?.totalRequests?.toLocaleString(),
      icon: Activity,
      change: '+8.1%',
      trend: 'up'
    },
    {
      title: 'Avg Latency',
      value: `${metrics?.avgLatency}ms`,
      icon: TrendingUp,
      change: '-5.3%',
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cloud Storage Providers</CardTitle>
          <CardDescription>
            Monitor the performance and status of your cloud storage providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Provider</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Latency</th>
                  <th className="text-left p-4 font-medium">Cost</th>
                  <th className="text-left p-4 font-medium">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Cloud className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{provider.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        provider.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {provider.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{provider.latency}ms</td>
                    <td className="p-4 text-gray-600">${provider.cost}</td>
                    <td className="p-4 text-gray-600">{provider.reliability}%</td>
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
