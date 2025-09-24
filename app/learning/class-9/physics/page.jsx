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
  Zap,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function Class9PhysicsPage() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const physicsTopics = [
    {
      id: 'motion',
      title: 'Motion',
      description: 'Uniform and non-uniform motion, acceleration, and equations of motion',
      difficulty: 'Medium',
      points: 120,
      duration: '35 min',
      completed: false,
      concepts: ['Distance & Displacement', 'Speed & Velocity', 'Acceleration', 'Equations of Motion'],
      realWorld: 'Vehicle motion, sports analysis, space travel, and everyday movement!'
    },
    {
      id: 'force-laws-of-motion',
      title: 'Force and Laws of Motion',
      description: 'Newton\'s laws, inertia, momentum, and applications',
      difficulty: 'Medium',
      points: 125,
      duration: '38 min',
      completed: false,
      concepts: ['Newton\'s Laws', 'Inertia', 'Momentum', 'Force'],
      realWorld: 'Car safety, rocket launching, sports, and machinery design!'
    },
    {
      id: 'gravitation',
      title: 'Gravitation',
      description: 'Universal law of gravitation, free fall, and weight',
      difficulty: 'Hard',
      points: 130,
      duration: '40 min',
      completed: false,
      concepts: ['Universal Gravitation', 'Free Fall', 'Mass vs Weight', 'Acceleration due to gravity'],
      realWorld: 'Satellite orbits, tides, apple falling, and space exploration!'
    },
    {
      id: 'work-energy',
      title: 'Work and Energy',
      description: 'Work, kinetic energy, potential energy, and conservation',
      difficulty: 'Medium',
      points: 125,
      duration: '37 min',
      completed: false,
      concepts: ['Work', 'Kinetic Energy', 'Potential Energy', 'Conservation of Energy'],
      realWorld: 'Hydroelectric power, roller coasters, pendulums, and energy saving!'
    },
    {
      id: 'sound',
      title: 'Sound',
      description: 'Production, propagation, characteristics, and applications of sound',
      difficulty: 'Easy',
      points: 110,
      duration: '32 min',
      completed: false,
      concepts: ['Sound Production', 'Wave Properties', 'Echo', 'Applications'],
      realWorld: 'Music, communication, medical ultrasound, and noise control!'
    }
  ];

  const completionRate = (completedTopics.size / physicsTopics.length) * 100;

  const handleTopicComplete = (topicId, points) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    addPoints(points);
    updateGameProgress(`class-9-physics-${topicId}`, 100);
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
        isCompleted ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getDifficultyColor(topic.difficulty)}>
              {topic.difficulty}
            </Badge>
            {isCompleted && <CheckCircle className="h-5 w-5 text-purple-500" />}
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

          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Real World:</h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">{topic.realWorld}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              disabled={true} // Will enable when individual topic pages are created
            >
              <Play className="mr-2 h-4 w-4" />
              {isCompleted ? 'Review' : 'Explore Physics'}
            </Button>
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
            Back to Class 9
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            <Zap className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 9 Physics
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Understand the fundamental laws that govern our physical world
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.size} of {physicsTopics.length} topics completed
            </p>
          </div>
        </div>
      </div>

      {/* Physics Concepts Info */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                Physics: The Science of Motion and Energy
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Discover how objects move, forces interact, and energy transforms in our universe!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {physicsTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Achievement Section */}
      {completedTopics.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-600" />
              Physics Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completedTopics.size}</div>
                <div className="text-sm text-muted-foreground">Physics Concepts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Array.from(completedTopics).reduce((total, id) => {
                    const topic = physicsTopics.find(t => t.id === id);
                    return total + (topic?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Physics Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Physics Mastery</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}