'use client';

import { lazy, Suspense } from 'react';
import { InlineLoader, GameCardSkeleton, UserCardSkeleton } from '@/components/ui/loader';

// Higher-order component for lazy loading with custom fallback
export const withLazyLoading = (
  importFunc, 
  fallbackComponent = <InlineLoader message="Loading component..." className="py-8" />
) => {
  const LazyComponent = lazy(importFunc);
  
  return function LazyLoadedComponent(props) {
    return (
      <Suspense fallback={fallbackComponent}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Pre-configured lazy loading wrappers for common use cases
export const LazyGameCard = ({ children, fallback }) => (
  <Suspense fallback={fallback || <GameCardSkeleton />}>
    {children}
  </Suspense>
);

export const LazyUserCard = ({ children, fallback }) => (
  <Suspense fallback={fallback || <UserCardSkeleton />}>
    {children}
  </Suspense>
);

export const LazySection = ({ 
  children, 
  fallback = <InlineLoader message="Loading section..." className="py-12" />
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Lazy loading for route components
export const LazyRoute = ({ 
  children, 
  fallback = <InlineLoader message="Loading page..." className="py-16" />
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

export default withLazyLoading;