"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Redirect based on user role
    switch (user?.role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'teacher':
        router.push('/teacher');
        break;
      default:
        router.push('/student');
    }
  }, [user, isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}