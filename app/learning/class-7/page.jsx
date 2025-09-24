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

export default function Class7Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'integers',
        title: 'Integers and Number Line',
        description: 'Positive and negative numbers, operations with integers',
        difficulty: 'Medium',
        points: 80,
        duration: '15 min',
        concept: 'Integers include positive numbers, negative numbers, and zero. They extend the number system beyond counting numbers.',
        visualization: {
          type: 'number-line',
          description: 'Interactive number line showing integer operations'
        },
        examples: [
          'Temperature: +25°C (hot), -5°C (cold)',
          'Money: +₹100 (earned), -₹50 (spent)',
          'Addition: (-3) + (+7) = +4'
        ],
        realWorld: 'Bank balances, temperatures, elevator floors - all use integers!'
      },
      {
        id: 'simple-equations',
        title: 'Simple Linear Equations',
        description: 'Solving equations with one variable',
        difficulty: 'Medium',
        points: 90,
        duration: '18 min',
        concept: 'An equation shows that two expressions are equal. We solve for the unknown variable.',
        visualization: {
          type: 'balance-scale',
          description: 'Interactive balance scale showing equation solving'
        },
        examples: [
          'x + 5 = 12, so x = 7',
          '2x = 16, so x = 8',
          '3x - 6 = 15, so x = 7'
        ],
        realWorld: 'Finding unknown quantities in real situations like shopping, cooking measurements!'
      },
      {
        id: 'ratios-proportions',
        title: 'Ratios and Proportions',
        description: 'Comparing quantities and solving proportion problems',
        difficulty: 'Medium',
        points: 85,
        duration: '16 min',
        concept: 'Ratios compare two quantities. Proportions show that two ratios are equal.',
        visualization: {
          type: 'ratio-bars',
          description: 'Visual bars showing ratio comparisons'
        },
        examples: [
          'Ratio of boys to girls: 3:2',
          'If 3 apples cost ₹15, then 6 apples cost ₹30',
          'Map scale: 1 cm represents 10 km'
        ],
        realWorld: 'Recipes, maps, mixing paint colors, and currency exchange!'
      },
      {
        id: 'percentage',
        title: 'Percentage Applications',
        description: 'Understanding and calculating percentages',
        difficulty: 'Medium',
        points: 75,
        duration: '14 min',
        concept: 'Percentage means "per hundred". It\'s another way to express fractions and decimals.',
        visualization: {
          type: 'percentage-grid',
          description: '100-square grid showing percentage concepts'
        },
        examples: [
          '50% = 50/100 = 1/2',
          '25% of 80 = 20',
          'Discount: 20% off ₹100 = ₹80'
        ],
        realWorld: 'Shopping discounts, test scores, statistics, and interest rates!'
      }
    ],
    science: [
      {
        id: 'acids-bases',
        title: 'Acids, Bases and Salts',
        description: 'Properties and reactions of acids and bases',
        difficulty: 'Medium',
        points: 95,
        duration: '20 min',
        concept: 'Acids are sour, bases are bitter. They neutralize each other to form salts.',
        visualization: {
          type: 'ph-scale',
          description: 'Interactive pH scale with common substances'
        },
        examples: [
          'Acids: Lemon juice, vinegar, stomach acid',
          'Bases: Soap, baking soda, antacid',
          'Neutralization: Acid + Base → Salt + Water'
        ],
        realWorld: 'Cooking, cleaning, medicine, and soil treatment use acid-base chemistry!'
      },
      {
        id: 'light-reflection',
        title: 'Light and Reflection',
        description: 'How light travels and reflects from surfaces',
        difficulty: 'Medium',
        points: 85,
        duration: '17 min',
        concept: 'Light travels in straight lines. When it hits a surface, it reflects following specific laws.',
        visualization: {
          type: 'mirror-reflection',
          description: 'Interactive mirror showing light ray reflection'
        },
        examples: [
          'Law of reflection: Angle of incidence = Angle of reflection',
          'Plane mirror forms virtual images',
          'Concave and convex mirrors change image size'
        ],
        realWorld: 'Mirrors, periscopes, car headlights, and solar cookers use reflection!'
      },
      {
        id: 'weather-climate',
        title: 'Weather and Climate',
        description: 'Understanding weather patterns and climate factors',
        difficulty: 'Easy',
        points: 70,
        duration: '13 min',
        concept: 'Weather is daily atmospheric conditions. Climate is long-term weather patterns.',
        visualization: {
          type: 'weather-map',
          description: 'Interactive weather map showing different conditions'
        },
        examples: [
          'Weather elements: Temperature, humidity, wind, precipitation',
          'Monsoons bring seasonal rains to India',
          'Climate zones: Tropical, temperate, polar'
        ],
        realWorld: 'Farming, clothing choices, travel planning depend on weather and climate!'
      },
      {
        id: 'motion-time',
        title: 'Motion and Time',
        description: 'Understanding different types of motion and measuring time',
        difficulty: 'Easy',
        points: 65,
        duration: '12 min',
        concept: 'Motion is change in position over time. Different objects move in different ways.',
        visualization: {
          type: 'motion-simulator',
          description: 'Animation showing different types of motion'
        },
        examples: [
          'Linear motion: Car on straight road',
          'Circular motion: Earth around sun',
          'Oscillatory motion: Pendulum swing'
        ],
        realWorld: 'Transportation, sports, clocks, and machines all involve motion!'
      },
      {
        id: 'nutrition-food',
        title: 'Nutrition in Plants and Animals',
        description: 'How living organisms obtain and use nutrients',
        difficulty: 'Easy',
        points: 60,
        duration: '11 min',
        concept: 'All living things need nutrients for energy and growth. Plants and animals get nutrients differently.',
        visualization: {
          type: 'nutrition-cycle',
          description: 'Interactive diagram showing plant and animal nutrition'
        },
        examples: [
          'Plants make food through photosynthesis',
          'Animals eat plants or other animals',
          'Nutrients: Carbohydrates, proteins, fats, vitamins'
        ],
        realWorld: 'Healthy eating, farming practices, and ecosystem balance!'
      },
      {
        id: 'transportation',
        title: 'Transportation in Plants and Animals',
        description: 'How materials move within living organisms',
        difficulty: 'Medium',
        points: 80,
        duration: '15 min',
        concept: 'Living things have special systems to transport materials like water, food, and oxygen.',
        visualization: {
          type: 'transport-system',
          description: 'Interactive diagrams of plant and animal transport systems'
        },
        examples: [
          'Plants: Xylem carries water, phloem carries food',
          'Animals: Blood carries oxygen and nutrients',
          'Heart pumps blood through blood vessels'
        ],
        realWorld: 'Understanding health, plant care, and medical treatments!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.science];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-7-${theoremId}`, 100);
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
            
            <Link href={`/learning/class-7/${theorem.id}`} className="flex-1">
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
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            7
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 7 - Building Blocks
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Develop algebraic thinking and explore scientific phenomena
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