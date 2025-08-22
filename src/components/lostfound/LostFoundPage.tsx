import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, MapPin, Calendar, User, CheckCircle, ArrowLeft, X, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LostFoundItem } from '../../types';

const mockItems: LostFoundItem[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    description: 'Black iPhone 13 Pro with a blue case. Lost near the library.',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'electronics',
    status: 'lost',
    location: 'Central Library',
    dateReported: '2024-12-10',
    reportedBy: 'John Doe',
    contactInfo: 'john.doe@university.edu'
  },
  {
    id: '2',
    title: 'Red Backpack',
    description: 'Red Nike backpack with laptop compartment. Contains textbooks.',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'accessories',
    status: 'found',
    location: 'Student Center',
    dateReported: '2024-12-09',
    reportedBy: 'Jane Smith',
    contactInfo: 'jane.smith@university.edu'
  },
  {
    id: '3',
    title: 'Calculus Textbook',
    description: 'Stewart Calculus 8th Edition with yellow highlighter marks.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'books',
    status: 'found',
    location: 'Mathematics Building',
    dateReported: '2024-12-08',
    reportedBy: 'Mike Johnson',
    contactInfo: 'mike.johnson@university.edu'
  },
  {
    id: '4',
    title: 'Blue Hoodie',
    description: 'University branded blue hoodie, size M. Left in cafeteria.',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'clothing',
    status: 'lost',
    location: 'Main Cafeteria',
    dateReported: '2024-12-07',
    reportedBy: 'Sarah Wilson',
    contactInfo: 'sarah.wilson@university.edu'
  }
];

const categories = [
  { id: 'all', name: 'All Items', color: 'bg-gray-100 text-gray-800' },
  { id: 'electronics', name: 'Electronics', color: 'bg-blue-100 text-blue-800' },
  { id: 'clothing', name: 'Clothing', color: 'bg-purple-100 text-purple-800' },
  { id: 'books', name: 'Books', color: 'bg-green-100 text-green-800' },
  { id: 'accessories', name: 'Accessories', color: 'bg-orange-100 text-orange-800' },
  { id: 'other', name: 'Other', color: 'bg-pink-100 text-pink-800' }
];

const statusFilters = [
  { id: 'all', name: 'All Status' },
  { id: 'lost', name: 'Lost Items' },
  { id: 'found', name: 'Found Items' },
  { id: 'claimed', name: 'Claimed Items' }
];

export const LostFoundPage: React.FC = () => {
  const [items, setItems] = useState(mockItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    category: 'electronics',
    status: 'lost',
    location: '',
    contactInfo: ''
  });
  const navigate = useNavigate();

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lost': return 'bg-red-100 text-red-800';
      case 'found': return 'bg-green-100 text-green-800';
      case 'claimed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClaim = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, status: 'claimed' as const }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lost & Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Help find lost items or report found items</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Report Item
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Filter size={16} className="mr-2" />
                Category:
              </span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : category.color
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
              {statusFilters.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="overflow-hidden group">
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    {new Date(item.dateReported).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <User size={16} className="mr-2" />
                    {item.reportedBy}
                  </div>
                </div>

                <div className="flex gap-2">
                  {item.status !== 'claimed' && (
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => handleClaim(item.id)}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      {item.status === 'lost' ? 'I Found This' : 'This is Mine'}
                    </Button>
                  )}
                  {item.status === 'claimed' && (
                    <div className="w-full text-center py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
                      Item Claimed
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (

      {/* Report Item Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Report Item</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const newItem: LostFoundItem = {
                id: Date.now().toString(),
                title: reportForm.title,
                description: reportForm.description,
                category: reportForm.category as any,
                status: reportForm.status as any,
                location: reportForm.location,
                dateReported: new Date().toISOString().split('T')[0],
                reportedBy: 'Current User',
                contactInfo: reportForm.contactInfo,
                image: 'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=400'
              };
              setItems(prev => [newItem, ...prev]);
              setShowReportModal(false);
              setReportForm({
                title: '',
                description: '',
                category: 'electronics',
                status: 'lost',
                location: '',
                contactInfo: ''
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Item Title
                </label>
                <input
                  type="text"
                  value={reportForm.title}
                  onChange={(e) => setReportForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g., iPhone 13 Pro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Describe the item in detail..."
                  rows={3}
                  required
                />
              </div>
        <div className="text-center py-12">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={reportForm.category}
                    onChange={(e) => setReportForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="accessories">Accessories</option>
                    <option value="other">Other</option>
                  </select>
                </div>
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={reportForm.status}
                    onChange={(e) => setReportForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
              </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={reportForm.location}
                  onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Where was it lost/found?"
                  required
                />
              </div>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Information
                </label>
                <input
                  type="email"
                  value={reportForm.contactInfo}
                  onChange={(e) => setReportForm(prev => ({ ...prev, contactInfo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@university.edu"
                  required
                />
              </div>
        </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
      )}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  Report Item
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};