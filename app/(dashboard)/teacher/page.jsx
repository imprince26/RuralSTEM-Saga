"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  PlusCircle,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Search,
  Bell
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';
import { useAuthStore } from '@/stores/useAuthStore';

export default function TeacherDashboard() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (user && user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/student');
      return;
    }
  }, [isAuthenticated, user, router]);

  // Mock data for teacher dashboard
  const classStats = {
    totalStudents: 28,
    activeThisWeek: 22,
    averageProgress: 68,
    assignmentsCompleted: 85
  };

  const studentProgress = [
    { name: 'Week 1', Mathematics: 65, Science: 70, Technology: 45, Engineering: 55 },
    { name: 'Week 2', Mathematics: 68, Science: 75, Technology: 52, Engineering: 60 },
    { name: 'Week 3', Mathematics: 72, Science: 78, Technology: 58, Engineering: 65 },
    { name: 'Week 4', Mathematics: 75, Science: 82, Technology: 62, Engineering: 68 },
    { name: 'Week 5', Mathematics: 78, Science: 85, Technology: 68, Engineering: 72 },
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 35, color: '#3B82F6' },
    { name: 'Science', value: 28, color: '#10B981' },
    { name: 'Technology', value: 22, color: '#8B5CF6' },
    { name: 'Engineering', value: 15, color: '#F59E0B' }
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Arjun Patel',
      lastActive: '2 hours ago',
      progress: 85,
      currentLevel: 15,
      gamesCompleted: 24,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sneha Sharma',
      lastActive: '1 day ago',
      progress: 72,
      currentLevel: 12,
      gamesCompleted: 18,
      status: 'inactive'
    },
    {
      id: 3,
      name: 'Rohit Das',
      lastActive: '3 hours ago',
      progress: 91,
      currentLevel: 18,
      gamesCompleted: 32,
      status: 'active'
    },
    {
      id: 4,
      name: 'Kavya Singh',
      lastActive: '5 hours ago',
      progress: 67,
      currentLevel: 11,
      gamesCompleted: 15,
      status: 'struggling'
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Mathematics Quiz - Algebra Basics',
      dueDate: '2024-01-25',
      studentsAssigned: 28,
      submitted: 15,
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Science Experiment - Chemical Reactions',
      dueDate: '2024-01-27',
      studentsAssigned: 28,
      submitted: 8,
      subject: 'Science'
    },
    {
      id: 3,
      title: 'Technology Project - Basic Programming',
      dueDate: '2024-01-30',
      studentsAssigned: 28,
      submitted: 3,
      subject: 'Technology'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100';
      case 'struggling':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <Clock className="h-4 w-4" />;
      case 'struggling':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('teacher.dashboard')}, {user?.fullName || 'Teacher'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Monitor your students' progress and manage your class effectively
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active This Week</p>
                  <p className="text-2xl font-bold">{classStats.activeThisWeek}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                  <p className="text-2xl font-bold">{classStats.averageProgress}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assignments Done</p>
                  <p className="text-2xl font-bold">{classStats.assignmentsCompleted}%</p>
                </div>
                <Award className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Class Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Class Progress Over Time
                  </CardTitle>
                  <CardDescription>
                    Weekly progress across all STEM subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={studentProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="Mathematics" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Science" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="Technology" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Engineering" stroke="#F59E0B" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Learning Activity Distribution
                  </CardTitle>
                  <CardDescription>
                    Student engagement by subject this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Student Activity
                </CardTitle>
                <CardDescription>
                  Latest updates from your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Level {student.currentLevel} • {student.gamesCompleted} games completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.progress}% complete</p>
                          <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                        </div>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1 capitalize">{student.status}</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>
                      View and manage your students' progress
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Level {student.currentLevel} • {student.gamesCompleted} games
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1 capitalize">{student.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground">
                          Last active: {student.lastActive}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Assignment Management</CardTitle>
                    <CardDescription>
                      Create and track student assignments
                    </CardDescription>
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {assignment.dueDate} • Subject: {assignment.subject}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {assignment.submitted}/{assignment.studentsAssigned} submitted
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Submission Progress</span>
                          <span>
                            {Math.round((assignment.submitted / assignment.studentsAssigned) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(assignment.submitted / assignment.studentsAssigned) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Submissions
                        </Button>
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Assignment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Class Performance Trends</CardTitle>
                  <CardDescription>
                    Monthly performance comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={studentProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Mathematics" fill="#3B82F6" />
                      <Bar dataKey="Science" fill="#10B981" />
                      <Bar dataKey="Technology" fill="#8B5CF6" />
                      <Bar dataKey="Engineering" fill="#F59E0B" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Insights</CardTitle>
                  <CardDescription>
                    Key insights about your class
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Strong Performance</span>
                    </div>
                    <p className="text-sm text-green-700">
                      85% of students are consistently completing assignments on time
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Needs Attention</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Technology subject has lower engagement. Consider adding more interactive content
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Trending Up</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Science scores have improved by 15% over the last month
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Generate Detailed Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}