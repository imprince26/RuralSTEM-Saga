"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen,
  Brain,
  Calculator,
  FlaskConical,
  Laptop,
  Microscope,
  Play,
  Trophy,
  Clock,
  Star,
  Lock,
  CheckCircle,
  GraduationCap,
  Target,
  Users,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function LearningPage() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const { gameProgress, totalPoints } = useGameStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const classData = [
    {
      class: 6,
      title: "Class 6 - Foundation",
      description: "Basic mathematical concepts and scientific principles",
      subjects: ["Mathematics", "Science"],
      theorems: 8,
      difficulty: "Beginner",
      color: "bg-green-500",
      unlocked: true,
      progress: 75
    },
    {
      class: 7,
      title: "Class 7 - Building Blocks",
      description: "Algebraic thinking and scientific observations",
      subjects: ["Mathematics", "Science"],
      theorems: 10,
      difficulty: "Beginner",
      color: "bg-blue-500",
      unlocked: true,
      progress: 60
    },
    {
      class: 8,
      title: "Class 8 - Exploration",
      description: "Geometric concepts and chemical reactions",
      subjects: ["Mathematics", "Science", "Physics"],
      theorems: 12,
      difficulty: "Intermediate",
      color: "bg-purple-500",
      unlocked: true,
      progress: 45
    },
    {
      class: 9,
      title: "Class 9 - Discovery",
      description: "Advanced algebra and fundamental physics",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      theorems: 15,
      difficulty: "Intermediate",
      color: "bg-orange-500",
      unlocked: true,
      progress: 30
    },
    {
      class: 10,
      title: "Class 10 - Foundation Plus",
      description: "Trigonometry, light, and chemical equations",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      theorems: 18,
      difficulty: "Intermediate",
      color: "bg-red-500",
      unlocked: true,
      progress: 20
    },
    {
      class: 11,
      title: "Class 11 - Advanced Learning",
      description: "Calculus basics and advanced physics concepts",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      theorems: 20,
      difficulty: "Advanced",
      color: "bg-indigo-500",
      unlocked: true,
      progress: 10
    },
    {
      class: 12,
      title: "Class 12 - Mastery",
      description: "Integration, differentiation, and complex theories",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      theorems: 25,
      difficulty: "Advanced",
      color: "bg-pink-500",
      unlocked: true,
      progress: 5
    }
  ];

  const stats = [
    { icon: <BookOpen className="h-6 w-6" />, label: "Total Theorems", value: "108+" },
    { icon: <GraduationCap className="h-6 w-6" />, label: "Classes", value: "7" },
    { icon: <Target className="h-6 w-6" />, label: "Subjects", value: "3" },
    { icon: <Users className="h-6 w-6" />, label: "Difficulty Levels", value: "3" }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Interactive Learning Hub
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="text-primary">STEM</span> Theorems & Concepts
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master fundamental theorems from Class 6 to 12 through interactive visualizations and gamified learning
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Class Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {classData.map((classInfo, index) => {
          const delay = index * 100;
          
          return (
            <div
              key={classInfo.class}
              className={`transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <Card className={`group hover:shadow-lg transition-all duration-300 ${
                !classInfo.unlocked ? 'opacity-60' : 'hover:scale-105'
              }`}>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-12 h-12 rounded-lg ${classInfo.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {classInfo.class}
                    </div>
                    {!classInfo.unlocked && (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <CardTitle className="text-lg font-semibold">
                    {classInfo.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm">
                    {classInfo.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1">
                    {classInfo.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{classInfo.theorems} Theorems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <Badge className={getDifficultyColor(classInfo.difficulty)} variant="secondary">
                        {classInfo.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress */}
                  {classInfo.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{classInfo.progress}%</span>
                      </div>
                      <Progress value={classInfo.progress} className="h-2" />
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-2">
                    {classInfo.unlocked ? (
                      <Link href={`/learning/class-${classInfo.class}`}>
                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Play className="mr-2 h-4 w-4" />
                          Start Learning
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Requires {totalPoints >= 2500 ? '2500' : totalPoints >= 2000 ? '2000' : totalPoints >= 1500 ? '1500' : totalPoints >= 1000 ? '1000' : '500'} points
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Learning Tips Section */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Learning Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Interactive Visualizations</h4>
                  <p className="text-sm text-muted-foreground">
                    Each theorem comes with interactive diagrams and animations to help you understand concepts better.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Earn Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete theorem challenges to earn points, badges, and unlock advanced content.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Track Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your learning journey with detailed progress tracking and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}