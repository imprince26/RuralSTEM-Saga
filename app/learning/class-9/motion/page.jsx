"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Target,
  Star,
  Trophy,
  Zap,
  ArrowRight,
  Clock,
  Activity
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function MotionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentConcept, setCurrentConcept] = useState('distance-displacement');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [animationPosition, setAnimationPosition] = useState(0);
  const { addPoints } = useGameStore();

  // Motion concepts
  const concepts = {
    'distance-displacement': {
      title: 'Distance vs Displacement',
      description: 'Understanding the difference between distance and displacement',
      content: {
        distance: {
          definition: 'Total path length covered by an object',
          properties: ['Always positive', 'Scalar quantity', 'Depends on path taken'],
          example: 'Walking 10m east, then 5m west = 15m distance'
        },
        displacement: {
          definition: 'Shortest path between initial and final positions',
          properties: ['Can be positive or negative', 'Vector quantity', 'Independent of path'],
          example: 'Walking 10m east, then 5m west = 5m east displacement'
        }
      }
    },
    'speed-velocity': {
      title: 'Speed vs Velocity',
      description: 'Learn about speed and velocity in motion',
      content: {
        speed: {
          definition: 'Rate of change of distance with time',
          formula: 'Speed = Distance / Time',
          unit: 'm/s or km/h',
          example: 'Car travels 100km in 2h = 50 km/h speed'
        },
        velocity: {
          definition: 'Rate of change of displacement with time',
          formula: 'Velocity = Displacement / Time',
          unit: 'm/s (with direction)',
          example: 'Car moves 100km north in 2h = 50 km/h north velocity'
        }
      }
    },
    'acceleration': {
      title: 'Acceleration',
      description: 'Understanding acceleration and its types',
      content: {
        definition: 'Rate of change of velocity with time',
        formula: 'Acceleration = (Final velocity - Initial velocity) / Time',
        unit: 'm/s²',
        types: [
          { type: 'Positive', description: 'When velocity increases', example: 'Car speeding up' },
          { type: 'Negative (Retardation)', description: 'When velocity decreases', example: 'Car braking' },
          { type: 'Zero', description: 'When velocity is constant', example: 'Car at constant speed' }
        ]
      }
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'A person walks 4m east, then 3m north. What is the distance and displacement?',
      options: ['Distance: 7m, Displacement: 5m', 'Distance: 5m, Displacement: 7m', 'Both are 7m', 'Both are 5m'],
      correct: 'Distance: 7m, Displacement: 5m',
      explanation: 'Distance = 4 + 3 = 7m. Displacement = √(4² + 3²) = √25 = 5m (using Pythagoras theorem)'
    },
    {
      question: 'A car travels at 60 km/h for 2 hours. What distance does it cover?',
      options: ['30 km', '60 km', '120 km', '240 km'],
      correct: '120 km',
      explanation: 'Distance = Speed × Time = 60 km/h × 2h = 120 km'
    },
    {
      question: 'A ball\'s velocity changes from 10 m/s to 20 m/s in 5 seconds. What is its acceleration?',
      options: ['1 m/s²', '2 m/s²', '3 m/s²', '4 m/s²'],
      correct: '2 m/s²',
      explanation: 'Acceleration = (20 - 10) / 5 = 10/5 = 2 m/s²'
    }
  ];

  const totalSteps = Object.keys(concepts).length + practiceProblems.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Animation for motion demonstration
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setAnimationPosition(prev => {
          if (prev >= 300) {
            setIsAnimating(false);
            return 0;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowAnswer(false);
      setPracticeAnswer('');
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      addPoints(120);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(concepts).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 15);
      setPracticeAnswer(answer);
      setShowAnswer(true);
    } else {
      setPracticeAnswer(answer);
      setShowAnswer(true);
    }
  };

  const ConceptVisualization = ({ conceptKey }) => {
    const concept = concepts[conceptKey];
    
    return (
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
            {concept.title}
          </h3>
          <p className="text-purple-600 dark:text-purple-300">{concept.description}</p>
        </div>

        {/* Animation Area */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6 relative h-24 border-2 border-dashed border-gray-300">
          <div className="flex justify-between items-center h-full">
            <div className="text-sm font-semibold">Start</div>
            <div className="text-sm font-semibold">End</div>
            <div 
              className="absolute w-6 h-6 bg-blue-500 rounded-full transition-all duration-100 flex items-center justify-center text-white text-xs"
              style={{ left: `${20 + animationPosition}px`, top: '50%', transform: 'translateY(-50%)' }}
            >
              🚗
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button 
            onClick={() => {
              setAnimationPosition(0);
              setIsAnimating(true);
            }}
            disabled={isAnimating}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isAnimating ? 'Animating...' : 'Start Animation'}
          </Button>
        </div>

        {/* Concept Content */}
        <div className="space-y-4">
          {conceptKey === 'distance-displacement' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Distance</h4>
                <p className="text-sm mb-3">{concept.content.distance.definition}</p>
                <ul className="text-xs space-y-1">
                  {concept.content.distance.properties.map((prop, index) => (
                    <li key={index}>• {prop}</li>
                  ))}
                </ul>
                <p className="text-xs mt-2 font-mono bg-white dark:bg-gray-800 p-2 rounded">
                  {concept.content.distance.example}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Displacement</h4>
                <p className="text-sm mb-3">{concept.content.displacement.definition}</p>
                <ul className="text-xs space-y-1">
                  {concept.content.displacement.properties.map((prop, index) => (
                    <li key={index}>• {prop}</li>
                  ))}
                </ul>
                <p className="text-xs mt-2 font-mono bg-white dark:bg-gray-800 p-2 rounded">
                  {concept.content.displacement.example}
                </p>
              </div>
            </div>
          )}

          {conceptKey === 'speed-velocity' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Speed</h4>
                <p className="text-sm mb-2">{concept.content.speed.definition}</p>
                <div className="bg-white dark:bg-gray-800 p-2 rounded mb-2">
                  <code className="text-sm">{concept.content.speed.formula}</code>
                </div>
                <p className="text-xs"><strong>Unit:</strong> {concept.content.speed.unit}</p>
                <p className="text-xs mt-2 font-mono bg-white dark:bg-gray-800 p-2 rounded">
                  {concept.content.speed.example}
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Velocity</h4>
                <p className="text-sm mb-2">{concept.content.velocity.definition}</p>
                <div className="bg-white dark:bg-gray-800 p-2 rounded mb-2">
                  <code className="text-sm">{concept.content.velocity.formula}</code>
                </div>
                <p className="text-xs"><strong>Unit:</strong> {concept.content.velocity.unit}</p>
                <p className="text-xs mt-2 font-mono bg-white dark:bg-gray-800 p-2 rounded">
                  {concept.content.velocity.example}
                </p>
              </div>
            </div>
          )}

          {conceptKey === 'acceleration' && (
            <div>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Acceleration</h4>
                <p className="text-sm mb-2">{concept.content.definition}</p>
                <div className="bg-white dark:bg-gray-800 p-2 rounded mb-2">
                  <code className="text-sm">{concept.content.formula}</code>
                </div>
                <p className="text-xs"><strong>Unit:</strong> {concept.content.unit}</p>
              </div>
              <div className="grid gap-3">
                {concept.content.types.map((type, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <h5 className="font-semibold text-sm">{type.type}</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{type.description}</p>
                    <p className="text-xs text-primary mt-1">Example: {type.example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PracticeProblem = ({ problem, index }) => {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Practice Problem {index + 1}</h3>
          <p className="text-lg mb-6">{problem.question}</p>
          
          <div className="grid grid-cols-1 gap-3">
            {problem.options.map((option, optIndex) => (
              <Button
                key={optIndex}
                variant={practiceAnswer === option ? 
                  (option === problem.correct ? 'default' : 'destructive') : 'outline'
                }
                onClick={() => handlePracticeAnswer(option)}
                disabled={showAnswer}
                className="p-4 text-left justify-start"
              >
                {option}
              </Button>
            ))}
          </div>

          {showAnswer && (
            <div className={`mt-4 p-4 rounded-lg ${
              practiceAnswer === problem.correct 
                ? 'bg-green-100 dark:bg-green-900/20 border border-green-200' 
                : 'bg-red-100 dark:bg-red-900/20 border border-red-200'
            }`}>
              <p className="font-semibold">
                {practiceAnswer === problem.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-sm mt-2">{problem.explanation}</p>
            </div>
          )}
        </div>
      </div>
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
          
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Physics
            </Badge>
            <Badge variant="outline">Class 9</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Motion
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Understand distance, displacement, speed, velocity, and acceleration
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {currentStep < Object.keys(concepts).length ? (
          // Concept learning steps
          <ConceptVisualization conceptKey={Object.keys(concepts)[currentStep]} />
        ) : (
          // Practice problems
          <PracticeProblem 
            problem={practiceProblems[currentStep - Object.keys(concepts).length]} 
            index={currentStep - Object.keys(concepts).length}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </div>
          
          <Button 
            onClick={handleNextStep}
            disabled={currentStep >= Object.keys(concepts).length && !showAnswer}
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>

        {/* Score Display */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Score: {score}</span>
            </div>
            {completed && (
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold-500" />
                <span className="text-gold-600 font-semibold">Theorem Completed!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}