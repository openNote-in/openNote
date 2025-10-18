import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import {
  Users,
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
  UserCheck,
  Crown,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Shield,
  CheckCircle,
  XCircle,
  PieChart
} from 'lucide-react';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisWeek: number;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
}

const AdminDashboard: React.FC = () => {
  
  const { user } = useAuth();
  console.log('AdminDashboard component mounted', user);
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    newUsersThisWeek: 0
  });
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    console.log('Loading dashboard data...');
    setLoading(true);
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const dataPromise = Promise.all([
        userService.getUserStats(),
        userService.getAllUsers()
      ]);

      console.log('Waiting for data or timeout...');
      const [stats, userList] = await Promise.race([dataPromise, timeoutPromise]) as [UserStats, UserProfile[]];
      console.log('Data loaded successfully:', { stats, userList });

      setUserStats(stats);
      setUsers(userList);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set default empty data
      setUserStats({
        totalUsers: 0,
        activeUsers: 0,
        adminUsers: 0,
        newUsersThisWeek: 0
      });
      setUsers([]);
    } finally {
      setLoading(false);
      console.log('Loading finished, loading state:', false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await userService.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      await loadDashboardData(); // Refresh stats
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white">{userStats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-white">{userStats.activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Admin Users</p>
              <p className="text-2xl font-bold text-white">{userStats.adminUsers}</p>
            </div>
            <Crown className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">New This Week</p>
              <p className="text-2xl font-bold text-white">{userStats.newUsersThisWeek}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {users.slice(0, 5).map((user) => (
            <div key={user.uid} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {getInitials(user.displayName)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-white text-sm">{user.displayName || user.email}</p>
                <p className="text-gray-400 text-xs">Last active: {user.lastLoginAt.toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === 'admin' 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | 'user' | 'admin')}
            className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {getInitials(user.displayName)}
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{user.displayName || 'No name'}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {user.role === 'admin' ? <Crown className="w-3 h-3 mr-1" /> : <Shield className="w-3 h-3 mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-sm">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {user.isActive ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRoleChange(user.uid, user.role === 'admin' ? 'user' : 'admin')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          user.role === 'admin'
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                        }`}
                      >
                        {user.role === 'admin' ? 'Demote' : 'Promote'}
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart Placeholder */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
            User Growth
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Resource Distribution Chart Placeholder */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-400" />
            Resource Distribution
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Pie chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 h-full">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Crown className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-800/30 border-b border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {sidebarItems.find(item => item.id === activeTab)?.label}
                </h1>
                <p className="text-gray-400 mt-1">
                  Welcome back, {user?.displayName || 'Admin'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xl font-bold text-white">{userStats.totalUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'resources' && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Resource Management</h3>
                <p className="text-gray-500">Resource management features coming soon...</p>
              </div>
            )}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Settings</h3>
                <p className="text-gray-500">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;