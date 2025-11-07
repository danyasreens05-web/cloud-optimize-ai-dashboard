import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Detailed analytics and insights for your cloud storage</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <CardTitle>Usage Trends</CardTitle>
            </div>
            <CardDescription>Monitor storage usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Detailed usage trend charts coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <CardTitle>Performance Metrics</CardTitle>
            </div>
            <CardDescription>Track performance across providers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Performance analytics dashboard coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <PieChart className="h-6 w-6 text-purple-600" />
              <CardTitle>Cost Analysis</CardTitle>
            </div>
            <CardDescription>Analyze spending by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Cost breakdown charts coming soon...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <LineChart className="h-6 w-6 text-orange-600" />
              <CardTitle>Request Analytics</CardTitle>
            </div>
            <CardDescription>Monitor API request patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Request analytics charts coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
