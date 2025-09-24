"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Atom, Trophy, Clock, Star, CheckCircle, Lightbulb, Target, Users, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function MotionStraightLinePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { addPoints, updateGameProgress } = useGameStore();

  const theoremData = {
    id: 'motion-straight-line',
    title: 'Motion in a Straight Line',
    description: 'Kinematics of motion along a straight line: velocity, acceleration, and equations of motion',
    difficulty: 'Medium',
    points: 160,
    duration: '30 min',
    class: 11,
    subject: 'physics',
    concept: 'Kinematics describes motion without considering the forces that cause it.',
    learningObjectives: [
      'Understand concepts of displacement, velocity, and acceleration',
      'Apply kinematic equations for uniformly accelerated motion',
      'Analyze motion graphs (position-time, velocity-time)',
      'Solve problems involving free fall and projectile motion',
      'Relate average and instantaneous quantities'
    ],
    theory: {
      introduction: "Motion in a straight line is the simplest form of motion. It involves concepts like position, displacement, velocity, and acceleration that form the foundation of mechanics.",
      keyPoints: [
        {
          title: "Position and Displacement",
          description: "Position is location relative to origin. Displacement is change in position.",
          example: "If x₁ = 5m and x₂ = 15m, displacement Δx = 15 - 5 = 10m"
        },
        {
          title: "Velocity",
          description: "Average velocity = displacement/time. Instantaneous velocity = dx/dt",
          example: "v_avg = Δx/Δt, v_inst = lim(Δt→0) Δx/Δt"
        },
        {
          title: "Acceleration",
          description: "Average acceleration = change in velocity/time. Instantaneous acceleration = dv/dt",
          example: "a_avg = Δv/Δt, a_inst = dv/dt = d²x/dt²"
        },
        {
          title: "Kinematic Equations",
          description: "Three equations for uniformly accelerated motion",
          example: "v = u + at, s = ut + ½at², v² = u² + 2as"
        },
        {
          title: "Free Fall",
          description: "Special case where acceleration = g (downward)",
          example: "For free fall: a = -g = -9.8 m/s² (taking upward as positive)"
        }
      ]
    },
    examples: [
      {
        title: "Uniformly Accelerated Motion",
        problem: "A car accelerates from rest at 2 m/s² for 10 seconds. Find final velocity and distance covered.",
        solution: "v = 20 m/s, s = 100 m",
        explanation: "Given: u = 0, a = 2 m/s², t = 10s. Using v = u + at: v = 0 + 2(10) = 20 m/s. Using s = ut + ½at²: s = 0 + ½(2)(10)² = 100 m"
      },
      {
        title: "Free Fall Problem",
        problem: "A ball is dropped from 45m height. Find time to reach ground and impact velocity.",
        solution: "t = 3 s, v = 30 m/s",
        explanation: "Given: s = 45m, u = 0, a = g = 10 m/s². Using s = ut + ½gt²: 45 = 0 + 5t², so t = 3s. Using v = u + gt: v = 0 + 10(3) = 30 m/s"
      },
      {
        title: "Relative Motion",
        problem: "Car A moves at 60 km/h east, Car B at 40 km/h west. Find relative velocity of A w.r.t B.",
        solution: "100 km/h east",
        explanation: "Taking east as positive: v_A = +60 km/h, v_B = -40 km/h. Relative velocity = v_A - v_B = 60 - (-40) = 100 km/h east"
      },
      {
        title: "Motion Graph Analysis",
        problem: "From a v-t graph: v = 10 m/s at t = 0, v = 30 m/s at t = 4s. Find acceleration and displacement.",
        solution: "a = 5 m/s², s = 80 m",
        explanation: "Acceleration = slope = (30-10)/(4-0) = 5 m/s². Displacement = area under curve = ½(10+30)(4) = 80 m"
      }
    ],
    practiceProblems: [
      {
        id: 1,
        question: "Which kinematic equation doesn't involve time?",
        options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "All involve time"],
        correct: 2,
        explanation: "v² = u² + 2as doesn't contain time variable 't', making it useful when time is unknown."
      },
      {
        id: 2,
        question: "A body starts from rest and accelerates at 4 m/s² for 5 seconds. What's its final velocity?",
        options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
        correct: 2,
        explanation: "Using v = u + at with u = 0, a = 4 m/s², t = 5s: v = 0 + 4(5) = 20 m/s"
      },
      {
        id: 3,
        question: "In a velocity-time graph, what does the area under the curve represent?",
        options: ["Velocity", "Acceleration", "Displacement", "Time"],
        correct: 2,
        explanation: "Area under velocity-time curve gives displacement (change in position)."
      },
      {
        id: 4,
        question: "A stone is thrown upward with 20 m/s. When will it return to starting point? (g = 10 m/s²)",
        options: ["2 s", "4 s", "6 s", "8 s"],
        correct: 1,
        explanation: "Total time = 2 × time to reach maximum height = 2 × (u/g) = 2 × (20/10) = 4 s"
      }
    ],
    realWorldApplications: [
      "Automotive industry: braking distance calculations",
      "Sports analysis: athlete performance tracking",
      "Traffic engineering: signal timing and road design",
      "Aerospace: rocket launch trajectories",
      "Safety systems: airbag deployment timing"
    ],
    tips: [
      "Always define coordinate system and positive direction clearly",
      "Distinguish between distance (scalar) and displacement (vector)",
      "Remember that acceleration can be negative (deceleration)",
      "Use appropriate kinematic equation based on given/unknown quantities",
      "Draw motion diagrams to visualize the problem"
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
          <Badge className="mb-4 bg-blue-500/10 text-blue-600">
            <Atom className="h-4 w-4 mr-1" />
            Physics • Class 11
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