'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import {Footer} from '@/components/Footer';

const AppLayout = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme } = useTheme();

  // Pages that should not show header/footer (full-screen experiences)
  const noLayoutPages = [
    '/login',
    '/signup',
    '/auth/login',
    '/auth/signup'
  ];

  // Game pages that should only show minimal header (no footer for immersion)
  const gamePages = pathname?.startsWith('/games/');

  // Check if current page should have no layout
  const shouldHideLayout = noLayoutPages.some(page => pathname?.startsWith(page));

  // Apply theme class to body
  if (typeof document !== 'undefined') {
    document.documentElement.className = theme === 'dark' ? 'dark' : '';
  }

  // If it's a no-layout page, render children only
  if (shouldHideLayout) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header Navigation - Always visible except on no-layout pages */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navigation />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer - Hide on game pages for better immersion */}
      {!gamePages && (
        <footer className="mt-auto border-t bg-background">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default AppLayout;