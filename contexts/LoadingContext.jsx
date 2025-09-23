'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PageLoader } from '@/components/ui/loader';
import { AnimatePresence } from 'framer-motion';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

const getLoadingTypeForPath = (pathname) => {
  if (pathname?.startsWith('/games/')) return 'game';
  if (pathname?.includes('dashboard') || pathname?.includes('progress')) return 'dots';
  if (pathname === '/' || pathname?.includes('offline')) return 'plant';
  return 'default';
};

const getLoadingMessageForPath = (pathname) => {
  if (pathname?.startsWith('/games/')) {
    if (pathname.includes('mathematics')) return 'Loading Math Adventure...';
    if (pathname.includes('science')) return 'Preparing Science Lab...';
    if (pathname.includes('engineering')) return 'Building Engineering Challenge...';
    if (pathname.includes('technology')) return 'Coding Challenge Loading...';
    return 'Loading Game...';
  }
  
  if (pathname?.includes('dashboard')) return 'Loading Dashboard...';
  if (pathname?.includes('leaderboard')) return 'Fetching Rankings...';
  if (pathname?.includes('achievements')) return 'Loading Achievements...';
  if (pathname?.includes('progress')) return 'Analyzing Progress...';
  if (pathname?.includes('login')) return 'Preparing Login...';
  if (pathname?.includes('signup')) return 'Setting up Registration...';
  if (pathname?.includes('offline')) return 'Preparing Offline Mode...';
  
  return 'Loading...';
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [loadingType, setLoadingType] = useState('default');
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Navigation loading effect
  useEffect(() => {
    setIsLoading(true);
    const currentLoadingType = getLoadingTypeForPath(pathname);
    setLoadingType(currentLoadingType);
    setLoadingMessage(getLoadingMessageForPath(pathname));
    
    // Simulate loading progress for certain pages
    const shouldShowProgress = pathname?.startsWith('/games/') || 
                              pathname?.includes('dashboard') ||
                              pathname?.includes('progress');
    
    setShowProgress(shouldShowProgress);
    
    if (shouldShowProgress) {
      setProgress(0);
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 150);
    }

    // Hide loading after a short delay to allow page to mount
    const isPlantLoader = currentLoadingType === 'plant';
    const baseDelay = isPlantLoader ? 3500 : 800; // Longer for plant animation (4s total for full growth)
    const randomDelay = isPlantLoader ? 500 : 400;
    
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        setShowProgress(false);
      }, 300);
    }, baseDelay + Math.random() * randomDelay);

    return () => {
      clearTimeout(timer);
      if (shouldShowProgress) {
        // Clear any progress interval if component unmounts
      }
    };
  }, [pathname, searchParams]);

  // Manual loading control functions
  const startLoading = (message = 'Loading...', type = 'default', withProgress = false) => {
    setLoadingMessage(message);
    setLoadingType(type);
    setShowProgress(withProgress);
    setProgress(0);
    setIsLoading(true);
  };

  const stopLoading = () => {
    if (showProgress) {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        setShowProgress(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  };

  const updateProgress = (newProgress) => {
    setProgress(Math.min(Math.max(newProgress, 0), 100));
  };

  const value = {
    isLoading,
    loadingMessage,
    loadingType,
    showProgress,
    progress,
    startLoading,
    stopLoading,
    updateProgress,
    setLoadingMessage,
    setLoadingType,
  };

  return (
    <LoadingContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader
            key="page-loader"
            message={loadingMessage}
            type={loadingType}
            showProgress={showProgress}
            progress={progress}
          />
        )}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;