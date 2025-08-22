import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, Users, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CafeteriaItem, QueueStatus } from '../../types';

const mockQueueStatus: QueueStatus[] = [
  {
    cafeteriaId: '1',
    name: 'Main Cafeteria',
    currentQueue: 12,
    estimatedWait: 8,
    status: 'medium',
    lastUpdated: '2 minutes ago'
  },
  {
    cafeteriaId: '2',
    name: 'Food Court',
    currentQueue: 5,
    estimatedWait: 3,
    status: 'low',
    lastUpdated: '1 minute ago'
  },
  {
    cafeteriaId: '3',
    name: 'Coffee Shop',
    currentQueue: 18,
    estimatedWait: 15,
    status: 'high',
    lastUpdated: '30 seconds ago'
  }
];

const mockMenuItems: CafeteriaItem[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    availability: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Caesar Salad',
    price: 6.99,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    availability: true,
    rating: 4.2
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    price: 4.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'desserts',
    availability: true,
    rating: 4.8
  },
  {
    id: '4',
    name: 'Iced Coffee',
    price: 3.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beverages',
    availability: true,
    rating: 4.3
  },
  {
    id: '5',
    name: 'Pizza Slice',
    price: 5.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    availability: false,
    rating: 4.1
  },
  {
    id: '6',
    name: 'Fruit Smoothie',
    price: 4.49,
    image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'beverages',
    availability: true,
    rating: 4.6
  }
];

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'main', name: 'Main Dishes' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'desserts', name: 'Desserts' }
];

export const CafeteriaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);

  const filteredItems = mockMenuItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'low': return 'Low Wait';
      case 'medium': return 'Medium Wait';
      case 'high': return 'High Wait';
      default: return 'Unknown';
    }
  };

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = mockMenuItems.find(i => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cafeteria</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Check queue status and pre-order your meals</p>
        </div>
        {getCartItemCount() > 0 && (
          <Button
            variant="primary"
            onClick={() => setShowCart(true)}
            className="flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Cart ({getCartItemCount()})
          </Button>
        )}
      </div>

      {/* Queue Status */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real-time Queue Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockQueueStatus.map((queue, index) => (
            <motion.div
              key={queue.cafeteriaId}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{queue.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(queue.status)}`}>
                    {getStatusText(queue.status)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Users size={16} className="mr-2" />
                      <span className="text-sm">People in queue</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{queue.currentQueue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">Estimated wait</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{queue.estimatedWait} min</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(queue.status)}`}
                      style={{ width: `${Math.min((queue.currentQueue / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {queue.lastUpdated}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden">
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {!item.availability && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">${item.price}</span>
                    
                    {item.availability ? (
                      <div className="flex items-center gap-2">
                        {cart[item.id] > 0 && (
                          <>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-semibold text-gray-900 dark:text-white min-w-[20px] text-center">
                              {cart[item.id]}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Unavailable</span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {getCartItemCount() > 0 && (
        <Card className="p-6 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Order Summary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getCartItemCount()} items • Total: ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <Button variant="primary">
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};