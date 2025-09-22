import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => {
        set({ user: userData, isAuthenticated: true });
        localStorage.setItem('authUser', JSON.stringify(userData));
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('authUser');
        localStorage.removeItem('userProgress');
        localStorage.removeItem('gameScores');
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        const updatedUser = { ...currentUser, ...userData };
        set({ user: updatedUser });
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
      },
      
      initializeAuth: () => {
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('authUser');
          if (savedUser) {
            try {
              const userData = JSON.parse(savedUser);
              set({ user: userData, isAuthenticated: true });
            } catch (error) {
              console.error('Error parsing saved user data:', error);
              localStorage.removeItem('authUser');
            }
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);