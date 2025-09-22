"use client";

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Medal,
  Award,
  Target,
  Flame,
  CheckCircle,
  Lock
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGameStore } from '@/stores/useGameStore';

export default function AchievementsPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { achievements, totalPoints, level } = useGameStore();

  const allAchievements = [
    {
      id: 'first_game',
      name: 'First Steps',
      description: 'Complete your first game',
      icon: '🎯',
      points: 50,
      category: 'general',
      unlocked: totalPoints > 0,
      progress: totalPoints > 0 ? 100 : 0
    },
    {
      id: 'math_master',
      name: 'Math Master',
      description: 'Complete 5 mathematics games',
      icon: '🔢',
      points: 100,
      category: 'mathematics',
      unlocked: achievements.includes('math_master'),
      progress: Math.min((achievements.filter(a => a.includes('math')).length / 5) * 100, 100)
    },
    {
      id: 'science_explorer',
      name: 'Science Explorer',
      description: 'Complete 5 science games',
      icon: '🔬',
      points: 100,
      category: 'science',
      unlocked: achievements.includes('science_explorer'),
      progress: Math.min((achievements.filter(a => a.includes('science')).length / 5) * 100, 100)
    },
    {
      id: 'streak_3',
      name: '3-Day Streak',
      description: 'Play for 3 consecutive days',
      icon: '🔥',
      points: 75,
      category: 'streak',
      unlocked: achievements.includes('streak_3'),
      progress: Math.min((totalPoints > 200 ? 3 : Math.floor(totalPoints / 100)) / 3 * 100, 100)
    },
    {
      id: 'level_up',
      name: 'Level Up',
      description: 'Reach level 5',
      icon: '⬆️',
      points: 150,
      category: 'level',
      unlocked: level >= 5,
      progress: Math.min((level / 5) * 100, 100)
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Get 100% score in any game',
      icon: '💯',
      points: 200,
      category: 'score',
      unlocked: achievements.includes('perfectionist'),
      progress: achievements.includes('perfectionist') ? 100 : 0
    },
    {
      id: 'tech_pioneer',
      name: 'Tech Pioneer',
      description: 'Complete 3 technology games',
      icon: '💻',
      points: 125,
      category: 'technology',
      unlocked: achievements.includes('tech_pioneer'),
      progress: Math.min((achievements.filter(a => a.includes('tech')).length / 3) * 100, 100)
    },
    {
      id: 'engineer_builder',
      name: 'Engineer Builder',
      description: 'Complete 3 engineering games',
      icon: '🛠️',
      points: 125,
      category: 'engineering',
      unlocked: achievements.includes('engineer_builder'),
      progress: Math.min((achievements.filter(a => a.includes('engineer')).length / 3) * 100, 100)
    }
  ];

  const categorizedAchievements = {
    general: allAchievements.filter(a => a.category === 'general'),
    mathematics: allAchievements.filter(a => a.category === 'mathematics'),
    science: allAchievements.filter(a => a.category === 'science'),
    technology: allAchievements.filter(a => a.category === 'technology'),
    engineering: allAchievements.filter(a => a.category === 'engineering'),
    streak: allAchievements.filter(a => a.category === 'streak'),
    level: allAchievements.filter(a => a.category === 'level'),
    score: allAchievements.filter(a => a.category === 'score')
  };

  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalCount = allAchievements.length;

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🏆 Achievements
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Track your progress and unlock rewards as you master STEM subjects
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {unlockedCount}/{totalCount} Unlocked
            </Badge>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">
                {allAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)} Points Earned
              </span>
            </div>
          </div>
        </div>

        {/* Achievement Categories */}
        {Object.entries(categorizedAchievements).map(([category, categoryAchievements]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 capitalize">
              {category === 'general' ? 'General Achievements' : `${category} Achievements`}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAchievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`transition-all duration-200 ${
                    achievement.unlocked 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted bg-muted/30'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{achievement.icon}</div>
                      {achievement.unlocked ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <CardTitle className={achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}>
                      {achievement.name}
                    </CardTitle>
                    <CardDescription>
                      {achievement.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{Math.round(achievement.progress)}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          <Trophy className="h-3 w-3 mr-1" />
                          {achievement.points} pts
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}