import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Clock, Route } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { NavigationPoint } from '../../types';

const mockLocations: NavigationPoint[] = [
  {
    id: '1',
    name: 'Central Library',
    category: 'academic',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    description: 'Main campus library with study rooms and computer labs'
  },
  {
    id: '2',
    name: 'Student Center',
    category: 'facility',
    coordinates: { lat: 40.7130, lng: -74.0058 },
    description: 'Student services, bookstore, and meeting rooms'
  },
  {
    id: '3',
    name: 'Main Cafeteria',
    category: 'food',
    coordinates: { lat: 40.7125, lng: -74.0062 },
    description: 'Primary dining facility with various food options'
  },
  {
    id: '4',
    name: 'Sports Complex',
    category: 'facility',
    coordinates: { lat: 40.7135, lng: -74.0055 },
    description: 'Gymnasium, swimming pool, and outdoor courts'
  },
  {
    id: '5',
    name: 'Bus Stop A',
    category: 'transport',
    coordinates: { lat: 40.7120, lng: -74.0065 },
    description: 'Main bus stop for city transportation'
  },
  {
    id: '6',
    name: 'Computer Science Building',
    category: 'academic',
    coordinates: { lat: 40.7132, lng: -74.0057 },
    description: 'CS department offices and computer labs'
  }
];

const categories = [
  { id: 'all', name: 'All Locations', icon: MapPin, color: 'bg-gray-100 text-gray-800' },
  { id: 'academic', name: 'Academic', icon: MapPin, color: 'bg-blue-100 text-blue-800' },
  { id: 'facility', name: 'Facilities', icon: MapPin, color: 'bg-green-100 text-green-800' },
  { id: 'food', name: 'Food & Dining', icon: MapPin, color: 'bg-orange-100 text-orange-800' },
  { id: 'transport', name: 'Transport', icon: MapPin, color: 'bg-purple-100 text-purple-800' }
];

export const NavigationPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<NavigationPoint | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filteredLocations = mockLocations.filter(location => {
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location
          setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      // Fallback to mock location
      setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
    }
  };

  const calculateDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }) => {
    // Simple distance calculation (not accurate for real use)
    const dx = loc1.lat - loc2.lat;
    const dy = loc1.lng - loc2.lng;
    return Math.sqrt(dx * dx + dy * dy) * 111000; // Rough conversion to meters
  };

  const getDirections = (destination: NavigationPoint) => {
    if (!currentLocation) {
      getCurrentLocation();
      return;
    }
    setSelectedLocation(destination);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Campus Navigation</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Find your way around campus with interactive maps</p>
        </div>
        <Button
          variant="primary"
          onClick={getCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation size={20} />
          Get My Location
        </Button>
      </div>

      {/* Current Location Status */}
      {currentLocation && (
        <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <MapPin size={20} />
            <span className="font-medium">Location detected: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}</span>
          </div>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : category.color
                }`}
              >
                <category.icon size={16} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Map Placeholder */}
      <Card className="p-6">
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Interactive Campus Map</h3>
            <p className="text-gray-600 dark:text-gray-400">Map integration would be implemented here</p>
          </div>
          
          {/* Mock map pins */}
          <div className="absolute inset-0">
            {filteredLocations.slice(0, 6).map((location, index) => (
              <div
                key={location.id}
                className="absolute w-6 h-6 bg-primary-600 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${30 + Math.floor(index / 3) * 40}%`
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="w-full h-full rounded-full bg-primary-600 flex items-center justify-center">
                  <MapPin size={12} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Selected Location Details */}
      {selectedLocation && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedLocation.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedLocation.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedLocation.category)}`}>
                    {selectedLocation.category.charAt(0).toUpperCase() + selectedLocation.category.slice(1)}
                  </span>
                  {currentLocation && (
                    <div className="flex items-center gap-1">
                      <Route size={16} />
                      <span>
                        ~{Math.round(calculateDistance(currentLocation, selectedLocation.coordinates))}m away
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedLocation(null)}
              >
                Close
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="primary" className="flex items-center gap-2">
                <Navigation size={16} />
                Get Directions
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Clock size={16} />
                Estimated: 5 min walk
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Locations List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Campus Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-4 cursor-pointer" onClick={() => setSelectedLocation(location)}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(location.category)}`}>
                    {location.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {location.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-1" />
                    <span>Lat: {location.coordinates.lat.toFixed(4)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      getDirections(location);
                    }}
                  >
                    Directions
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No locations found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};