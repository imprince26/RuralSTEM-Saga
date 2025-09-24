"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Zap, Trophy, Clock, Star, CheckCircle, Lightbulb, Target, Users, Play, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function AcidsBasesaltsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { addPoints, updateGameProgress } = useGameStore();

  const theoremData = {
    id: 'acids-bases-salts',
    title: 'Acids, Bases and Salts',
    description: 'Properties, reactions, and applications of acids, bases, and salts in chemistry',
    difficulty: 'Medium',
    points: 140,
    duration: '35 min',
    class: 10,
    subject: 'chemistry',
    concept: 'Acids release H⁺ ions, bases release OH⁻ ions, and salts are formed from acid-base neutralization reactions.',
    learningObjectives: [
      'Identify acids, bases, and salts based on their properties',
      'Understand pH scale and its significance',
      'Predict products of acid-base neutralization reactions',
      'Analyze preparation methods for common salts',
      'Apply knowledge to everyday chemical processes'
    ],
    theory: {
      introduction: "Acids, bases, and salts are fundamental classes of chemical compounds that play crucial roles in chemical reactions, biological processes, and industrial applications.",
      keyPoints: [
        {
          title: "Definition of Acids",
          description: "Substances that release hydrogen ions (H⁺) in aqueous solution",
          example: "HCl → H⁺ + Cl⁻, H₂SO₄ → 2H⁺ + SO₄²⁻"
        },
        {
          title: "Definition of Bases",
          description: "Substances that release hydroxide ions (OH⁻) in aqueous solution",
          example: "NaOH → Na⁺ + OH⁻, Ca(OH)₂ → Ca²⁺ + 2OH⁻"
        },
        {
          title: "pH Scale",
          description: "Measures acidity/basicity on scale 0-14, where 7 is neutral",
          example: "pH < 7 = acidic, pH = 7 = neutral, pH > 7 = basic"
        },
        {
          title: "Neutralization Reaction",
          description: "Acid + Base → Salt + Water, releases heat (exothermic)",
          example: "HCl + NaOH → NaCl + H₂O"
        },
        {
          title: "Salt Formation",
          description: "Ionic compounds formed from positive ions of bases and negative ions of acids",
          example: "Na⁺ from NaOH + Cl⁻ from HCl → NaCl (common salt)"
        }
      ]
    },
    examples: [
      {
        title: "Neutralization Reaction",
        problem: "Write the balanced equation when hydrochloric acid reacts with sodium hydroxide. Identify the salt formed.",
        solution: "HCl + NaOH → NaCl + H₂O",
        explanation: "This is a neutralization reaction. The salt formed is sodium chloride (NaCl), commonly known as table salt. This reaction is exothermic."
      },
      {
        title: "pH Calculation",
        problem: "If [H⁺] = 1 × 10⁻³ M in a solution, calculate the pH and determine if it's acidic or basic.",
        solution: "pH = 3, Solution is acidic",
        explanation: "pH = -log[H⁺] = -log(1 × 10⁻³) = -(-3) = 3. Since pH < 7, the solution is acidic."
      },
      {
        title: "Preparation of Salt",
        problem: "How would you prepare calcium sulfate from calcium carbonate and sulfuric acid?",
        solution: "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂",
        explanation: "Calcium carbonate reacts with sulfuric acid to produce calcium sulfate salt, water, and carbon dioxide gas."
      },
      {
        title: "Identifying Acid-Base Nature",
        problem: "A solution turns red litmus blue. What can you conclude about the solution?",
        solution: "The solution is basic",
        explanation: "Only basic solutions turn red litmus paper blue. This indicates the presence of OH⁻ ions or basic nature."
      }
    ],
    practiceProblems: [
      {
        id: 1,
        question: "Which of the following is a strong acid?",
        options: ["Acetic acid (CH₃COOH)", "Hydrochloric acid (HCl)", "Carbonic acid (H₂CO₃)", "Citric acid"],
        correct: 1,
        explanation: "HCl is a strong acid that completely ionizes in water, while the others are weak acids that partially ionize."
      },
      {
        id: 2,
        question: "The pH of pure water at 25°C is:",
        options: ["0", "7", "14", "1"],
        correct: 1,
        explanation: "Pure water has pH = 7 at 25°C, which is neutral (neither acidic nor basic)."
      },
      {
        id: 3,
        question: "What is produced when an acid reacts with a metal carbonate?",
        options: ["Salt + Water", "Salt + Hydrogen gas", "Salt + Water + CO₂", "Base + Water"],
        correct: 2,
        explanation: "Acid + Metal carbonate → Salt + Water + Carbon dioxide gas. This reaction produces effervescence due to CO₂."
      },
      {
        id: 4,
        question: "Which indicator shows different colors in acidic and basic solutions?",
        options: ["Litmus paper", "Phenolphthalein", "Methyl orange", "All of the above"],
        correct: 3,
        explanation: "All these are acid-base indicators: litmus (red/blue), phenolphthalein (colorless/pink), methyl orange (red/yellow)."
      }
    ],
    realWorldApplications: [
      "Food preservation using acids (vinegar, citric acid)",
      "Antacids for treating acidity (calcium carbonate, sodium bicarbonate)",
      "Industrial processes like soap making using strong bases",
      "Water treatment using lime (calcium hydroxide) to remove hardness",
      "Battery acid (sulfuric acid) in car batteries for energy storage"
    ],
    tips: [
      "Remember: Acids taste sour, bases taste bitter and feel slippery",
      "Strong acids/bases ionize completely, weak ones partially",
      "pH + pOH = 14 (at 25°C) - useful for calculations",
      "Neutralization always produces salt + water + heat",
      "Use indicators to test acid/base nature: litmus, phenolphthalein, etc."
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
          <Badge className="mb-4 bg-green-500/10 text-green-600">
            <Zap className="h-4 w-4 mr-1" />
            Chemistry • Class 10
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