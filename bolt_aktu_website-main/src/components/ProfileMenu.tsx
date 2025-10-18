import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut, Edit, ChevronDown, LayoutDashboard } from 'lucide-react';

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User';
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 group"
      >
        {/* Avatar */}
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-colors"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {getInitials(user.displayName)}
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full"></div>
        </div>

        {/* Name and Role */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            {getDisplayName()}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {user.role}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(user.displayName)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                  {user.emailVerified && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <User className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span>View Profile</span>
            </Link>

            <Link
              to="/profile/edit"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <Edit className="w-4 h-4 group-hover:text-green-400 transition-colors" />
              <span>Edit Profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <Settings className="w-4 h-4 group-hover:text-gray-400 transition-colors" />
              <span>Settings</span>
            </Link>

            <div className="border-t border-gray-700/50 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/20 transition-all duration-200 group"
            >
              <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;