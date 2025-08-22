import React from 'react';
import { 
  Home, 
  Calendar, 
  Search, 
  Coffee, 
  MapPin, 
  User, 
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, current: true },
  { name: 'Events', href: '/events', icon: Calendar, current: false },
  { name: 'Lost & Found', href: '/lost-found', icon: Search, current: false },
  { name: 'Cafeteria', href: '/cafeteria', icon: Coffee, current: false },
  { name: 'Navigation', href: '/navigation', icon: MapPin, current: false },
];

const bottomNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <nav className="flex-1 px-4 pt-6 pb-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.current
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  item.current ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </a>
          ))}
          
          {user?.role === 'admin' && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Admin
              </p>
              <a
                href="/admin"
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Shield className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Admin Panel
              </a>
            </div>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 pb-6 space-y-1 border-t border-gray-200 dark:border-gray-700 pt-4">
          {bottomNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};