import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const useGameStore = create(
  persist(
    (set, get) => ({
      // User Authentication State
      user: null,
      isAuthenticated: false,
      authToken: null,
      
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
      
      // Loading states
      isLoading: false,
      error: null,
      
      // Authentication Methods
      setUser: (user, token) => {
        set({ 
          user, 
          authToken: token, 
          isAuthenticated: !!user,
          totalPoints: user?.stats?.totalGamesPlayed || 0,
          level: Math.floor((user?.stats?.totalGamesPlayed || 0) / 10) + 1,
          streak: user?.stats?.streakCount || 0
        });
      },
      
      logout: () => {
        set({ 
          user: null, 
          authToken: null, 
          isAuthenticated: false,
          totalPoints: 0,
          level: 1,
          streak: 0,
          achievements: []
        });
        // Clear auth cookie
        if (typeof window !== 'undefined') {
          document.cookie = 'auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      },
      
      // Enhanced Game Progress Methods with API Integration
      updateGameProgress: async (gameId, score, questionsAttempted, totalQuestions, timeSpent, streak = 0) => {
        const state = get();
        set({ isLoading: true, error: null });
        
        try {
          // Determine category from gameId
          const category = getGameCategory(gameId);
          const maxScore = totalQuestions * 15; // Assuming 15 points per question max
          
          // If user is authenticated, save to database
          if (state.isAuthenticated && state.user) {
            const response = await fetch(`${API_BASE_URL}/games/progress`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.authToken}`
              },
              body: JSON.stringify({
                userId: state.user._id,
                gameId,
                category,
                score,
                maxScore,
                questionsAttempted,
                totalQuestions,
                timeSpent,
                streak
              })
            });
            
            if (!response.ok) {
              throw new Error('Failed to save game progress');
            }
            
            const data = await response.json();
            
            // Update local achievements if new ones were earned
            if (data.newAchievements && data.newAchievements.length > 0) {
              const currentAchievements = state.achievements;
              const updatedAchievements = [...currentAchievements, ...data.newAchievements];
              set({ achievements: updatedAchievements });
            }
          }
          
          // Update local game progress
          const currentProgress = state.gameProgress;
          const updatedProgress = {
            ...currentProgress,
            [gameId]: {
              score,
              maxScore,
              questionsAttempted,
              totalQuestions,
              timeSpent,
              streak,
              completed: questionsAttempted >= totalQuestions,
              accuracy: Math.round((score / maxScore) * 100),
              lastPlayed: new Date().toISOString()
            }
          };
          
          // Update user stats
          const updatedUserProgress = {
            ...state.userProgress,
            totalPoints: state.userProgress.totalPoints + score,
            lastPlayDate: new Date().toISOString()
          };
          
          set({ 
            gameProgress: updatedProgress,
            userProgress: updatedUserProgress,
            totalPoints: updatedUserProgress.totalPoints,
            level: Math.floor(updatedUserProgress.totalPoints / 1000) + 1,
            isLoading: false
          });
          
          // Save to localStorage as backup
          if (typeof window !== 'undefined') {
            localStorage.setItem('gameProgress', JSON.stringify(updatedProgress));
            localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
          }
          
        } catch (error) {
          console.error('Error updating game progress:', error);
          set({ error: error.message, isLoading: false });
          
          // Fallback to local storage only
          get().updateLocalGameProgress(gameId, score, questionsAttempted, totalQuestions, timeSpent, streak);
        }
      },
      
      // Local fallback method
      updateLocalGameProgress: (gameId, score, questionsAttempted, totalQuestions, timeSpent, streak) => {
        const state = get();
        const maxScore = totalQuestions * 15;
        
        const currentProgress = state.gameProgress;
        const updatedProgress = {
          ...currentProgress,
          [gameId]: {
            score,
            maxScore,
            questionsAttempted,
            totalQuestions,
            timeSpent,
            streak,
            completed: questionsAttempted >= totalQuestions,
            accuracy: Math.round((score / maxScore) * 100),
            lastPlayed: new Date().toISOString()
          }
        };
        
        const updatedUserProgress = {
          ...state.userProgress,
          totalPoints: state.userProgress.totalPoints + score,
          lastPlayDate: new Date().toISOString()
        };
        
        set({ 
          gameProgress: updatedProgress,
          userProgress: updatedUserProgress,
          totalPoints: updatedUserProgress.totalPoints,
          level: Math.floor(updatedUserProgress.totalPoints / 1000) + 1
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('gameProgress', JSON.stringify(updatedProgress));
          localStorage.setItem('userProgress', JSON.stringify(updatedUserProgress));
        }
      },
      
      // Fetch user achievements from API
      fetchAchievements: async () => {
        const state = get();
        if (!state.isAuthenticated || !state.user) return;
        
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`${API_BASE_URL}/achievements?userId=${state.user._id}`, {
            headers: {
              'Authorization': `Bearer ${state.authToken}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch achievements');
          }
          
          const data = await response.json();
          set({ 
            achievements: data.achievements,
            totalPoints: data.totalPoints,
            isLoading: false 
          });
          
        } catch (error) {
          console.error('Error fetching achievements:', error);
          set({ error: error.message, isLoading: false });
        }
      },
      
      // Fetch leaderboard
      fetchLeaderboard: async (category = 'overall', period = 'all-time') => {
        set({ isLoading: true, error: null });
        
        try {
          const state = get();
          const userId = state.isAuthenticated ? state.user._id : '';
          const response = await fetch(
            `${API_BASE_URL}/leaderboard?category=${category}&period=${period}&userId=${userId}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch leaderboard');
          }
          
          const data = await response.json();
          set({ 
            leaderboard: data.topPlayers,
            isLoading: false 
          });
          
          return data;
          
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
          set({ error: error.message, isLoading: false });
          return null;
        }
      },
      
      // Existing methods (preserved for backward compatibility)
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
      
      getGameProgress: (gameId) => {
        return get().gameProgress[gameId] || { 
          progress: 0, 
          completed: false, 
          bestScore: 0,
          accuracy: 0,
          timeSpent: 0
        };
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
          gameProgress: {},
          currentModule: null,
          achievements: [],
          totalPoints: 0,
          level: 1,
          streak: 0
        });
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('userProgress');
          localStorage.removeItem('gameScores');
          localStorage.removeItem('gameProgress');
        }
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userProgress: state.userProgress,
        gameScores: state.gameScores,
        gameProgress: state.gameProgress,
        currentModule: state.currentModule,
        ecoMode: state.ecoMode,
        // Don't persist sensitive auth data or loading states
      }),
    }
  )
);

// Helper function to determine game category
function getGameCategory(gameId) {
  const mathGames = ['algebra-adventure', 'basic-arithmetic', 'fraction-pizza', 'geometry-builder', 'graph-explorer', 'number-quest', 'pattern-master', 'probability-casino'];
  const scienceGames = ['atom-builder', 'biology-explorer', 'chemistry-lab', 'ecosystem-manager', 'periodic-table', 'physics-lab', 'solar-system', 'weather-wizard'];
  const techGames = ['ai-trainer', 'algorithm-arena', 'app-architect', 'code-creator', 'coding-basics', 'database-detective', 'digital-citizen', 'web-designer'];
  const engineeringGames = ['bridge-builder', 'circuit-master', 'city-planner', 'green-engineer', 'material-tester', 'robot-builder', 'rocket-designer', 'simple-machines'];
  
  if (mathGames.includes(gameId)) return 'mathematics';
  if (scienceGames.includes(gameId)) return 'science';
  if (techGames.includes(gameId)) return 'technology';
  if (engineeringGames.includes(gameId)) return 'engineering';
  return 'general';
}