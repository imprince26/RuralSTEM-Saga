"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp,
  Calendar,
  Trophy,
  Star,
  BookOpen,
  Clock,
  Target,
  BarChart3,
  Calculator,
  FlaskConical,
  Laptop,
  Hammer
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGameStore } from '@/stores/useGameStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function ProgressPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { totalPoints, level, streak } = useGameStore();
  
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock progress data
  const weeklyProgress = [
    { name: 'Mon', points: 45, games: 2 },
    { name: 'Tue', points: 78, games: 3 },
    { name: 'Wed', points: 32, games: 1 },
    { name: 'Thu', points: 95, games: 4 },
    { name: 'Fri', points: 123, games: 5 },
    { name: 'Sat', points: 87, games: 3 },
    { name: 'Sun', points: 65, games: 2 }
  ];

  const monthlyProgress = [
    { name: 'Week 1', points: 245, games: 12 },
    { name: 'Week 2', points: 398, games: 18 },
    { name: 'Week 3', points: 456, games: 22 },
    { name: 'Week 4', points: 523, games: 25 }
  ];

  const subjectProgress = [
    { name: 'Mathematics', value: 65, color: '#3B82F6', completed: 8, total: 12 },
    { name: 'Science', value: 45, color: '#10B981', completed: 5, total: 11 },
    { name: 'Technology', value: 30, color: '#8B5CF6', completed: 3, total: 10 },
    { name: 'Engineering', value: 25, color: '#F59E0B', completed: 2, total: 8 }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'game_completed',
      title: 'Number Quest',
      subject: 'Mathematics',
      points: 85,
      time: '2 hours ago',
      icon: Calculator
    },
    {
      id: 2,
      type: 'achievement_unlocked',
      title: 'Math Master',
      subject: 'Achievement',
      points: 100,
      time: '1 day ago',
      icon: Trophy
    },
    {
      id: 3,
      type: 'game_completed',
      title: 'Chemistry Lab',
      subject: 'Science',
      points: 92,
      time: '2 days ago',
      icon: FlaskConical
    },
    {
      id: 4,
      type: 'level_up',
      title: 'Level 5 Reached',
      subject: 'Progress',
      points: 150,
      time: '3 days ago',
      icon: Star
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'game_completed':
        return Trophy;
      case 'achievement_unlocked':
        return Star;
      case 'level_up':
        return TrendingUp;
      default:
        return BookOpen;
    }
  };

  const totalGamesCompleted = subjectProgress.reduce((sum, subject) => sum + subject.completed, 0);
  const totalGames = subjectProgress.reduce((sum, subject) => sum + subject.total, 0);
  const overallProgress = Math.round((totalGamesCompleted / totalGames) * 100);

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            📊 Progress Tracking
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your learning journey and see how you're improving across all STEM subjects
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Level</p>
                  <p className="text-2xl font-bold">{level}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak Days</p>
                  <p className="text-2xl font-bold">{streak}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{overallProgress}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Your points and game completion over time</CardDescription>
              <div className="flex gap-2">
                <Button
                  variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('week')}
                >
                  Week
                </Button>
                <Button
                  variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('month')}
                >
                  Month
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedPeriod === 'week' ? weeklyProgress : monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="points" stroke="#22C55E" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>Your completion rate by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectProgress.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-muted-foreground">
                        {subject.completed}/{subject.total} games
                      </span>
                    </div>
                    <Progress value={subject.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest achievements and completed games</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.subject}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        +{activity.points} pts
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}