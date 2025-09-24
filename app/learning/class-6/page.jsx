"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  BookOpen,
  Calculator,
  FlaskConical,
  Play,
  Trophy,
  Clock,
  Star,
  CheckCircle,
  Eye,
  Lightbulb,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function Class6Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'basic-arithmetic',
        title: 'Properties of Addition',
        description: 'Commutative, Associative, and Identity properties',
        difficulty: 'Easy',
        points: 50,
        duration: '10 min',
        concept: 'Addition follows specific rules that make calculations easier.',
        visualization: {
          type: 'interactive',
          description: 'Drag numbers to see how addition properties work'
        },
        examples: [
          'Commutative: 5 + 3 = 3 + 5 = 8',
          'Associative: (2 + 3) + 4 = 2 + (3 + 4) = 9',
          'Identity: 7 + 0 = 7'
        ],
        realWorld: 'When counting objects or money, the order doesn\'t matter!'
      },
      {
        id: 'fractions-basics',
        title: 'Understanding Fractions',
        description: 'Parts of a whole and equivalent fractions',
        difficulty: 'Easy',
        points: 60,
        duration: '12 min',
        concept: 'Fractions represent parts of a whole object or group.',
        visualization: {
          type: 'pizza-slices',
          description: 'Interactive pizza slices to understand fractions'
        },
        examples: [
          '1/2 of a pizza means one slice out of two',
          '2/4 = 1/2 (equivalent fractions)',
          '3/4 is larger than 1/2'
        ],
        realWorld: 'Sharing food, measuring ingredients, or dividing time!'
      },
      {
        id: 'basic-geometry',
        title: 'Lines and Angles',
        description: 'Types of lines and measuring angles',
        difficulty: 'Medium',
        points: 70,
        duration: '15 min',
        concept: 'Lines can be parallel, perpendicular, or intersecting. Angles measure how much lines turn.',
        visualization: {
          type: 'geometric-shapes',
          description: 'Interactive protractor and line drawing'
        },
        examples: [
          'Right angle = 90°',
          'Straight line = 180°',
          'Parallel lines never meet'
        ],
        realWorld: 'Architecture, road design, and sports fields use these concepts!'
      }
    ],
    science: [
      {
        id: 'plant-parts',
        title: 'Parts of a Plant',
        description: 'Root, stem, leaves, flowers, and their functions',
        difficulty: 'Easy',
        points: 55,
        duration: '12 min',
        concept: 'Each part of a plant has a specific job to help the plant survive.',
        visualization: {
          type: 'plant-diagram',
          description: 'Interactive plant diagram with clickable parts'
        },
        examples: [
          'Roots absorb water and nutrients',
          'Leaves make food through photosynthesis',
          'Flowers help plants reproduce'
        ],
        realWorld: 'Understanding plants helps in farming and gardening!'
      },
      {
        id: 'states-of-matter',
        title: 'States of Matter',
        description: 'Solid, liquid, and gas properties',
        difficulty: 'Easy',
        points: 65,
        duration: '14 min',
        concept: 'Matter exists in different states based on how particles move.',
        visualization: {
          type: 'particle-motion',
          description: 'Animated particles showing different states'
        },
        examples: [
          'Ice (solid) → Water (liquid) → Steam (gas)',
          'Particles in solids vibrate in place',
          'Gas particles move freely'
        ],
        realWorld: 'Weather, cooking, and many everyday processes involve state changes!'
      },
      {
        id: 'simple-machines',
        title: 'Simple Machines',
        description: 'Lever, pulley, and inclined plane',
        difficulty: 'Medium',
        points: 75,
        duration: '16 min',
        concept: 'Simple machines make work easier by changing force or direction.',
        visualization: {
          type: 'machine-simulator',
          description: 'Interactive simulations of each machine type'
        },
        examples: [
          'Lever: seesaw, crowbar, scissors',
          'Pulley: flagpole, elevator',
          'Inclined plane: ramp, stairs'
        ],
        realWorld: 'Found everywhere - from bottle openers to construction sites!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.science];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-6-${theoremId}`, 100);
  };

  const TheoremCard = ({ theorem, subject }) => {
    const isCompleted = completedTheorems.has(theorem.id);
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={subject === 'mathematics' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
              {subject === 'mathematics' ? 'Mathematics' : 'Science'}
            </Badge>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold">
            {theorem.title}
          </CardTitle>
          
          <CardDescription>
            {theorem.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>{theorem.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{theorem.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              <span>{theorem.points} pts</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {theorem.concept}
          </p>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedTheorem(theorem)}
              className="flex-1"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            
            <Link href={`/learning/class-6/${theorem.id}`} className="flex-1">
              <Button size="sm" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                {isCompleted ? 'Review' : 'Start'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TheoremPreview = ({ theorem }) => {
    if (!theorem) return null;

    return (
      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              {theorem.title} - Preview
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTheorem(null)}>
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Core Concept:</h4>
            <p>{theorem.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Examples:</h4>
            <ul className="space-y-1">
              {theorem.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-sm">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Real-World Application:</h4>
            <p className="text-sm">{theorem.realWorld}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Interactive Feature:</h4>
            <p className="text-sm">{theorem.visualization.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            6
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 6 - Foundation Learning
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Build strong foundations in Mathematics and Science
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTheorems.size} of {allTheorems.length} theorems completed
            </p>
          </div>
        </div>
      </div>

      {/* Theorem Preview */}
      {selectedTheorem && <TheoremPreview theorem={selectedTheorem} />}

      {/* Tabs for subjects */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.mathematics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="mathematics" />
            ))}
            {theorems.science.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="science" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mathematics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.mathematics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="mathematics" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="science" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.science.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="science" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement Section */}
      {completedTheorems.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completedTheorems.size}</div>
                <div className="text-sm text-muted-foreground">Theorems Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Array.from(completedTheorems).reduce((total, id) => {
                    const theorem = allTheorems.find(t => t.id === id);
                    return total + (theorem?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Class Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}