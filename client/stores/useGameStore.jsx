import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Direct properties for easy access
      totalPoints: 0,
      level: 1,
      streak: 0,
      achievements: [],
      
      userProgress: {
        totalPoints: 0,
        level: 1,
        badges: [],
        completedModules: [],
        streakDays: 0,
        lastPlayDate: null,
      },
      
      gameScores: {},
      gameProgress: {},
      leaderboard: [],
      currentModule: null,
      ecoMode: false,
      
      // Game Progress Methods
      updateProgress: (progressData) => {
        const currentProgress = get().userProgress;
        const updatedProgress = { ...currentProgress, ...progressData };
        set({ userProgress: updatedProgress });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
        }
      },
      
      addPoints: (points) => {
        const currentProgress = get().userProgress;
        const newTotalPoints = currentProgress.totalPoints + points;
        const newLevel = Math.floor(newTotalPoints / 1000) + 1;
        
        const updatedProgress = {
          ...currentProgress,
          totalPoints: newTotalPoints,
          level: newLevel,
          lastPlayDate: new Date().toISOString(),
        };
        
        set({ 
          userProgress: updatedProgress,
          totalPoints: newTotalPoints,
          level: newLevel
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
        }
      },
      
      addBadge: (badge) => {
        const currentProgress = get().userProgress;
        if (!currentProgress.badges.includes(badge)) {
          const updatedProgress = {
            ...currentProgress,
            badges: [...currentProgress.badges, badge],
          };
          set({ userProgress: updatedProgress });
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
          }
        }
      },
      
      completeModule: (moduleId) => {
        const currentProgress = get().userProgress;
        if (!currentProgress.completedModules.includes(moduleId)) {
          const updatedProgress = {
            ...currentProgress,
            completedModules: [...currentProgress.completedModules, moduleId],
          };
          set({ userProgress: updatedProgress });
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
          }
        }
      },
      
      updateGameScore: (gameId, score) => {
        const currentScores = get().gameScores;
        const updatedScores = {
          ...currentScores,
          [gameId]: {
            score,
            date: new Date().toISOString(),
            attempts: (currentScores[gameId]?.attempts || 0) + 1,
          },
        };
        
        set({ gameScores: updatedScores });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('gameScores', JSON.stringify(updatedScores));
        }
      },
      
      setCurrentModule: (module) => {
        set({ currentModule: module });
      },
      
      toggleEcoMode: () => {
        set({ ecoMode: !get().ecoMode });
      },
      
      // Initialize data from localStorage
      initializeGameData: () => {
        if (typeof window !== 'undefined') {
          const savedProgress = localStorage.getItem('userProgress');
          const savedScores = localStorage.getItem('gameScores');
          const savedGameProgress = localStorage.getItem('gameProgress');
          
          if (savedProgress) {
            try {
              const progressData = JSON.parse(savedProgress);
              set({ 
                userProgress: progressData,
                totalPoints: progressData.totalPoints || 0,
                level: progressData.level || 1,
                streak: progressData.streakDays || 0,
                achievements: progressData.badges || []
              });
            } catch (error) {
              console.error('Error parsing saved progress:', error);
            }
          }
          
          if (savedScores) {
            try {
              const scoresData = JSON.parse(savedScores);
              set({ gameScores: scoresData });
            } catch (error) {
              console.error('Error parsing saved scores:', error);
            }
          }
          
          if (savedGameProgress) {
            try {
              const gameProgressData = JSON.parse(savedGameProgress);
              set({ gameProgress: gameProgressData });
            } catch (error) {
              console.error('Error parsing saved game progress:', error);
            }
          }
        }
      },
      
      // Game progress methods
      updateGameProgress: (gameId, progressData) => {
        const currentProgress = get().gameProgress;
        const updatedProgress = {
          ...currentProgress,
          [gameId]: progressData
        };
        set({ gameProgress: updatedProgress });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('gameProgress', JSON.stringify(updatedProgress));
        }
      },
      
      getGameProgress: (gameId) => {
        return get().gameProgress[gameId] || { progress: 0, completed: false, bestScore: 0 };
      },
      
      // Reset all game data
      resetGameData: () => {
        const initialProgress = {
          totalPoints: 0,
          level: 1,
          badges: [],
          completedModules: [],
          streakDays: 0,
          lastPlayDate: null,
        };
        
        set({ 
          userProgress: initialProgress,
          gameScores: {},
          currentModule: null,
        });
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userProgress');
          localStorage.removeItem('gameScores');
        }
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);