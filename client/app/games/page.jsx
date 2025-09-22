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
  Lock,
  CheckCircle
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
      color: 'bg-blue-500',
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
          id: 'geometry-builder',
          title: 'Geometry Builder',
          description: 'Build structures using geometric shapes',
          difficulty: 'hard',
          duration: '25 min',
          points: 200,
          unlocked: false
        }
      ]
    },
    {
      id: 'science',
      icon: <FlaskConical className="h-8 w-8" />,
      color: 'bg-green-500',
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
          id: 'physics-playground',
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
          unlocked: false
        }
      ]
    },
    {
      id: 'technology',
      icon: <Laptop className="h-8 w-8" />,
      color: 'bg-purple-500',
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
          unlocked: false
        }
      ]
    },
    {
      id: 'engineering',
      icon: <Hammer className="h-8 w-8" />,
      color: 'bg-orange-500',
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
          id: 'circuit-master',
          title: 'Circuit Master',
          description: 'Build electronic circuits',
          difficulty: 'hard',
          duration: '35 min',
          points: 220,
          unlocked: false
        },
        {
          id: 'green-engineer',
          title: 'Green Engineer',
          description: 'Design sustainable solutions',
          difficulty: 'medium',
          duration: '25 min',
          points: 170,
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('games.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('games.subtitle')}
          </p>
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
                  {t(`subjects.${category.id}.title`)}
                </h2>
                <p className="text-muted-foreground">
                  {t(`subjects.${category.id}.description`)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.games.map((game) => {
                const gameStatus = getGameStatus(game.id);
                const isCompleted = gameStatus && gameStatus.completed;
                const currentScore = gameStatus?.bestScore || 0;

                return (
                  <Card key={game.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {game.title}
                            {!game.unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            {isCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {game.description}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {t(`games.${game.difficulty}`)}
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
                          <span className="text-muted-foreground">{t('games.highScore')}:</span>
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{currentScore}</span>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        disabled={!game.unlocked}
                        asChild={game.unlocked}
                      >
                        {game.unlocked ? (
                          <Link href={`/games/${category.id}/${game.id}`}>
                            <Play className="h-4 w-4 mr-2" />
                            {isCompleted ? 'Play Again' : t('games.play')}
                          </Link>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            {t('games.locked')}
                          </>
                        )}
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