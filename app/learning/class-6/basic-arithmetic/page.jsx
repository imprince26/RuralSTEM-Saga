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
  Plus,
  Minus,
  Equal
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function BasicArithmeticPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentProperty, setCurrentProperty] = useState('commutative');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addPoints } = useGameStore();

  // Interactive examples for each property
  const properties = {
    commutative: {
      title: 'Commutative Property',
      description: 'The order of numbers doesn\'t change the sum',
      examples: [
        { a: 5, b: 3, equation: '5 + 3 = 3 + 5', answer: 8 },
        { a: 7, b: 2, equation: '7 + 2 = 2 + 7', answer: 9 },
        { a: 4, b: 6, equation: '4 + 6 = 6 + 4', answer: 10 }
      ],
      visualization: 'number-swap'
    },
    associative: {
      title: 'Associative Property',
      description: 'Grouping of numbers doesn\'t change the sum',
      examples: [
        { equation: '(2 + 3) + 4 = 2 + (3 + 4)', left: 9, right: 9 },
        { equation: '(1 + 5) + 2 = 1 + (5 + 2)', left: 8, right: 8 },
        { equation: '(3 + 2) + 7 = 3 + (2 + 7)', left: 12, right: 12 }
      ],
      visualization: 'grouping'
    },
    identity: {
      title: 'Identity Property',
      description: 'Adding zero doesn\'t change the number',
      examples: [
        { a: 7, equation: '7 + 0 = 7', answer: 7 },
        { a: 15, equation: '15 + 0 = 15', answer: 15 },
        { a: 23, equation: '23 + 0 = 23', answer: 23 }
      ],
      visualization: 'zero-addition'
    }
  };

  const currentPropertyData = properties[currentProperty];
  const totalSteps = Object.keys(properties).length;
  const progress = ((Object.keys(properties).indexOf(currentProperty) + 1) / totalSteps) * 100;

  // Interactive number animation component
  const NumberAnimation = ({ property }) => {
    const [animationStep, setAnimationStep] = useState(0);
    
    useEffect(() => {
      if (isAnimating) {
        const interval = setInterval(() => {
          setAnimationStep(prev => (prev + 1) % 4);
        }, 1000);
        
        setTimeout(() => {
          setIsAnimating(false);
          setShowAnswer(true);
        }, 4000);
        
        return () => clearInterval(interval);
      }
    }, [isAnimating]);

    if (property === 'commutative') {
      const example = currentPropertyData.examples[0];
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <div className="flex items-center justify-center space-x-4 text-2xl font-bold">
            <div className={`w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center transition-transform duration-500 ${
              animationStep >= 2 ? 'transform translate-x-20' : ''
            }`}>
              {example.a}
            </div>
            
            <Plus className="h-8 w-8 text-primary" />
            
            <div className={`w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center transition-transform duration-500 ${
              animationStep >= 2 ? 'transform -translate-x-20' : ''
            }`}>
              {example.b}
            </div>
            
            <Equal className="h-8 w-8 text-primary" />
            
            {showAnswer && (
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center animate-pulse">
                {example.answer}
              </div>
            )}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-lg">{example.equation}</p>
            {showAnswer && (
              <p className="text-green-600 font-semibold mt-2">
                Both ways give us {example.answer}!
              </p>
            )}
          </div>
        </div>
      );
    }

    if (property === 'associative') {
      const example = currentPropertyData.examples[0];
      return (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="font-semibold mb-4">Left Side</h4>
              <div className="flex items-center justify-center space-x-2 text-xl">
                <div className="border-2 border-dashed border-purple-500 p-2 rounded">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded">2</span>
                  <span className="mx-1">+</span>
                  <span className="bg-purple-500 text-white px-2 py-1 rounded">3</span>
                </div>
                <span>+</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded">4</span>
              </div>
              <div className="mt-2">
                <span className="text-purple-600 font-bold">5</span>
                <span> + </span>
                <span className="text-blue-600 font-bold">4</span>
                <span> = </span>
                {showAnswer && <span className="text-green-600 font-bold text-xl">9</span>}
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-4">Right Side</h4>
              <div className="flex items-center justify-center space-x-2 text-xl">
                <span className="bg-red-500 text-white px-2 py-1 rounded">2</span>
                <span>+</span>
                <div className="border-2 border-dashed border-green-500 p-2 rounded">
                  <span className="bg-green-500 text-white px-2 py-1 rounded">3</span>
                  <span className="mx-1">+</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded">4</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-red-600 font-bold">2</span>
                <span> + </span>
                <span className="text-green-600 font-bold">7</span>
                <span> = </span>
                {showAnswer && <span className="text-green-600 font-bold text-xl">9</span>}
              </div>
            </div>
          </div>
          
          {showAnswer && (
            <div className="text-center mt-4">
              <p className="text-green-600 font-semibold text-lg">
                Both groupings give us 9!
              </p>
            </div>
          )}
        </div>
      );
    }

    if (property === 'identity') {
      const example = currentPropertyData.examples[0];
      return (
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <div className="flex items-center justify-center space-x-4 text-2xl font-bold">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
              {example.a}
            </div>
            
            <Plus className="h-8 w-8 text-primary" />
            
            <div className={`w-16 h-16 bg-gray-400 text-white rounded-full flex items-center justify-center ${
              animationStep >= 2 ? 'opacity-30' : ''
            }`}>
              0
            </div>
            
            <Equal className="h-8 w-8 text-primary" />
            
            {showAnswer && (
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center animate-pulse">
                {example.answer}
              </div>
            )}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-lg">{example.equation}</p>
            {showAnswer && (
              <p className="text-green-600 font-semibold mt-2">
                Adding zero doesn't change the number!
              </p>
            )}
          </div>
        </div>
      );
    }
  };

  const handleStartAnimation = () => {
    setIsAnimating(true);
    setShowAnswer(false);
  };

  const handleNextProperty = () => {
    const properties_keys = Object.keys(properties);
    const currentIndex = properties_keys.indexOf(currentProperty);
    
    if (currentIndex < properties_keys.length - 1) {
      celebrateCorrectAnswer(); // Add confetti for progress
      setCurrentProperty(properties_keys[currentIndex + 1]);
      setShowAnswer(false);
      setScore(prev => prev + 10);
    } else {
      // Completed all properties
      setCompleted(true);
      setScore(prev => prev + 50);
      addPoints(50);
      celebrateTheoremComplete(); // Use our theorem completion celebration
    }
  };

  const handleReset = () => {
    setCurrentProperty('commutative');
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  // Practice problems
  const [practiceProblems] = useState([
    { question: 'Which property shows that 4 + 7 = 7 + 4?', options: ['Commutative', 'Associative', 'Identity'], correct: 0 },
    { question: 'What is the result of 9 + 0?', options: ['0', '9', '18'], correct: 1 },
    { question: 'Does (3 + 5) + 2 equal 3 + (5 + 2)?', options: ['Yes', 'No', 'Sometimes'], correct: 0 }
  ]);

  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [practiceScore, setPracticeScore] = useState(0);

  const handlePracticeAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === practiceProblems[currentProblem].correct) {
      celebrateCorrectAnswer(); // Add confetti celebration
      setPracticeScore(prev => prev + 10);
      setTimeout(() => {
        if (currentProblem < practiceProblems.length - 1) {
          setCurrentProblem(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          // If this is the last problem, celebrate theorem completion
          celebrateTheoremComplete();
        }
      }, 1500);
    }
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
          
          <Badge className="bg-blue-100 text-blue-800">
            Mathematics
          </Badge>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Properties of Addition
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Learn how addition follows special rules that make math easier!
          </p>

          <div className="max-w-md mx-auto mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              <span>{score} points</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>Property: {currentPropertyData.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="learn" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="mt-6">
            {!completed ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    {currentPropertyData.title}
                  </CardTitle>
                  <CardDescription>
                    {currentPropertyData.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <NumberAnimation property={currentProperty} />

                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={handleStartAnimation}
                      disabled={isAnimating}
                      className="flex items-center gap-2"
                    >
                      {isAnimating ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Animating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Show Animation
                        </>
                      )}
                    </Button>

                    {showAnswer && (
                      <Button 
                        onClick={handleNextProperty}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {Object.keys(properties).indexOf(currentProperty) === Object.keys(properties).length - 1 ? 'Complete' : 'Next Property'}
                      </Button>
                    )}
                  </div>

                  {/* Real-world examples */}
                  <Card className="bg-secondary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Real-World Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentProperty === 'commutative' && (
                        <p>When you have 5 apples and your friend gives you 3 more, you get 8 apples. It doesn't matter if you count your 5 first or your friend's 3 first - you still have 8 apples total!</p>
                      )}
                      {currentProperty === 'associative' && (
                        <p>Imagine you're collecting stickers. You get 2 from one pack, 3 from another, and 4 from a third pack. Whether you count (2+3) first then add 4, or count 2 first then (3+4), you still get 9 stickers!</p>
                      )}
                      {currentProperty === 'identity' && (
                        <p>If you have 7 marbles and someone gives you 0 more marbles, you still have exactly 7 marbles. Zero doesn't change the amount!</p>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-green-700 dark:text-green-300">
                    Congratulations! 🎉
                  </CardTitle>
                  <CardDescription className="text-lg">
                    You've mastered all three properties of addition!
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-2xl font-bold text-primary">{score}</div>
                      <div className="text-sm text-muted-foreground">Points Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">3</div>
                      <div className="text-sm text-muted-foreground">Properties Learned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleReset} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Review Again
                    </Button>
                    <Button onClick={() => router.push('/learning/class-6')}>
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="practice" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>
                  Test your understanding with these questions
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {currentProblem < practiceProblems.length ? (
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">
                      Question {currentProblem + 1}: {practiceProblems[currentProblem].question}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {practiceProblems[currentProblem].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? 
                            (index === practiceProblems[currentProblem].correct ? "default" : "destructive") 
                            : "outline"
                          }
                          onClick={() => handlePracticeAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className="justify-start"
                        >
                          {option}
                          {selectedAnswer === index && index === practiceProblems[currentProblem].correct && (
                            <CheckCircle className="h-4 w-4 ml-2" />
                          )}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        Score: {practiceScore} points
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Practice Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      You scored {practiceScore} out of {practiceProblems.length * 10} points
                    </p>
                    <Button onClick={() => {
                      setCurrentProblem(0);
                      setSelectedAnswer(null);
                      setPracticeScore(0);
                    }}>
                      Try Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(properties).map(([key, property]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {property.description}
                    </p>
                    <div className="space-y-1">
                      {property.examples.slice(0, 2).map((example, index) => (
                        <div key={index} className="text-xs bg-secondary/20 p-2 rounded">
                          {example.equation || `${example.a} + ${example.b} = ${example.answer}`}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}