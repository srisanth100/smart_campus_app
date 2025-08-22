import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Search, Coffee, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

interface OnboardingSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    icon: <Calendar size={64} />,
    title: "Discover Events",
    description: "Stay updated with campus events, workshops, and activities. Never miss what matters to you.",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: <Search size={64} />,
    title: "Lost & Found",
    description: "Report lost items or help others find their belongings with our smart matching system.",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: <Coffee size={64} />,
    title: "Cafeteria Tracker",
    description: "Check real-time queue status and pre-order your meals to save time.",
    color: "from-orange-500 to-pink-500"
  },
  {
    icon: <MapPin size={64} />,
    title: "Campus Navigation",
    description: "Find your way around campus with interactive maps and route planning.",
    color: "from-purple-500 to-indigo-600"
  }
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentSlide
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        <button
          onClick={skipOnboarding}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
        >
          Skip
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-12">
              <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center text-white shadow-2xl`}>
                {slides[currentSlide].icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                {slides[currentSlide].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="p-6">
        <Button
          onClick={nextSlide}
          variant="primary"
          size="lg"
          fullWidth
          className="group"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};