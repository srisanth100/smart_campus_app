import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowText(true), 800);
    const timer3 = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 flex items-center justify-center z-50"
    >
      <div className="text-center">
        {showLogo && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative mb-6"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
              <GraduationCap size={48} className="text-primary-600" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles size={20} className="text-yellow-300" />
            </motion.div>
          </motion.div>
        )}
        
        {showText && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Smart Campus</h1>
            <p className="text-primary-100 text-lg">Your Digital Campus Assistant</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};