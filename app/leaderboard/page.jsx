"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy,
  Star,
  Medal,
  Crown,
  Award,
  Users,
  Calendar,
  TrendingUp,
  Flame
} from 'lucide-react';

export default function LeaderboardPage() {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState('all-time');

  // Mock leaderboard data
  const allTimeLeaders = [
    {
      id: 1,
      rank: 1,
      name: 'Rahul Sharma',
      school: 'Govt High School, Bhubaneswar',
      points: 15420,
      level: 24,
      achievements: 18,
      streak: 15,
      avatar: '/avatars/student1.jpg'
    },
    {
      id: 2,
      rank: 2,
      name: 'Priya Patel',
      school: 'Rural Education Center, Cuttack',
      points: 14780,
      level: 23,
      achievements: 16,
      streak: 12,
      avatar: '/avatars/student2.jpg'
    },
    {
      id: 3,
      rank: 3,
      name: 'Arjun Das',
      school: 'Panchayat High School, Puri',
      points: 13950,
      level: 22,
      achievements: 15,
      streak: 8,
      avatar: '/avatars/student3.jpg'
    },
    {
      id: 4,
      rank: 4,
      name: 'Sneha Mishra',
      school: 'Community School, Sambalpur',
      points: 12890,
      level: 21,
      achievements: 14,
      streak: 9,
      avatar: '/avatars/student4.jpg'
    },
    {
      id: 5,
      rank: 5,
      name: 'Vikash Kumar',
      school: 'Village School, Mayurbhanj',
      points: 11650,
      level: 20,
      achievements: 13,
      streak: 6,
      avatar: '/avatars/student5.jpg'
    }
  ];

  const weeklyLeaders = [
    {
      id: 1,
      rank: 1,
      name: 'Anjali Rao',
      school: 'Digital Learning Hub, Berhampur',
      points: 2340,
      gamesPlayed: 28,
      avatar: '/avatars/student6.jpg'
    },
    {
      id: 2,
      rank: 2,
      name: 'Subham Nayak',
      school: 'Rural Tech Center, Balasore',
      points: 2180,
      gamesPlayed: 25,
      avatar: '/avatars/student7.jpg'
    },
    {
      id: 3,
      rank: 3,
      name: 'Kavya Singh',
      school: 'Govt High School, Bhubaneswar',
      points: 1950,
      gamesPlayed: 22,
      avatar: '/avatars/student8.jpg'
    }
  ];

  const schoolLeaders = [
    {
      id: 1,
      rank: 1,
      name: 'Govt High School, Bhubaneswar',
      totalPoints: 89650,
      students: 145,
      averageLevel: 18.5,
      topStudent: 'Rahul Sharma'
    },
    {
      id: 2,
      rank: 2,
      name: 'Rural Education Center, Cuttack',
      totalPoints: 76420,
      students: 128,
      averageLevel: 16.8,
      topStudent: 'Priya Patel'
    },
    {
      id: 3,
      rank: 3,
      name: 'Digital Learning Hub, Berhampur',
      totalPoints: 68790,
      students: 112,
      averageLevel: 15.2,
      topStudent: 'Anjali Rao'
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'border-yellow-200 bg-yellow-50';
      case 2:
        return 'border-gray-200 bg-gray-50';
      case 3:
        return 'border-amber-200 bg-amber-50';
      default:
        return 'border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how you rank among learners across rural Odisha
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-bold">1,245</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <p className="text-2xl font-bold">892,340</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <p className="text-2xl font-bold">3,567</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <p className="text-2xl font-bold">28</p>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="all-time" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="all-time">All Time</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
          </TabsList>

          <TabsContent value="all-time">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  All-Time Champions
                </CardTitle>
                <CardDescription>
                  Top learners based on total points earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allTimeLeaders.map((student, index) => (
                    <div 
                      key={student.id} 
                      className={`p-4 rounded-lg border-2 ${getRankColor(student.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {getRankIcon(student.rank)}
                          </div>
                          
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.school}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <p className="font-bold text-lg">{student.points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                          <div className="hidden sm:block">
                            <p className="font-medium">Level {student.level}</p>
                            <p className="text-xs text-muted-foreground">{student.achievements} achievements</p>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-orange-500" />
                              {student.streak} day streak
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline">
                    Load More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  This Week's Champions
                </CardTitle>
                <CardDescription>
                  Top performers for the current week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyLeaders.map((student) => (
                    <div 
                      key={student.id}
                      className={`p-4 rounded-lg border-2 ${getRankColor(student.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {getRankIcon(student.rank)}
                          </div>
                          
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.school}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <p className="font-bold text-lg">{student.points.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">points this week</p>
                          </div>
                          <div>
                            <p className="font-medium">{student.gamesPlayed} games</p>
                            <p className="text-xs text-muted-foreground">played</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  School Rankings
                </CardTitle>
                <CardDescription>
                  Top performing schools across rural Odisha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolLeaders.map((school) => (
                    <div 
                      key={school.id}
                      className={`p-4 rounded-lg border-2 ${getRankColor(school.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {getRankIcon(school.rank)}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{school.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Top Student: {school.topStudent}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
                          <div>
                            <p className="font-bold text-lg">{school.totalPoints.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">total points</p>
                          </div>
                          <div>
                            <p className="font-medium">{school.students}</p>
                            <p className="text-xs text-muted-foreground">students</p>
                          </div>
                          <div>
                            <p className="font-medium">Avg Level {school.averageLevel}</p>
                            <p className="text-xs text-muted-foreground">per student</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}