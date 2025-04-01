'use client';

import React from 'react';
import { FiHardDrive, FiArrowRight } from 'react-icons/fi';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="text-center max-w-md px-4 py-16 rounded-xl bg-gray-800 shadow-2xl border border-gray-700 flex flex-col items-center">
        <div className="bg-purple-400 w-24 h-24 rounded-xl flex items-center justify-center shadow-lg mb-6">
          <FiHardDrive className="text-gray-900 text-5xl" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">Welcome to Store It!</h1>
        <p className="text-gray-300 mb-8">Tu solución personal para almacenamiento en la nube</p>
        
        <button 
          onClick={onContinue}
          className="group flex items-center space-x-2 bg-purple-400 hover:bg-purple-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
        >
          <span>Click to continue</span>
          <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};