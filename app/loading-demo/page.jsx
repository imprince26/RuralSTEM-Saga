'use client';

import { useState } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { useAsyncOperation } from '@/hooks/useLoading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PageLoader, 
  InlineLoader, 
  ButtonLoader, 
  GameCardSkeleton, 
  UserCardSkeleton 
} from '@/components/ui/loader';
import { LazySection } from '@/components/ui/lazy-loading';
import { 
  RiPlayFill, 
  RiStopFill, 
  RiRefreshLine, 
  RiTestTubeLine,
  RiGamepadLine,
  RiTimeLine 
} from 'react-icons/ri';

// Mock async function
const mockApiCall = (delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Success!' });
    }, delay);
  });
};

export default function LoadingDemoPage() {
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { execute, isLoading: isAsyncLoading } = useAsyncOperation();
  const [showSkeletons, setShowSkeletons] = useState(false);

  const testPageLoader = (type) => {
    const messages = {
      plant: 'Growing your knowledge...',
      game: 'Loading game world...',
      dots: 'Processing data...',
      default: 'Loading content...'
    };
    
    startLoading(messages[type], type, true);
    
    // Stop after 3 seconds
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };

  const testAsyncOperation = () => {
    execute(() => mockApiCall(2000), {
      loadingMessage: 'Performing async operation...',
      loadingType: 'dots',
      showProgress: true,
      showGlobalLoader: true
    });
  };

  const LazyContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiGamepadLine className="h-5 w-5" />
            Math Adventure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Explore the world of numbers and equations in this exciting adventure game.
          </p>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">Easy</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <RiTimeLine className="h-4 w-4" />
              15 min
            </div>
          </div>
          <Button className="w-full">
            <RiPlayFill className="h-4 w-4 mr-2" />
            Play Now
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiTestTubeLine className="h-5 w-5" />
            Science Lab
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Conduct virtual experiments and learn about chemical reactions.
          </p>
          <div className="flex items-center gap-2 mb-3">
            <Badge>Medium</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <RiTimeLine className="h-4 w-4" />
              25 min
            </div>
          </div>
          <Button className="w-full" variant="outline">
            <RiPlayFill className="h-4 w-4 mr-2" />
            Start Lab
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Loading System Demo</h1>
        <p className="text-muted-foreground">
          Showcase of the comprehensive loading system for RuralSTEM-Saga
        </p>
      </div>

      {/* Global Page Loaders */}
      <Card>
        <CardHeader>
          <CardTitle>Global Page Loaders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => testPageLoader('plant')}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
            >
              <RiPlayFill className="h-5 w-5" />
              <span className="text-sm">Plant Loader</span>
            </Button>
            
            <Button 
              onClick={() => testPageLoader('game')}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
            >
              <RiGamepadLine className="h-5 w-5" />
              <span className="text-sm">Game Loader</span>
            </Button>
            
            <Button 
              onClick={() => testPageLoader('dots')}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
            >
              <RiRefreshLine className="h-5 w-5" />
              <span className="text-sm">Dots Loader</span>
            </Button>
            
            <Button 
              onClick={() => testPageLoader('default')}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4"
            >
              <RiTestTubeLine className="h-5 w-5" />
              <span className="text-sm">Default Loader</span>
            </Button>
          </div>
          
          <Button 
            onClick={() => stopLoading()}
            variant="destructive"
            size="sm"
            disabled={!isLoading}
          >
            <RiStopFill className="h-4 w-4 mr-2" />
            Stop Loading
          </Button>
        </CardContent>
      </Card>

      {/* Inline Loaders */}
      <Card>
        <CardHeader>
          <CardTitle>Inline Loaders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Small Loader</h4>
              <InlineLoader size="sm" message="Loading..." />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Default Loader</h4>
              <InlineLoader message="Processing data..." />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Large Loader</h4>
              <InlineLoader size="lg" message="Loading content..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button with Loader */}
      <Card>
        <CardHeader>
          <CardTitle>Button Loaders & Async Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <Button 
              onClick={testAsyncOperation}
              disabled={isAsyncLoading}
              className="min-w-[160px]"
            >
              {isAsyncLoading ? (
                <div className="flex items-center gap-2">
                  <ButtonLoader />
                  Loading...
                </div>
              ) : (
                'Test Async Operation'
              )}
            </Button>
            
            <Button variant="outline" disabled>
              <ButtonLoader size="sm" />
              <span className="ml-2">Button Loading</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Loaders */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loaders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <Button 
              onClick={() => setShowSkeletons(!showSkeletons)}
              variant={showSkeletons ? "default" : "outline"}
            >
              {showSkeletons ? 'Hide' : 'Show'} Skeletons
            </Button>
          </div>
          
          {showSkeletons ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="font-medium">Game Card Skeletons</h4>
                <GameCardSkeleton />
                <GameCardSkeleton />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">User Card Skeletons</h4>
                <UserCardSkeleton />
                <UserCardSkeleton />
                <UserCardSkeleton />
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              Click "Show Skeletons" to see the skeleton loading states
            </p>
          )}
        </CardContent>
      </Card>

      {/* Lazy Loading */}
      <Card>
        <CardHeader>
          <CardTitle>Lazy Loading Components</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The content below is loaded lazily with Suspense boundaries:
          </p>
          
          <LazySection>
            <LazyContent />
          </LazySection>
        </CardContent>
      </Card>

      {/* Navigation Loading Info */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Loading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Automatic Navigation Loading:</strong> Loading indicators appear automatically when navigating between pages.
            </p>
            <p>
              <strong>Smart Detection:</strong> Different loading types are used based on the destination page:
            </p>
            <ul className="ml-4 space-y-1 text-muted-foreground">
              <li>• Games pages use game-themed loaders</li>
              <li>• Dashboard pages use dot loaders with progress</li>
              <li>• Home/Offline pages use plant growth loaders</li>
              <li>• Auth pages use appropriate messaging</li>
            </ul>
            <p>
              <strong>Progress Tracking:</strong> Certain pages show loading progress for better user experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}