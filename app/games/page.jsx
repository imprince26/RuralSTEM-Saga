"use client";

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator,
  FlaskConical, 
  Laptop, 
  Hammer,
  Play,
  Trophy,
  Clock,
  Star,
  CheckCircle,
  Gamepad2,
  Brain,
  Target,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function GamesPage() {
  const { t } = useTranslation();
  const { gameProgress, getGameProgress } = useGameStore();

  const gameCategories = [
    {
      id: 'mathematics',
      icon: <Calculator className="h-8 w-8" />,
      color: 'bg-green-500',
      title: 'Mathematics Games',
      description: 'Master numbers, equations and geometric concepts',
      games: [
        {
          id: 'number-quest',
          title: 'Number Quest',
          description: 'Master arithmetic through adventure',
          difficulty: 'easy',
          duration: '15 min',
          points: 100,
          unlocked: true
        },
        {
          id: 'algebra-adventure',
          title: 'Algebra Adventure',
          description: 'Solve equations to unlock treasures',
          difficulty: 'medium',
          duration: '20 min',
          points: 150,
          unlocked: true
        },
        {
          id: 'fraction-pizza',
          title: 'Fraction Pizza',
          description: 'Learn fractions by making delicious pizzas',
          difficulty: 'easy',
          duration: '12 min',
          points: 80,
          unlocked: true
        },
        {
          id: 'geometry-builder',
          title: 'Geometry Builder',
          description: 'Build structures using geometric shapes',
          difficulty: 'hard',
          duration: '25 min',
          points: 200,
          unlocked: true
        },
        {
          id: 'basic-arithmetic',
          title: 'Math Speedster',
          description: 'Quick arithmetic challenges and mental math',
          difficulty: 'easy',
          duration: '10 min',
          points: 75,
          unlocked: true
        },
        {
          id: 'pattern-master',
          title: 'Pattern Master',
          description: 'Discover and complete number patterns',
          difficulty: 'medium',
          duration: '18 min',
          points: 130,
          unlocked: true
        },
        {
          id: 'graph-explorer',
          title: 'Graph Explorer',
          description: 'Navigate coordinate planes and create graphs',
          difficulty: 'hard',
          duration: '30 min',
          points: 220,
          unlocked: true
        },
        {
          id: 'probability-casino',
          title: 'Probability Casino',
          description: 'Learn probability through fun casino games',
          difficulty: 'medium',
          duration: '22 min',
          points: 160,
          unlocked: true
        }
      ]
    },
    {
      id: 'science',
      icon: <FlaskConical className="h-8 w-8" />,
      color: 'bg-green-500',
      title: 'Science Laboratory',
      description: 'Explore physics, chemistry, and biology through experiments',
      games: [
        {
          id: 'chemistry-lab',
          title: 'Virtual Chemistry Lab',
          description: 'Conduct safe virtual experiments',
          difficulty: 'medium',
          duration: '30 min',
          points: 175,
          unlocked: true
        },
        {
          id: 'physics-lab',
          title: 'Physics Playground',
          description: 'Explore forces and motion',
          difficulty: 'easy',
          duration: '20 min',
          points: 125,
          unlocked: true
        },
        {
          id: 'biology-explorer',
          title: 'Biology Explorer',
          description: 'Journey through living systems',
          difficulty: 'hard',
          duration: '35 min',
          points: 225,
          unlocked: true
        },
        {
          id: 'solar-system',
          title: 'Solar System Adventure',
          description: 'Explore planets and space phenomena',
          difficulty: 'medium',
          duration: '25 min',
          points: 180,
          unlocked: true
        },
        {
          id: 'atom-builder',
          title: 'Atom Builder',
          description: 'Build atoms and understand atomic structure',
          difficulty: 'hard',
          duration: '28 min',
          points: 200,
          unlocked: true
        },
        {
          id: 'ecosystem-manager',
          title: 'Ecosystem Manager',
          description: 'Balance nature and manage ecosystems',
          difficulty: 'medium',
          duration: '32 min',
          points: 190,
          unlocked: true
        },
        {
          id: 'weather-wizard',
          title: 'Weather Wizard',
          description: 'Predict weather patterns and understand climate',
          difficulty: 'easy',
          duration: '18 min',
          points: 110,
          unlocked: true
        },
        {
          id: 'periodic-table',
          title: 'Periodic Table Quest',
          description: 'Master elements and chemical properties',
          difficulty: 'hard',
          duration: '40 min',
          points: 250,
          unlocked: true
        }
      ]
    },
    {
      id: 'technology',
      icon: <Laptop className="h-8 w-8" />,
      color: 'bg-emerald-500',
      title: 'Technology & Coding',
      description: 'Learn programming, digital skills, and computer science',
      games: [
        {
          id: 'code-creator',
          title: 'Code Creator',
          description: 'Learn programming basics',
          difficulty: 'easy',
          duration: '25 min',
          points: 150,
          unlocked: true
        },
        {
          id: 'coding-basics',
          title: 'Coding Basics',
          description: 'Introduction to programming concepts',
          difficulty: 'easy',
          duration: '20 min',
          points: 120,
          unlocked: true
        },
        {
          id: 'digital-citizen',
          title: 'Digital Citizen',
          description: 'Learn internet safety and ethics',
          difficulty: 'easy',
          duration: '15 min',
          points: 100,
          unlocked: true
        },
        {
          id: 'app-architect',
          title: 'App Architect',
          description: 'Design and build mobile apps',
          difficulty: 'hard',
          duration: '40 min',
          points: 250,
          unlocked: true
        },
        {
          id: 'algorithm-arena',
          title: 'Algorithm Arena',
          description: 'Master sorting and searching algorithms',
          difficulty: 'hard',
          duration: '35 min',
          points: 230,
          unlocked: true
        },
        {
          id: 'web-designer',
          title: 'Web Designer',
          description: 'Create beautiful websites with HTML/CSS',
          difficulty: 'medium',
          duration: '30 min',
          points: 180,
          unlocked: true
        },
        {
          id: 'database-detective',
          title: 'Database Detective',
          description: 'Learn data management and SQL queries',
          difficulty: 'medium',
          duration: '28 min',
          points: 170,
          unlocked: true
        },
        {
          id: 'ai-trainer',
          title: 'AI Trainer',
          description: 'Train simple AI models and understand machine learning',
          difficulty: 'hard',
          duration: '45 min',
          points: 280,
          unlocked: true
        }
      ]
    },
    {
      id: 'engineering',
      icon: <Hammer className="h-8 w-8" />,
      color: 'bg-teal-500',
      title: 'Engineering & Design',
      description: 'Build, design, and solve engineering challenges',
      games: [
        {
          id: 'bridge-builder',
          title: 'Bridge Builder',
          description: 'Design and test bridge structures',
          difficulty: 'medium',
          duration: '30 min',
          points: 180,
          unlocked: true
        },
        {
          id: 'simple-machines',
          title: 'Simple Machines',
          description: 'Learn about levers, pulleys, and gears',
          difficulty: 'easy',
          duration: '20 min',
          points: 130,
          unlocked: true
        },
        {
          id: 'circuit-master',
          title: 'Circuit Master',
          description: 'Build electronic circuits',
          difficulty: 'hard',
          duration: '35 min',
          points: 220,
          unlocked: true
        },
        {
          id: 'green-engineer',
          title: 'Green Engineer',
          description: 'Design sustainable solutions',
          difficulty: 'medium',
          duration: '25 min',
          points: 170,
          unlocked: true
        },
        {
          id: 'rocket-designer',
          title: 'Rocket Designer',
          description: 'Build rockets and explore space physics',
          difficulty: 'hard',
          duration: '40 min',
          points: 240,
          unlocked: true
        },
        {
          id: 'city-planner',
          title: 'City Planner',
          description: 'Design efficient and sustainable cities',
          difficulty: 'medium',
          duration: '35 min',
          points: 200,
          unlocked: true
        },
        {
          id: 'robot-builder',
          title: 'Robot Builder',
          description: 'Program and control virtual robots',
          difficulty: 'hard',
          duration: '38 min',
          points: 260,
          unlocked: true
        },
        {
          id: 'material-tester',
          title: 'Material Tester',
          description: 'Test material properties and strength',
          difficulty: 'medium',
          duration: '22 min',
          points: 150,
          unlocked: true
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGameStatus = (gameId) => {
    const progress = getGameProgress(gameId);
    return progress;
  };

  return (
    <div className="min-h-screen bg-background">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full">
              <Gamepad2 className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interactive Learning Games
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master STEM concepts through fun, engaging games with instant feedback and rewards
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
              <Star className="h-4 w-4 mr-1" />
              32+ Games Available
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1">
              <Brain className="h-4 w-4 mr-1" />
              Adaptive Learning
            </Badge>
          </div>
        </div>

        {/* Game Categories */}
        {gameCategories.map((category) => (
          <div key={category.id} className="mb-12">
            <div className="flex items-center mb-6">
              <div className={`${category.color} text-white p-3 rounded-lg mr-4`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
                <Badge variant="outline" className="mt-2">
                  {category.games.length} Games Available
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.games.map((game) => {
                const gameStatus = getGameStatus(game.id);
                const isCompleted = gameStatus && gameStatus.completed;
                const currentScore = gameStatus?.bestScore || 0;

                return (
                  <Card key={game.id} className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-green-950/20 dark:to-black/60 ">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {game.title}
                            {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm">
                            {game.description}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          <Target className="h-3 w-3 mr-1" />
                          {game.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {game.duration}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {game.points} pts
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {gameStatus && gameStatus.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{Math.round(gameStatus.progress)}%</span>
                          </div>
                          <Progress value={gameStatus.progress} className="h-2" />
                        </div>
                      )}

                      {currentScore > 0 && (
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-muted-foreground">High Score:</span>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{currentScore}</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full text-white border-0" 
                        asChild
                      >
                        <Link href={`/games/${category.id}/${game.id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? 'Play Again' : 'Start Game'}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}