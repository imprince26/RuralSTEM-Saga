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
  Zap,
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

export default function Class8Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'algebraic-expressions',
        title: 'Algebraic Expressions and Identities',
        description: 'Working with variables, terms, and algebraic identities',
        difficulty: 'Medium',
        points: 100,
        duration: '20 min',
        concept: 'Algebraic expressions use letters (variables) to represent unknown numbers. Identities are equations that are always true.',
        visualization: {
          type: 'algebra-manipulator',
          description: 'Interactive tool to build and simplify algebraic expressions'
        },
        examples: [
          '3x + 2y is an algebraic expression',
          '(a + b)² = a² + 2ab + b² (Perfect square identity)',
          'Like terms: 3x and 5x can be combined to 8x'
        ],
        realWorld: 'Calculating costs, areas, and solving business problems with unknown quantities!'
      },
      {
        id: 'linear-equations-one-variable',
        title: 'Linear Equations in One Variable',
        description: 'Solving complex linear equations step by step',
        difficulty: 'Medium',
        points: 95,
        duration: '18 min',
        concept: 'Linear equations can be solved by performing the same operations on both sides to isolate the variable.',
        visualization: {
          type: 'equation-solver',
          description: 'Step-by-step equation solving with visual balance'
        },
        examples: [
          '2(x + 3) = 14, so x = 4',
          '3x/4 + 5 = 11, so x = 8',
          '5x - 7 = 3x + 9, so x = 8'
        ],
        realWorld: 'Finding unknown prices, distances, time, and quantities in real problems!'
      },
      {
        id: 'understanding-quadrilaterals',
        title: 'Understanding Quadrilaterals',
        description: 'Properties of parallelograms, rectangles, squares, and rhombus',
        difficulty: 'Medium',
        points: 90,
        duration: '16 min',
        concept: 'Quadrilaterals are four-sided polygons. Different types have specific properties about sides, angles, and diagonals.',
        visualization: {
          type: 'quadrilateral-explorer',
          description: 'Interactive shapes showing properties and transformations'
        },
        examples: [
          'Square: All sides equal, all angles 90°',
          'Rectangle: Opposite sides equal, all angles 90°',
          'Parallelogram: Opposite sides parallel and equal'
        ],
        realWorld: 'Architecture, engineering, art, and design use quadrilateral properties!'
      },
      {
        id: 'practical-geometry',
        title: 'Practical Geometry - Construction',
        description: 'Constructing quadrilaterals using compass and ruler',
        difficulty: 'Hard',
        points: 110,
        duration: '22 min',
        concept: 'Geometric constructions create exact shapes using only compass and straightedge, following mathematical principles.',
        visualization: {
          type: 'construction-tool',
          description: 'Virtual compass and ruler for geometric constructions'
        },
        examples: [
          'Constructing a parallelogram given two sides and one angle',
          'Constructing a rhombus given diagonals',
          'Constructing a rectangle given length and width'
        ],
        realWorld: 'Engineering drawings, architectural plans, and precise manufacturing!'
      }
    ],
    science: [
      {
        id: 'chemical-effects-electric-current',
        title: 'Chemical Effects of Electric Current',
        description: 'Electrolysis, electroplating, and conduction in solutions',
        difficulty: 'Medium',
        points: 105,
        duration: '20 min',
        concept: 'Electric current can cause chemical changes in substances. This process has many practical applications.',
        visualization: {
          type: 'electrolysis-simulator',
          description: 'Interactive electrolysis setup showing chemical changes'
        },
        examples: [
          'Electroplating: Coating objects with metals',
          'Water electrolysis: H₂O → H₂ + O₂',
          'Good conductors: Salt water, acid solutions'
        ],
        realWorld: 'Metal plating, purifying metals, battery technology, and industrial processes!'
      },
      {
        id: 'force-pressure',
        title: 'Force and Pressure',
        description: 'Understanding forces, pressure in fluids, and atmospheric pressure',
        difficulty: 'Medium',
        points: 95,
        duration: '18 min',
        concept: 'Force causes objects to move or change shape. Pressure is force per unit area and explains many phenomena.',
        visualization: {
          type: 'pressure-demonstrator',
          description: 'Interactive simulations of pressure in different scenarios'
        },
        examples: [
          'Atmospheric pressure: ~1 kg/cm² at sea level',
          'Hydraulic machines use liquid pressure',
          'Sharp knife has high pressure (small area)'
        ],
        realWorld: 'Weather systems, hydraulic brakes, syringes, and deep-sea exploration!'
      },
      {
        id: 'friction',
        title: 'Friction',
        description: 'Types of friction, factors affecting friction, and applications',
        difficulty: 'Easy',
        points: 80,
        duration: '15 min',
        concept: 'Friction opposes motion between surfaces in contact. It can be helpful or harmful depending on the situation.',
        visualization: {
          type: 'friction-simulator',
          description: 'Interactive surfaces showing different friction effects'
        },
        examples: [
          'Static friction: Keeps objects at rest',
          'Kinetic friction: Acts on moving objects',
          'Lubricants reduce friction between surfaces'
        ],
        realWorld: 'Car brakes, walking, writing, and machine efficiency depend on friction!'
      },
      {
        id: 'sound',
        title: 'Sound',
        description: 'How sound is produced, travels, and its characteristics',
        difficulty: 'Easy',
        points: 85,
        duration: '16 min',
        concept: 'Sound is produced by vibrations and travels as waves through materials. It has properties like pitch, loudness, and quality.',
        visualization: {
          type: 'wave-visualizer',
          description: 'Interactive sound waves showing frequency and amplitude'
        },
        examples: [
          'High frequency = High pitch (squeaky voice)',
          'Large amplitude = Loud sound',
          'Sound travels ~340 m/s in air'
        ],
        realWorld: 'Music, communication, medical ultrasound, and noise control!'
      },
      {
        id: 'pollution-water',
        title: 'Pollution of Air and Water',
        description: 'Sources, effects, and control of environmental pollution',
        difficulty: 'Easy',
        points: 75,
        duration: '14 min',
        concept: 'Human activities release harmful substances into air and water, affecting health and environment.',
        visualization: {
          type: 'pollution-tracker',
          description: 'Interactive maps showing pollution sources and effects'
        },
        examples: [
          'Air pollution: Vehicle exhaust, factory smoke',
          'Water pollution: Industrial waste, sewage',
          'Solutions: Filters, treatment plants, clean energy'
        ],
        realWorld: 'Environmental protection, public health, and sustainable development!'
      }
    ],
    physics: [
      {
        id: 'light',
        title: 'Light - Reflection and Refraction',
        description: 'Advanced concepts of light behavior through different media',
        difficulty: 'Hard',
        points: 120,
        duration: '24 min',
        concept: 'Light changes direction when it moves from one medium to another (refraction) and follows specific laws.',
        visualization: {
          type: 'optics-lab',
          description: 'Virtual optics laboratory with lenses and mirrors'
        },
        examples: [
          'Snell\'s law governs refraction',
          'Total internal reflection in optical fibers',
          'Lenses form real and virtual images'
        ],
        realWorld: 'Eyeglasses, cameras, microscopes, telescopes, and fiber optic communications!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.science, ...theorems.physics];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-8-${theoremId}`, 100);
  };

  const TheoremCard = ({ theorem, subject }) => {
    const isCompleted = completedTheorems.has(theorem.id);
    
    const getSubjectColor = (subject) => {
      switch(subject) {
        case 'mathematics': return 'bg-blue-100 text-blue-800';
        case 'science': return 'bg-green-100 text-green-800';
        case 'physics': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getSubjectIcon = (subject) => {
      switch(subject) {
        case 'mathematics': return <Calculator className="h-4 w-4" />;
        case 'science': return <FlaskConical className="h-4 w-4" />;
        case 'physics': return <Zap className="h-4 w-4" />;
        default: return <BookOpen className="h-4 w-4" />;
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getSubjectColor(subject)}>
              <div className="flex items-center gap-1">
                {getSubjectIcon(subject)}
                <span className="capitalize">{subject}</span>
              </div>
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
            
            <Link href={`/learning/class-8/${theorem.id}`} className="flex-1">
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
          <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            8
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 8 - Exploration
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Explore advanced concepts in Mathematics, Science, and Physics
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mathematics">Math</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.mathematics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="mathematics" />
            ))}
            {theorems.science.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="science" />
            ))}
            {theorems.physics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="physics" />
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

        <TabsContent value="physics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.physics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="physics" />
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