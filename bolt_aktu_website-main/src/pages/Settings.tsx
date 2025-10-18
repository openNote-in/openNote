import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Bell, Shield, Moon, Sun, Globe, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  });
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const effectiveTheme = newTheme === 'system' ? systemTheme : newTheme;

    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences</p>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Push Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive push notifications in browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after-rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Marketing Communications</h3>
                  <p className="text-gray-400 text-sm">Receive promotional emails and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              {theme === 'dark' ? <Moon className="w-6 h-6 text-purple-400" /> : <Sun className="w-6 h-6 text-yellow-400" />}
              <h2 className="text-xl font-semibold text-white">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'system', label: 'System', icon: Globe }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleThemeChange(value as 'light' | 'dark' | 'system')}
                      className={`p-4 rounded-lg border transition-all ${
                        theme === value
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Change Password</h3>
                  <p className="text-gray-400 text-sm">Update your account password</p>
                </div>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Trash2 className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-900/30 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Delete Account</h3>
                  <p className="text-red-300 text-sm">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;