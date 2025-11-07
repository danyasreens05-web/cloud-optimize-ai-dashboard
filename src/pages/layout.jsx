import { Outlet, Link, useLocation } from 'react-router-dom';
import { Cloud, BarChart3, Settings, Database, TrendingUp, Menu, Plus } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Providers', href: '/providers', icon: Cloud },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Storage', href: '/storage', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const handleAddProvider = () => {
    setShowAddProvider(true);
    setTimeout(() => setShowAddProvider(false), 3000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <Cloud className="h-8 w-8 text-blue-600" />
              {sidebarOpen && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  CloudOptimize
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mx-4 my-2"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
              U
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  user@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Cloud Storage Optimization
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Monitor and optimize your cloud storage performance
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  Refresh
                </button>
                <button 
                  onClick={handleAddProvider}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Provider</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Add Provider Notification */}
        {showAddProvider && (
          <div className="mx-8 mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Add Provider Modal
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This would open a modal to add a new cloud storage provider
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
