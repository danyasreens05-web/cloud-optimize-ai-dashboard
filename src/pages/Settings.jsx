import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Bell, Shield, User, Globe, Database, AlertCircle, Save, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      latencyAlerts: true,
      costAlerts: false,
    },
    preferences: {
      theme: 'dark',
      currency: 'INR',
      language: 'en',
      autoRefresh: true,
      refreshInterval: 30,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
    alerts: {
      latencyThreshold: 100,
      costThreshold: 1000,
    }
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handleChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            Settings
          </h1>
          <p className="text-purple-300">
            Manage your dashboard preferences, notifications, and security settings
          </p>
        </div>

        {/* Save Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg flex items-center gap-3"
          >
            <Save className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </motion.div>
        )}

        {/* Notification Settings */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-400" />
              <CardTitle className="text-white text-xl">Notification Preferences</CardTitle>
            </div>
            <CardDescription className="text-purple-300">
              Configure how you receive alerts and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <SettingToggle
                label="Email Notifications"
                description="Receive updates via email"
                checked={settings.notifications.email}
                onChange={() => handleToggle('notifications', 'email')}
              />
              <SettingToggle
                label="Push Notifications"
                description="Get browser push notifications"
                checked={settings.notifications.push}
                onChange={() => handleToggle('notifications', 'push')}
              />
              <SettingToggle
                label="Latency Alerts"
                description="Alert when latency exceeds threshold"
                checked={settings.notifications.latencyAlerts}
                onChange={() => handleToggle('notifications', 'latencyAlerts')}
              />
              <SettingToggle
                label="Cost Alerts"
                description="Alert when costs exceed budget"
                checked={settings.notifications.costAlerts}
                onChange={() => handleToggle('notifications', 'costAlerts')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Preferences */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-400" />
              <CardTitle className="text-white text-xl">Dashboard Preferences</CardTitle>
            </div>
            <CardDescription className="text-purple-300">
              Customize your dashboard experience
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-white font-medium block mb-2">Currency</label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handleChange('preferences', 'currency', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INR" className="bg-gray-900">₹ INR - Indian Rupee</option>
                  <option value="USD" className="bg-gray-900">$ USD - US Dollar</option>
                  <option value="EUR" className="bg-gray-900">€ EUR - Euro</option>
                  <option value="GBP" className="bg-gray-900">£ GBP - British Pound</option>
                </select>
              </div>

              <div>
                <label className="text-white font-medium block mb-2">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleChange('preferences', 'language', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en" className="bg-gray-900">English</option>
                  <option value="hi" className="bg-gray-900">हिन्दी (Hindi)</option>
                  <option value="es" className="bg-gray-900">Español</option>
                  <option value="fr" className="bg-gray-900">Français</option>
                </select>
              </div>

              <SettingToggle
                label="Auto-Refresh Dashboard"
                description="Automatically update dashboard data"
                checked={settings.preferences.autoRefresh}
                onChange={() => handleToggle('preferences', 'autoRefresh')}
              />

              {settings.preferences.autoRefresh && (
                <div>
                  <label className="text-white font-medium block mb-2">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={settings.preferences.refreshInterval}
                    onChange={(e) => handleChange('preferences', 'refreshInterval', parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alert Thresholds */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              <CardTitle className="text-white text-xl">Alert Thresholds</CardTitle>
            </div>
            <CardDescription className="text-purple-300">
              Set thresholds for automatic alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-white font-medium block mb-2">
                Latency Threshold (ms)
              </label>
              <input
                type="number"
                min="50"
                max="500"
                value={settings.alerts.latencyThreshold}
                onChange={(e) => handleChange('alerts', 'latencyThreshold', parseInt(e.target.value))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-purple-300 text-sm mt-1">
                Alert when latency exceeds this value
              </p>
            </div>

            <div>
              <label className="text-white font-medium block mb-2">
                Cost Threshold (₹)
              </label>
              <input
                type="number"
                min="100"
                max="100000"
                step="100"
                value={settings.alerts.costThreshold}
                onChange={(e) => handleChange('alerts', 'costThreshold', parseInt(e.target.value))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-purple-300 text-sm mt-1">
                Alert when monthly costs exceed this value
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              <CardTitle className="text-white text-xl">Security Settings</CardTitle>
            </div>
            <CardDescription className="text-purple-300">
              Manage your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <SettingToggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={settings.security.twoFactor}
              onChange={() => handleToggle('security', 'twoFactor')}
            />

            <div>
              <label className="text-white font-medium block mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                min="15"
                max="120"
                step="15"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-purple-300 text-sm mt-1">
                Automatically log out after inactivity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Toggle Component
const SettingToggle = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200">
      <div className="flex-1">
        <p className="text-white font-medium">{label}</p>
        <p className="text-purple-300 text-sm mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
          checked ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
            checked ? 'transform translate-x-7' : ''
          }`}
        />
      </button>
    </div>
  );
};

export default Settings;
