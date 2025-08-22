import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '../common/Card';

export const Navbar: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const notifications = [
    {
      id: 1,
      title: 'New Event: Tech Conference 2024',
      message: 'Registration opens tomorrow',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Lost Item Match Found',
      message: 'Your iPhone case might be found',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Smart Campus
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, places, items..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bell size={20} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-w-sm">
                <Card className="py-2 shadow-lg border">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-gray-700 dark:text-gray-300 font-medium">
                {user?.name}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48">
                <Card className="py-2 shadow-lg border">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};