"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calculator, Trophy, Clock, Star, CheckCircle, Lightbulb, Target, Users, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function QuadraticEquationsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { addPoints, updateGameProgress } = useGameStore();

  const theoremData = {
    id: 'quadratic-equations',
    title: 'Quadratic Equations',
    description: 'Solving by factorization, completing square, and quadratic formula',
    difficulty: 'Hard',
    points: 160,
    duration: '35 min',
    class: 10,
    subject: 'mathematics',
    concept: 'Quadratic equations have degree 2 and can be solved using multiple methods. The discriminant determines the nature of roots.',
    learningObjectives: [
      'Understand the standard form of quadratic equations',
      'Solve quadratic equations by factorization',
      'Apply the quadratic formula and discriminant',
      'Complete the square method',
      'Analyze the nature of roots using discriminant'
    ],
    theory: {
      introduction: "A quadratic equation is a polynomial equation of degree 2. It has the general form ax² + bx + c = 0, where a ≠ 0.",
      keyPoints: [
        {
          title: "Standard Form",
          description: "The general form of a quadratic equation is ax² + bx + c = 0",
          example: "2x² - 5x + 3 = 0 (where a = 2, b = -5, c = 3)"
        },
        {
          title: "Factorization Method",
          description: "Express the quadratic as a product of two linear factors",
          example: "x² - 5x + 6 = (x - 2)(x - 3) = 0, so x = 2 or x = 3"
        },
        {
          title: "Quadratic Formula",
          description: "x = (-b ± √(b² - 4ac)) / 2a gives the roots for any quadratic",
          example: "For x² - 5x + 6 = 0: x = (5 ± √(25-24))/2 = (5 ± 1)/2"
        },
        {
          title: "Discriminant",
          description: "Δ = b² - 4ac determines the nature of roots",
          example: "Δ > 0: real and distinct, Δ = 0: real and equal, Δ < 0: complex"
        },
        {
          title: "Completing the Square",
          description: "Rewrite the equation in the form (x + p)² = q",
          example: "x² - 6x + 5 = 0 becomes (x - 3)² = 4, so x - 3 = ±2"
        }
      ]
    },
    examples: [
      {
        title: "Solving by Factorization",
        problem: "Solve x² - 7x + 12 = 0.",
        solution: "x = 3 or x = 4",
        explanation: "Factor: x² - 7x + 12 = (x - 3)(x - 4) = 0. Using zero product property: x - 3 = 0 or x - 4 = 0, giving x = 3 or x = 4."
      },
      {
        title: "Using Quadratic Formula",
        problem: "Solve 2x² + 3x - 2 = 0 using the quadratic formula.",
        solution: "x = 1/2 or x = -2",
        explanation: "a = 2, b = 3, c = -2. Using formula: x = (-3 ± √(9 + 16))/4 = (-3 ± 5)/4. So x = 2/4 = 1/2 or x = -8/4 = -2."
      },
      {
        title: "Nature of Roots",
        problem: "Find the nature of roots for x² - 4x + 5 = 0.",
        solution: "Complex roots (no real solutions)",
        explanation: "Discriminant = (-4)² - 4(1)(5) = 16 - 20 = -4 < 0. Since Δ < 0, the equation has complex roots."
      },
      {
        title: "Completing the Square",
        problem: "Solve x² + 6x + 8 = 0 by completing the square.",
        solution: "x = -2 or x = -4",
        explanation: "x² + 6x + 8 = 0. Complete square: (x + 3)² - 9 + 8 = 0, so (x + 3)² = 1. Thus x + 3 = ±1, giving x = -2 or x = -4."
      }
    ],
    practiceProblems: [
      {
        id: 1,
        question: "What is the discriminant of 3x² - 2x + 1 = 0?",
        options: ["-8", "-4", "4", "8"],
        correct: 0,
        explanation: "Discriminant = b² - 4ac = (-2)² - 4(3)(1) = 4 - 12 = -8"
      },
      {
        id: 2,
        question: "Solve x² - 9 = 0.",
        options: ["x = ±3", "x = ±9", "x = 3", "x = 9"],
        correct: 0,
        explanation: "x² - 9 = 0 gives x² = 9, so x = ±√9 = ±3"
      },
      {
        id: 3,
        question: "If the roots of ax² + bx + c = 0 are equal, then:",
        options: ["b² = 4ac", "b² < 4ac", "b² > 4ac", "b = 0"],
        correct: 0,
        explanation: "For equal roots, discriminant = 0, so b² - 4ac = 0, which means b² = 4ac"
      },
      {
        id: 4,
        question: "The sum of roots of 2x² - 7x + 3 = 0 is:",
        options: ["7/2", "-7/2", "3/2", "-3/2"],
        correct: 0,
        explanation: "Sum of roots = -b/a = -(-7)/2 = 7/2"
      }
    ],
    realWorldApplications: [
      "Projectile motion: Finding maximum height and range",
      "Business: Profit maximization and break-even analysis",
      "Engineering: Designing parabolic structures and bridges",
      "Physics: Calculating trajectories and optimization problems",
      "Architecture: Parabolic arches and structural design"
    ],
    tips: [
      "Always check if a quadratic can be factored easily before using other methods",
      "Use the discriminant to quickly determine the nature of roots",
      "When completing the square, add and subtract (b/2)²",
      "Remember: sum of roots = -b/a, product of roots = c/a",
      "Practice identifying the values of a, b, and c in different forms"
    ]
  };

  const steps = [
    { title: "Introduction", content: "theory" },
    { title: "Examples", content: "examples" },
    { title: "Practice", content: "practice" },
    { title: "Applications", content: "applications" },
    { title: "Summary", content: "summary" }
  ];

  useEffect(() => {
    const newProgress = ((currentStep + 1) / steps.length) * 100;
    setProgress(newProgress);
    
    if (currentStep === steps.length - 1 && !isCompleted) {
      setIsCompleted(true);
      setShowCelebration(true);
      addPoints(theoremData.points);
      updateGameProgress(`class-${theoremData.class}-${theoremData.id}`, 100);
      
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [currentStep, addPoints, updateGameProgress, theoremData.points, theoremData.class, theoremData.id, isCompleted, steps.length]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const PracticeSection = () => {
    const [currentProblem, setCurrentProblem] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerSelect = (optionIndex) => {
      setSelectedAnswer(optionIndex);
      setShowResult(true);
      
      if (optionIndex === theoremData.practiceProblems[currentProblem].correct) {
        setScore(score + 1);
      }
    };

    const nextProblem = () => {
      if (currentProblem < theoremData.practiceProblems.length - 1) {
        setCurrentProblem(currentProblem + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    };

    const resetPractice = () => {
      setCurrentProblem(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
    };

    const problem = theoremData.practiceProblems[currentProblem];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Practice Problems</h3>
          <Badge variant="secondary">
            Problem {currentProblem + 1} of {theoremData.practiceProblems.length}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{problem.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {problem.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? index === problem.correct
                        ? "default"
                        : index === selectedAnswer
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className="h-12 text-left justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                <p className="font-medium mb-2">
                  {selectedAnswer === problem.correct ? "Correct! 🎉" : "Incorrect 😔"}
                </p>
                <p className="text-sm text-muted-foreground">{problem.explanation}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Score: {score}/{theoremData.practiceProblems.length}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetPractice}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                
                {showResult && currentProblem < theoremData.practiceProblems.length - 1 && (
                  <Button size="sm" onClick={nextProblem}>
                    Next Problem
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-8 text-center max-w-md animate-pulse">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
            <p className="text-muted-foreground mb-4">
              You've completed {theoremData.title}!
            </p>
            <Badge className="text-lg px-4 py-2">
              +{theoremData.points} Points Earned!
            </Badge>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Class 10
          </Button>
        </div>

        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary">
            <Calculator className="h-4 w-4 mr-1" />
            Mathematics • Class 10
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {theoremData.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {theoremData.description}
          </p>

          <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{theoremData.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{theoremData.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{theoremData.points} points</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Learning Content */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex bg-secondary/20 rounded-lg p-1">
              {steps.map((step, index) => (
                <Button
                  key={index}
                  variant={currentStep === index ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentStep(index)}
                  className="relative"
                >
                  {index < currentStep && (
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  )}
                  {step.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Content based on current step */}
          {steps[currentStep].content === "theory" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Understanding {theoremData.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-lg">{theoremData.theory.introduction}</p>
                </div>

                <div className="space-y-4">
                  {theoremData.theory.keyPoints.map((point, index) => (
                    <div key={index} className="border-l-4 border-primary/30 pl-4">
                      <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                      <p className="text-muted-foreground mb-2">{point.description}</p>
                      <div className="bg-secondary/20 p-3 rounded font-mono text-sm">
                        {point.example}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Learning Objectives:</h4>
                  <ul className="space-y-2">
                    {theoremData.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {steps[currentStep].content === "examples" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Worked Examples</h2>
              {theoremData.examples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Problem:</h4>
                      <p>{example.problem}</p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <p className="font-mono text-sm mb-2">{example.solution}</p>
                      <p className="text-sm text-muted-foreground">{example.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {steps[currentStep].content === "practice" && <PracticeSection />}

          {steps[currentStep].content === "applications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Real-World Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {theoremData.realWorldApplications.map((application, index) => (
                    <div key={index} className="bg-secondary/10 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="font-medium">{application}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Pro Tips for Success
                  </h4>
                  <ul className="space-y-2">
                    {theoremData.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {steps[currentStep].content === "summary" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Lesson Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
                  <p className="text-muted-foreground mb-4">
                    You've successfully completed the {theoremData.title} lesson.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{theoremData.points}</div>
                      <div className="text-sm text-muted-foreground">Points Earned</div>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-muted-foreground">Completion</div>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{theoremData.difficulty}</div>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What you've learned:</h4>
                  <ul className="space-y-1">
                    {theoremData.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center gap-4">
                  <Link href="/learning/class-10">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Class 10
                    </Button>
                  </Link>
                  
                  <Button 
                    size="lg" 
                    onClick={() => {
                      setCurrentStep(0);
                      setProgress(0);
                      setIsCompleted(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Review Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1}
          >
            Next
            <Play className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}