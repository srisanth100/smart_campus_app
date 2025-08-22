import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Filter, Search, Heart } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities.',
    date: '2024-12-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'academic',
    registeredCount: 245,
    maxCapacity: 300,
    isRegistered: false
  },
  {
    id: '2',
    title: 'Cultural Festival',
    description: 'Celebrate diversity with performances, food stalls, and cultural exhibitions from around the world.',
    date: '2024-12-20',
    time: '06:00 PM',
    location: 'Campus Grounds',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cultural',
    registeredCount: 180,
    maxCapacity: 500,
    isRegistered: true
  },
  {
    id: '3',
    title: 'Sports Championship',
    description: 'Annual inter-department sports championship featuring football, basketball, and track events.',
    date: '2024-12-25',
    time: '08:00 AM',
    location: 'Sports Complex',
    image: 'https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sports',
    registeredCount: 120,
    maxCapacity: 200,
    isRegistered: false
  },
  {
    id: '4',
    title: 'AI Workshop Series',
    description: 'Learn about artificial intelligence and machine learning in this hands-on workshop series.',
    date: '2024-12-18',
    time: '02:00 PM',
    location: 'Computer Lab 1',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'workshop',
    registeredCount: 45,
    maxCapacity: 50,
    isRegistered: false
  }
];

const categories = [
  { id: 'all', name: 'All Events', color: 'bg-gray-100 text-gray-800' },
  { id: 'academic', name: 'Academic', color: 'bg-blue-100 text-blue-800' },
  { id: 'cultural', name: 'Cultural', color: 'bg-purple-100 text-purple-800' },
  { id: 'sports', name: 'Sports', color: 'bg-green-100 text-green-800' },
  { id: 'workshop', name: 'Workshop', color: 'bg-orange-100 text-orange-800' }
];

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isRegistered: !event.isRegistered, registeredCount: event.isRegistered ? event.registeredCount - 1 : event.registeredCount + 1 }
        : event
    ));
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campus Events</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Discover and join exciting events happening on campus</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : category.color
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Events Grid/List */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="overflow-hidden group">
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleRegister(event.id)}
                    className={`p-2 rounded-full transition-colors ${
                      event.isRegistered
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} fill={event.isRegistered ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users size={16} className="mr-2" />
                    {event.registeredCount}/{event.maxCapacity} registered
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-4">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registeredCount / event.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                  <Button
                    variant={event.isRegistered ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => handleRegister(event.id)}
                  >
                    {event.isRegistered ? 'Registered' : 'Register'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};