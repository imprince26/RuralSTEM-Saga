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
  Calculator,
  Eye,
  BookOpen
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function GeometryShapesPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentShape, setCurrentShape] = useState('triangle');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Shape properties and formulas
  const shapes = {
    triangle: {
      title: 'Triangle',
      description: 'A polygon with three sides and three angles',
      properties: ['3 vertices', '3 sides', '3 angles', 'Sum of angles = 180°'],
      formula: 'Perimeter = a + b + c',
      examples: [
        { sides: [3, 4, 5], perimeter: 12, type: 'Right triangle' },
        { sides: [5, 5, 5], perimeter: 15, type: 'Equilateral triangle' },
        { sides: [6, 8, 10], perimeter: 24, type: 'Scalene triangle' }
      ]
    },
    rectangle: {
      title: 'Rectangle',
      description: 'A quadrilateral with four right angles',
      properties: ['4 vertices', '4 sides', '4 right angles', 'Opposite sides equal'],
      formula: 'Perimeter = 2(l + w)',
      examples: [
        { length: 5, width: 3, perimeter: 16, area: 15 },
        { length: 8, width: 4, perimeter: 24, area: 32 },
        { length: 6, width: 2, perimeter: 16, area: 12 }
      ]
    },
    circle: {
      title: 'Circle',
      description: 'A round shape where all points are equidistant from center',
      properties: ['1 center point', 'Radius (r)', 'Diameter = 2r', 'Circumference'],
      formula: 'Circumference = 2πr',
      examples: [
        { radius: 3, circumference: 18.84, area: 28.27 },
        { radius: 5, circumference: 31.42, area: 78.54 },
        { radius: 7, circumference: 43.98, area: 153.94 }
      ]
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'What is the perimeter of a triangle with sides 4, 5, and 6?',
      options: ['13', '15', '17', '19'],
      correct: '15',
      explanation: 'Perimeter = 4 + 5 + 6 = 15'
    },
    {
      question: 'A rectangle has length 8 and width 3. What is its perimeter?',
      options: ['22', '24', '26', '28'],
      correct: '22',
      explanation: 'Perimeter = 2(8 + 3) = 2(11) = 22'
    },
    {
      question: 'If a circle has radius 4, what is its diameter?',
      options: ['6', '8', '10', '12'],
      correct: '8',
      explanation: 'Diameter = 2 × radius = 2 × 4 = 8'
    }
  ];

  const currentShapeData = shapes[currentShape];
  const totalSteps = Object.keys(shapes).length + practiceProblems.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

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
      addPoints(70);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(shapes).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 10);
      setPracticeAnswer(answer);
      setShowAnswer(true);
    } else {
      setPracticeAnswer(answer);
      setShowAnswer(true);
    }
  };

  const ShapeVisualization = ({ shape }) => {
    const shapeData = shapes[shape];
    
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            {shapeData.title}
          </h3>
          <p className="text-blue-600 dark:text-blue-300">{shapeData.description}</p>
        </div>

        {/* Visual representation */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 flex items-center justify-center">
            {shape === 'triangle' && (
              <div className="w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-blue-500"></div>
            )}
            {shape === 'rectangle' && (
              <div className="w-24 h-16 border-4 border-blue-500 bg-blue-100 dark:bg-blue-800"></div>
            )}
            {shape === 'circle' && (
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 bg-blue-100 dark:bg-blue-800"></div>
            )}
          </div>
        </div>

        {/* Properties */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {shapeData.properties.map((property, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-2 rounded text-sm">
              {property}
            </div>
          ))}
        </div>

        {/* Formula */}
        <div className="bg-primary/10 p-3 rounded-lg text-center">
          <span className="font-mono font-bold">{shapeData.formula}</span>
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
          
          <div className="grid grid-cols-2 gap-3">
            {problem.options.map((option, optIndex) => (
              <Button
                key={optIndex}
                variant={practiceAnswer === option ? 
                  (option === problem.correct ? 'default' : 'destructive') : 'outline'
                }
                onClick={() => handlePracticeAnswer(option)}
                disabled={showAnswer}
                className="p-4 text-left"
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
            Back to Class 6
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Calculator className="h-3 w-3 mr-1" />
              Mathematics
            </Badge>
            <Badge variant="outline">Class 6</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Geometry: Basic Shapes
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Learn about triangles, rectangles, and circles
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
        {currentStep < Object.keys(shapes).length ? (
          // Shape learning steps
          <div className="space-y-6">
            <ShapeVisualization shape={Object.keys(shapes)[currentStep]} />
            
            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentShapeData.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      {currentShape === 'triangle' && (
                        <div>
                          <p><strong>Sides:</strong> {example.sides.join(', ')}</p>
                          <p><strong>Perimeter:</strong> {example.perimeter}</p>
                          <p><strong>Type:</strong> {example.type}</p>
                        </div>
                      )}
                      {currentShape === 'rectangle' && (
                        <div>
                          <p><strong>Length:</strong> {example.length}, <strong>Width:</strong> {example.width}</p>
                          <p><strong>Perimeter:</strong> {example.perimeter}</p>
                          <p><strong>Area:</strong> {example.area}</p>
                        </div>
                      )}
                      {currentShape === 'circle' && (
                        <div>
                          <p><strong>Radius:</strong> {example.radius}</p>
                          <p><strong>Circumference:</strong> {example.circumference}</p>
                          <p><strong>Area:</strong> {example.area}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Practice problems
          <PracticeProblem 
            problem={practiceProblems[currentStep - Object.keys(shapes).length]} 
            index={currentStep - Object.keys(shapes).length}
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
            disabled={currentStep >= Object.keys(shapes).length && !showAnswer}
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