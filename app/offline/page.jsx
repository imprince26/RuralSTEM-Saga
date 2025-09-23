"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw, BookOpen, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    } else {
      alert('Still offline. Please check your internet connection.');
    }
  };

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader className="pb-8">
            <div className="mx-auto mb-6 p-4 bg-orange-100 rounded-full w-fit">
              <WifiOff className="h-12 w-12 text-orange-600" />
            </div>
            <CardTitle className="text-3xl mb-4">You're Offline</CardTitle>
            <p className="text-muted-foreground text-lg">
              Don't worry! You can still access some features of RuralSTEM Saga while offline.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Available Offline Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Available Offline:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Gamepad2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-800">Downloaded Games</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Play games you've previously loaded
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-blue-800">Cached Content</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Access previously viewed lessons
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button onClick={handleRetry} size="lg" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/games">
                    View Games
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/student">
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Helpful Tips */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <h4 className="font-medium text-yellow-800 mb-2">💡 Offline Learning Tips:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Your progress will sync when you're back online</li>
                <li>• Download lessons while connected for offline access</li>
                <li>• Games will remember your scores and achievements</li>
                <li>• Use airplane mode to practice without distractions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}