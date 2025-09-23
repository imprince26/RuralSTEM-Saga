"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  Trophy,
  Star,
  Calendar,
  Clock,
  Target,
  PlayCircle,
  Award,
  TrendingUp,
  Flame,
  Users,
  ChevronRight,
  Calculator,
  FlaskConical,
  Laptop,
  Hammer
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGameStore } from '@/stores/useGameStore';
import Link from 'next/link';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { totalPoints, level, streak, achievements } = useGameStore();

  const [currentStreak, setCurrentStreak] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(5); // 5 games per week
  const [gamesPlayedThisWeek, setGamesPlayedThisWeek] = useState(2);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Simulate loading user data
    setCurrentStreak(streak);
  }, [isAuthenticated, streak, router]);

  const subjects = [
    {
      id: 'mathematics',
      name: t('subjects.mathematics.title'),
      description: t('subjects.mathematics.description'),
      icon: <Calculator className="h-6 w-6" />,
      color: 'bg-blue-500',
      progress: 65,
      completedGames: 8,
      totalGames: 12
    },
    {
      id: 'science',
      name: t('subjects.science.title'),
      description: t('subjects.science.description'),
      icon: <FlaskConical className="h-6 w-6" />,
      color: 'bg-green-500',
      progress: 40,
      completedGames: 5,
      totalGames: 12
    },
    {
      id: 'technology',
      name: t('subjects.technology.title'),
      description: t('subjects.technology.description'),
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-purple-500',
      progress: 20,
      completedGames: 2,
      totalGames: 10
    },
    {
      id: 'engineering',
      name: t('subjects.engineering.title'),
      description: t('subjects.engineering.description'),
      icon: <Hammer className="h-6 w-6" />,
      color: 'bg-orange-500',
      progress: 30,
      completedGames: 3,
      totalGames: 10
    }
  ];

  const recentAchievements = [
    {
      id: 'first_game',
      name: 'First Steps',
      description: 'Completed your first game!',
      icon: '🎯',
      dateEarned: '2024-01-15',
      points: 50
    },
    {
      id: 'math_master',
      name: 'Math Master',
      description: 'Completed 5 math games',
      icon: '🔢',
      dateEarned: '2024-01-16',
      points: 100
    },
    {
      id: 'streak_3',
      name: '3-Day Streak',
      description: 'Played for 3 consecutive days',
      icon: '🔥',
      dateEarned: '2024-01-17',
      points: 75
    }
  ];

  const upcomingEvents = [
    {
      id: 'math_quiz',
      title: 'Math Quiz Challenge',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'quiz',
      participants: 25
    },
    {
      id: 'science_fair',
      title: 'Virtual Science Fair',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'event',
      participants: 150
    }
  ];

  const weeklyProgress = Math.round((gamesPlayedThisWeek / weeklyGoal) * 100);

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user?.fullName || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning adventure?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">
                    {t('dashboard.points')}
                  </p>
                  <p className="text-lg lg:text-2xl font-bold">{totalPoints}</p>
                </div>
                <Star className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">
                    {t('dashboard.level')}
                  </p>
                  <p className="text-lg lg:text-2xl font-bold">{level}</p>
                </div>
                <Trophy className="h-6 w-6 lg:h-8 lg:w-8 text-green-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">
                    {t('dashboard.streak')}
                  </p>
                  <p className="text-lg lg:text-2xl font-bold">{currentStreak} <span className="text-sm font-normal">days</span></p>
                </div>
                <Flame className="h-6 w-6 lg:h-8 lg:w-8 text-orange-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">
                    {t('dashboard.badges')}
                  </p>
                  <p className="text-lg lg:text-2xl font-bold">{achievements.length}</p>
                </div>
                <Award className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Weekly Learning Goal
                </CardTitle>
                <CardDescription>
                  Play {weeklyGoal} games this week to maintain your learning streak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Games Played: {gamesPlayedThisWeek}/{weeklyGoal}</span>
                    <span>{weeklyProgress}%</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-3" />
                  {weeklyProgress >= 100 ? (
                    <p className="text-sm text-green-600">🎉 Weekly goal achieved!</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {weeklyGoal - gamesPlayedThisWeek} more games to reach your goal
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>
                  Your progress across different STEM subjects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${subject.color} text-white p-2 rounded-lg`}>
                          {subject.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {subject.completedGames}/{subject.totalGames} games completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{subject.progress}%</p>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/games/${subject.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/games">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {t('dashboard.playGames')}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/progress">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {t('dashboard.viewProgress')}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/leaderboard">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Your latest accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +{achievement.points}
                    </Badge>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="/achievements">
                    View All Achievements
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.participants}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}