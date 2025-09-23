"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  ChevronRight,
  Zap
} from 'lucide-react';
import {
  FaMedal as Medal,
  FaAward as Award,
  FaStar as Star,
  FaFire as Flame,
  FaTrophy as Trophy,
  FaCrown as Crown,
  FaCalendar as Calendar,
  FaSchool as School
} from "react-icons/fa";

export default function LeaderboardPage() {
  const [selectedTab, setSelectedTab] = useState('all-time');
  const [showAll, setShowAll] = useState(false);

  // mock leaderboard data
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
    },
    {
      id: 6,
      rank: 6,
      name: 'Anita Behera',
      school: 'Rural Tech Academy, Kendrapara',
      points: 10980,
      level: 19,
      achievements: 12,
      streak: 11,
      avatar: '/avatars/student6.jpg'
    },
    {
      id: 7,
      rank: 7,
      name: 'Ravi Mohanty',
      school: 'Digital Learning Center, Kalahandi',
      points: 10450,
      level: 18,
      achievements: 11,
      streak: 4,
      avatar: '/avatars/student7.jpg'
    },
    {
      id: 8,
      rank: 8,
      name: 'Sita Rout',
      school: 'Govt School, Ganjam',
      points: 9820,
      level: 17,
      achievements: 10,
      streak: 7,
      avatar: '/avatars/student8.jpg'
    },
    {
      id: 9,
      rank: 9,
      name: 'Mahesh Sahoo',
      school: 'Community High School, Dhenkanal',
      points: 9340,
      level: 16,
      achievements: 9,
      streak: 3,
      avatar: '/avatars/student9.jpg'
    },
    {
      id: 10,
      rank: 10,
      name: 'Laxmi Pradhan',
      school: 'Village Education Hub, Nayagarh',
      points: 8950,
      level: 16,
      achievements: 8,
      streak: 5,
      avatar: '/avatars/student10.jpg'
    },
    {
      id: 11,
      rank: 11,
      name: 'Deepak Nayak',
      school: 'Rural STEM Center, Jajpur',
      points: 8670,
      level: 15,
      achievements: 8,
      streak: 2,
      avatar: '/avatars/student11.jpg'
    },
    {
      id: 12,
      rank: 12,
      name: 'Kavita Singh',
      school: 'Panchayat School, Khordha',
      points: 8320,
      level: 15,
      achievements: 7,
      streak: 6,
      avatar: '/avatars/student12.jpg'
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
    },
    {
      id: 4,
      rank: 4,
      name: 'Pradeep Kumar',
      school: 'Community School, Rayagada',
      points: 1820,
      gamesPlayed: 20,
      avatar: '/avatars/student9.jpg'
    },
    {
      id: 5,
      rank: 5,
      name: 'Sunita Das',
      school: 'Village Academy, Koraput',
      points: 1650,
      gamesPlayed: 18,
      avatar: '/avatars/student10.jpg'
    },
    {
      id: 6,
      rank: 6,
      name: 'Bikash Parida',
      school: 'Rural Learning Hub, Malkangiri',
      points: 1480,
      gamesPlayed: 16,
      avatar: '/avatars/student11.jpg'
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
    },
    {
      id: 4,
      rank: 4,
      name: 'Rural Tech Academy, Kendrapara',
      totalPoints: 59340,
      students: 98,
      averageLevel: 14.1,
      topStudent: 'Anita Behera'
    },
    {
      id: 5,
      rank: 5,
      name: 'Community School, Sambalpur',
      totalPoints: 52180,
      students: 87,
      averageLevel: 13.6,
      topStudent: 'Sneha Mishra'
    },
    {
      id: 6,
      rank: 6,
      name: 'Village School, Mayurbhanj',
      totalPoints: 48920,
      students: 76,
      averageLevel: 12.8,
      topStudent: 'Vikash Kumar'
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />;
      case 2:
        return <Medal className="h-5 w-5 md:h-6 md:w-6 text-slate-500" />;
      case 3:
        return <Award className="h-5 w-5 md:h-6 md:w-6 text-amber-700" />;
      default:
        return <span className="text-base md:text-lg font-bold text-slate-600 dark:text-slate-400">#{rank}</span>;
    }
  };

  const getRankStyling = (rank) => {
    switch (rank) {
      case 1:
        return {
          container: 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 shadow-lg shadow-yellow-100/50 dark:shadow-yellow-900/20',
          avatar: 'bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 md:ring-4 ring-yellow-300/50',
          text: 'text-yellow-900 dark:text-yellow-100',
          points: 'text-yellow-800 dark:text-yellow-200'
        };
      case 2:
        return {
          container: 'border-slate-300 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 shadow-lg shadow-slate-100/50 dark:shadow-slate-900/20',
          avatar: 'bg-gradient-to-br from-slate-400 to-slate-600 ring-2 md:ring-4 ring-slate-300/50',
          text: 'text-slate-900 dark:text-slate-100',
          points: 'text-slate-800 dark:text-slate-200'
        };
      case 3:
        return {
          container: 'border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-lg shadow-amber-100/50 dark:shadow-amber-900/20',
          avatar: 'bg-gradient-to-br from-amber-500 to-amber-700 ring-2 md:ring-4 ring-amber-300/50',
          text: 'text-amber-900 dark:text-amber-100',
          points: 'text-amber-800 dark:text-amber-200'
        };
      default:
        return {
          container: 'border-border hover:border-primary/30 transition-all duration-200',
          avatar: 'bg-gradient-to-br from-primary to-primary/70',
          text: 'text-foreground',
          points: 'text-foreground'
        };
    }
  };

  const displayedStudents = showAll ? allTimeLeaders : allTimeLeaders.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            See how you rank among learners across rural Odisha
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-3 sm:p-6 text-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-blue-500 mb-2 sm:mb-3" />
              <p className="text-xl sm:text-3xl font-bold text-blue-600">1,245</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Total Students</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-3 sm:p-6 text-center">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-green-500 mb-2 sm:mb-3" />
              <p className="text-xl sm:text-3xl font-bold text-green-600">892K</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Total Points</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-3 sm:p-6 text-center">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-purple-500 mb-2 sm:mb-3" />
              <p className="text-xl sm:text-3xl font-bold text-purple-600">3,567</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Achievements</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-3 sm:p-6 text-center">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-orange-500 mb-2 sm:mb-3" />
              <p className="text-xl sm:text-3xl font-bold text-orange-600">28</p>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">Longest Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="all-time" className="space-y-4 sm:space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-sm sm:max-w-md mx-auto h-10 sm:h-12">
            <TabsTrigger value="all-time" className="text-xs sm:text-sm font-medium">All Time</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs sm:text-sm font-medium">This Week</TabsTrigger>
            <TabsTrigger value="schools" className="text-xs sm:text-sm font-medium">Schools</TabsTrigger>
          </TabsList>

          <TabsContent value="all-time">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                  All-Time Champions
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Top learners based on total points earned across all games and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {displayedStudents.map((student, index) => {
                    const styling = getRankStyling(student.rank);
                    return (
                      <div
                        key={student.id}
                        className={`p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] ${styling.container}`}
                      >
                        {/* Mobile Layout */}
                        <div className="block sm:hidden">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {getRankIcon(student.rank)}
                              </div>
                              <div className={`w-10 h-10 rounded-full ${styling.avatar} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-lg ${styling.points}`}>{student.points.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">points</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h3 className={`font-bold text-base ${styling.text}`}>{student.name}</h3>
                            <p className="text-xs text-muted-foreground font-medium line-clamp-1">{student.school}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-semibold text-primary text-sm">Level {student.level}</p>
                                <p className="text-xs text-muted-foreground">{student.achievements} achievements</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 text-xs">
                              <Flame className="h-3 w-3 text-orange-500" />
                              {student.streak}d
                            </Badge>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {getRankIcon(student.rank)}
                            </div>

                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full ${styling.avatar} flex items-center justify-center text-white font-bold text-base lg:text-lg shadow-lg`}>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-base lg:text-lg ${styling.text} truncate`}>{student.name}</h3>
                              <p className="text-sm text-muted-foreground font-medium truncate">{student.school}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 lg:gap-6 text-right flex-shrink-0">
                            <div>
                              <p className={`font-bold text-lg lg:text-xl ${styling.points}`}>{student.points.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">points</p>
                            </div>
                            <div className="hidden md:block">
                              <p className="font-semibold text-primary">Level {student.level}</p>
                              <p className="text-xs text-muted-foreground">{student.achievements} achievements</p>
                            </div>
                            <div className="hidden lg:block">
                              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                                <Flame className="h-3 w-3 text-orange-500" />
                                {student.streak} days
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-6 sm:mt-8">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2"
                  >
                    {showAll ? 'Show Less' : 'Load More'}
                    <ChevronRight className={`h-4 w-4 transition-transform ${showAll ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                  This Week's Champions
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Top performers for the current week (Monday - Sunday)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {weeklyLeaders.map((student) => {
                    const styling = getRankStyling(student.rank);
                    return (
                      <div
                        key={student.id}
                        className={`p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] ${styling.container}`}
                      >
                        {/* Mobile Layout */}
                        <div className="block sm:hidden">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {getRankIcon(student.rank)}
                              </div>
                              <div className={`w-10 h-10 rounded-full ${styling.avatar} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-lg ${styling.points}`}>{student.points.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">points</p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h3 className={`font-bold text-base ${styling.text}`}>{student.name}</h3>
                            <p className="text-xs text-muted-foreground font-medium line-clamp-1">{student.school}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-primary text-sm">{student.gamesPlayed} games</p>
                              <p className="text-xs text-muted-foreground">completed</p>
                            </div>
                            <Badge variant="secondary" className="flex items-center gap-1 text-xs px-2 py-1">
                              <Zap className="h-3 w-3 text-blue-500" />
                              Active
                            </Badge>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {getRankIcon(student.rank)}
                            </div>

                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full ${styling.avatar} flex items-center justify-center text-white font-bold text-base lg:text-lg shadow-lg`}>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-base lg:text-lg ${styling.text} truncate`}>{student.name}</h3>
                              <p className="text-sm text-muted-foreground font-medium truncate">{student.school}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 lg:gap-6 text-right flex-shrink-0">
                            <div>
                              <p className={`font-bold text-lg lg:text-xl ${styling.points}`}>{student.points.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">weekly points</p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary text-base lg:text-lg">{student.gamesPlayed} games</p>
                              <p className="text-xs text-muted-foreground">completed</p>
                            </div>
                            <div className="hidden lg:block">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-blue-500" />
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schools">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                  <School className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  School Rankings
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Top performing schools across rural Odisha based on collective student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {schoolLeaders.map((school) => {
                    const styling = getRankStyling(school.rank);
                    return (
                      <div
                        key={school.id}
                        className={`p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02] ${styling.container}`}
                      >
                        {/* Mobile Layout */}
                        <div className="block sm:hidden">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex-shrink-0">
                              {getRankIcon(school.rank)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-sm ${styling.text} line-clamp-2`}>{school.name}</h3>
                              <p className="text-xs text-muted-foreground font-medium">
                                Top: <span className="font-semibold">{school.topStudent}</span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className={`font-bold text-base ${styling.points}`}>{Math.round(school.totalPoints / 1000)}K</p>
                              <p className="text-xs text-muted-foreground">points</p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary text-base">{school.students}</p>
                              <p className="text-xs text-muted-foreground">students</p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary text-base">L{school.averageLevel}</p>
                              <p className="text-xs text-muted-foreground">average</p>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {getRankIcon(school.rank)}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className={`font-bold text-base lg:text-lg ${styling.text} truncate`}>{school.name}</h3>
                              <p className="text-sm text-muted-foreground font-medium truncate">
                                Top Student: <span className="font-semibold">{school.topStudent}</span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 lg:gap-6 text-right flex-shrink-0">
                            <div>
                              <p className={`font-bold text-lg lg:text-xl ${styling.points}`}>{school.totalPoints.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">total points</p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary text-base lg:text-lg">{school.students}</p>
                              <p className="text-xs text-muted-foreground">students</p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary text-base lg:text-lg">Level {school.averageLevel}</p>
                              <p className="text-xs text-muted-foreground">average</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
