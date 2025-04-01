'use client';

import { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';

export const WelcomeOverlay = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }
  }, []);
  
  const handleContinue = () => {
    setShowWelcome(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };
  
  if (!isMounted || !showWelcome) {
    return null;
  }
  
  return <WelcomeScreen onContinue={handleContinue} />;
};