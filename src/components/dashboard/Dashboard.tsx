import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Coffee, MapPin, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const quickAccessCards = [
  {
    title: 'Events',
    description: 'Discover campus events',
    icon: Calendar,
    color: 'from-blue-500 to-purple-600',
    href: '/events',
    stats: '12 upcoming'
  },
  {
    title: 'Lost & Found',
    description: 'Report or find items',
    icon: Search,
    color: 'from-green-500 to-blue-500',
    href: '/lost-found',
    stats: '3 new matches'
  },
  {
    title: 'Cafeteria',
    description: 'Check queue status',
    icon: Coffee,
    color: 'from-orange-500 to-pink-500',
    href: '/cafeteria',
    stats: 'Low wait time'
  },
  {
    title: 'Navigation',
    description: 'Find your way around',
    icon: MapPin,
    color: 'from-purple-500 to-indigo-600',
    href: '/navigation',
    stats: 'Interactive map'
  }
];

const campusHighlights = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Academic',
    date: 'Dec 15, 2024'
  },
  {
    id: 2,
    title: 'Cultural Festival',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Cultural',
    date: 'Dec 20, 2024'
  },
  {
    id: 3,
    title: 'Sports Championship',
    image: 'https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    date: 'Dec 25, 2024'
  }
];

const statsCards = [
  { title: 'Events Attended', value: '24', icon: TrendingUp, color: 'text-green-600' },
  { title: 'Items Helped Find', value: '7', icon: Users, color: 'text-blue-600' },
  { title: 'Avg. Queue Time Saved', value: '15 min', icon: Clock, color: 'text-orange-600' },
  { title: 'Campus Rating', value: '4.8', icon: Star, color: 'text-yellow-600' }
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Greeting Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white p-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name}!
          </h1>
          <p className="text-primary-100 text-lg">
            Welcome back to your Smart Campus dashboard. Ready to explore what's happening today?
          </p>
        </div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Quick Access Cards */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6 group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                    <card.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {card.stats}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {card.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campus Highlights */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Highlights</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campusHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <Card hover className="overflow-hidden group cursor-pointer">
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full">
                      {highlight.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {highlight.date}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};