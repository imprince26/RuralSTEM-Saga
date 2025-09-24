"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Lightbulb,
  Target,
  Star,
  Clock,
  Calculator,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function Class6MathematicsPage() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const mathematicsTopics = [
    {
      id: 'basic-arithmetic',
      title: 'Basic Arithmetic Properties',
      description: 'Learn commutative, associative, and identity properties',
      difficulty: 'Easy',
      points: 60,
      duration: '20 min',
      completed: false,
      concepts: ['Commutative Property', 'Associative Property', 'Identity Property'],
      realWorld: 'Mental math, shopping calculations, and daily problem solving!'
    },
    {
      id: 'whole-numbers',
      title: 'Whole Numbers',
      description: 'Understanding whole numbers, place value, and number line',
      difficulty: 'Easy',
      points: 65,
      duration: '22 min',
      completed: false,
      concepts: ['Place Value', 'Number Line', 'Comparing Numbers'],
      realWorld: 'Counting objects, measuring quantities, and understanding positions!'
    },
    {
      id: 'playing-with-numbers',
      title: 'Playing with Numbers',
      description: 'Divisibility rules, factors, and multiples',
      difficulty: 'Easy',
      points: 70,
      duration: '25 min',
      completed: false,
      concepts: ['Divisibility Rules', 'Factors', 'Multiples', 'Prime Numbers'],
      realWorld: 'Organizing items, sharing equally, and pattern recognition!'
    },
    {
      id: 'basic-geometry',
      title: 'Basic Geometrical Ideas',
      description: 'Points, lines, line segments, and basic shapes',
      difficulty: 'Easy',
      points: 75,
      duration: '28 min',
      completed: false,
      concepts: ['Points and Lines', 'Line Segments', 'Rays', 'Angles'],
      realWorld: 'Drawing, construction, art, and understanding space around us!'
    },
    {
      id: 'understanding-shapes',
      title: 'Understanding Elementary Shapes',
      description: 'Triangles, quadrilaterals, circles, and their properties',
      difficulty: 'Easy',
      points: 80,
      duration: '30 min',
      completed: false,
      concepts: ['Triangles', 'Quadrilaterals', 'Circles', 'Polygons'],
      realWorld: 'Architecture, design, nature patterns, and everyday objects!'
    },
    {
      id: 'integers',
      title: 'Integers',
      description: 'Positive and negative numbers, number line operations',
      difficulty: 'Medium',
      points: 85,
      duration: '32 min',
      completed: false,
      concepts: ['Positive Numbers', 'Negative Numbers', 'Integer Operations'],
      realWorld: 'Temperature, elevation, bank balance, and score keeping!'
    },
    {
      id: 'fractions',
      title: 'Fractions',
      description: 'Understanding parts of a whole, equivalent fractions',
      difficulty: 'Medium',
      points: 90,
      duration: '35 min',
      completed: false,
      concepts: ['Parts of Whole', 'Equivalent Fractions', 'Comparing Fractions'],
      realWorld: 'Cooking recipes, sharing pizza, and understanding portions!'
    }
  ];

  const completionRate = (completedTopics.size / mathematicsTopics.length) * 100;

  const handleTopicComplete = (topicId, points) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    addPoints(points);
    updateGameProgress(`class-6-math-${topicId}`, 100);
    celebrateCorrectAnswer();
  };

  const TopicCard = ({ topic }) => {
    const isCompleted = completedTopics.has(topic.id);
    
    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getDifficultyColor(topic.difficulty)}>
              {topic.difficulty}
            </Badge>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold">
            {topic.title}
          </CardTitle>
          
          <CardDescription>
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>{topic.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              <span>{topic.points} pts</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Concepts:</h4>
            <div className="flex flex-wrap gap-1">
              {topic.concepts.map((concept, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Real World:</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">{topic.realWorld}</p>
          </div>

          <div className="flex gap-2">
            <Link 
              href={topic.id === 'basic-arithmetic' ? `/learning/class-6/${topic.id}` : '#'}
              className="flex-1"
            >
              <Button 
                size="sm" 
                className="w-full"
                disabled={topic.id !== 'basic-arithmetic'}
              >
                <Play className="mr-2 h-4 w-4" />
                {isCompleted ? 'Review' : 'Start Learning'}
              </Button>
            </Link>
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
            Back to Class 6
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            <Calculator className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 6 Mathematics
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Foundation concepts in numbers, geometry, and basic operations
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.size} of {mathematicsTopics.length} topics completed
            </p>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mathematicsTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Achievement Section */}
      {completedTopics.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Mathematics Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completedTopics.size}</div>
                <div className="text-sm text-muted-foreground">Topics Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Array.from(completedTopics).reduce((total, id) => {
                    const topic = mathematicsTopics.find(t => t.id === id);
                    return total + (topic?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Mathematics Mastery</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}