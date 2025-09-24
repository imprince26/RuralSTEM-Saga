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

export default function ComplexNumbersPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { addPoints, updateGameProgress } = useGameStore();

  const theoremData = {
    id: 'complex-numbers',
    title: 'Complex Numbers and Quadratic Equations',
    description: 'Understanding complex numbers, operations, and their applications in solving equations',
    difficulty: 'Medium',
    points: 170,
    duration: '35 min',
    class: 11,
    subject: 'mathematics',
    concept: 'Complex numbers extend real numbers by introducing the imaginary unit i, where i² = -1.',
    learningObjectives: [
      'Understand the concept of complex numbers and imaginary unit',
      'Perform operations on complex numbers (addition, multiplication, division)',
      'Find square roots of negative numbers',
      'Solve quadratic equations with complex roots',
      'Represent complex numbers in different forms'
    ],
    theory: {
      introduction: "Complex numbers are an extension of real numbers that include an imaginary component. They are essential for solving equations that have no real solutions.",
      keyPoints: [
        {
          title: "Imaginary Unit",
          description: "The fundamental imaginary unit i is defined as the square root of -1",
          example: "i = √(-1), so i² = -1"
        },
        {
          title: "Standard Form",
          description: "A complex number is written as a + bi where a and b are real numbers",
          example: "3 + 4i, -2 + 7i, 5 - 3i"
        },
        {
          title: "Addition and Subtraction",
          description: "Add/subtract the real parts and imaginary parts separately",
          example: "(3 + 4i) + (2 - 5i) = 5 - i"
        },
        {
          title: "Multiplication",
          description: "Use distributive property and remember that i² = -1",
          example: "(2 + 3i)(1 + i) = 2 + 2i + 3i + 3i² = 2 + 5i - 3 = -1 + 5i"
        },
        {
          title: "Complex Conjugate",
          description: "For z = a + bi, the conjugate is z̄ = a - bi",
          example: "If z = 3 + 4i, then z̄ = 3 - 4i"
        }
      ]
    },
    examples: [
      {
        title: "Adding Complex Numbers",
        problem: "Add (3 + 2i) + (4 - 5i).",
        solution: "7 - 3i",
        explanation: "Add real parts: 3 + 4 = 7. Add imaginary parts: 2i + (-5i) = -3i. Result: 7 - 3i."
      },
      {
        title: "Multiplying Complex Numbers",
        problem: "Multiply (2 + i)(3 - 2i).",
        solution: "8 - i",
        explanation: "(2 + i)(3 - 2i) = 6 - 4i + 3i - 2i² = 6 - i - 2(-1) = 6 - i + 2 = 8 - i"
      },
      {
        title: "Finding Square Root",
        problem: "Find √(-16).",
        solution: "4i",
        explanation: "√(-16) = √(16 × -1) = √16 × √(-1) = 4 × i = 4i"
      },
      {
        title: "Solving Quadratic Equation",
        problem: "Solve x² + 2x + 5 = 0.",
        solution: "x = -1 ± 2i",
        explanation: "Using quadratic formula: x = (-2 ± √(4-20))/2 = (-2 ± √(-16))/2 = (-2 ± 4i)/2 = -1 ± 2i"
      }
    ],
    practiceProblems: [
      {
        id: 1,
        question: "What is i³?",
        options: ["i", "-i", "1", "-1"],
        correct: 1,
        explanation: "i³ = i² × i = (-1) × i = -i"
      },
      {
        id: 2,
        question: "What is (2 + 3i) + (1 - 4i)?",
        options: ["3 - i", "3 + i", "1 - i", "1 + i"],
        correct: 0,
        explanation: "Add real parts: 2 + 1 = 3. Add imaginary parts: 3i + (-4i) = -i. Result: 3 - i"
      },
      {
        id: 3,
        question: "What is the conjugate of 5 - 3i?",
        options: ["5 + 3i", "-5 + 3i", "-5 - 3i", "3 - 5i"],
        correct: 0,
        explanation: "The conjugate of a + bi is a - bi. So conjugate of 5 - 3i is 5 + 3i"
      },
      {
        id: 4,
        question: "What is √(-25)?",
        options: ["5i", "-5i", "25i", "-25i"],
        correct: 0,
        explanation: "√(-25) = √(25 × -1) = √25 × √(-1) = 5 × i = 5i"
      }
    ],
    realWorldApplications: [
      "Electrical engineering: AC circuit analysis",
      "Quantum mechanics: wave functions and probability",
      "Signal processing: Fourier transforms",
      "Computer graphics: rotations and transformations",
      "Control systems: stability analysis"
    ],
    tips: [
      "Remember that i² = -1, i³ = -i, i⁴ = 1, and the pattern repeats",
      "When multiplying complex numbers, use FOIL and simplify i² terms",
      "To divide complex numbers, multiply by the conjugate",
      "Complex roots of quadratic equations come in conjugate pairs",
      "Visualize complex numbers as points in the complex plane"
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
            Back to Class 11
          </Button>
        </div>

        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary">
            <Calculator className="h-4 w-4 mr-1" />
            Mathematics • Class 11
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
                  <Link href="/learning/class-11">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Class 11
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