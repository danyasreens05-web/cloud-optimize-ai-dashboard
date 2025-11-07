import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, HardDrive, FolderOpen, Archive } from 'lucide-react';

const Storage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Storage Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor and manage your cloud storage capacity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Database className="h-6 w-6 text-blue-600" />
              <CardTitle>Total Storage</CardTitle>
            </div>
            <CardDescription>Overall storage across all providers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2.5 TB</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">65% used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <HardDrive className="h-6 w-6 text-green-600" />
              <CardTitle>Available Space</CardTitle>
            </div>
            <CardDescription>Remaining storage capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">890 GB</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">35% available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-6 w-6 text-purple-600" />
              <CardTitle>Active Files</CardTitle>
            </div>
            <CardDescription>Total number of stored files</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">45,320</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Across all providers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Archive className="h-6 w-6 text-orange-600" />
              <CardTitle>Archived Data</CardTitle>
            </div>
            <CardDescription>Cold storage and archived files</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1.2 TB</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">In cold storage</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Storage;
