"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Pizza } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function FractionPizzaGame() {
  const { updateGameProgress } = useGameStore();
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate fraction questions
  const generateQuestions = useCallback(() => {
    const newQuestions = [];
    const questionCount = 12;
    
    const questionTypes = [
      'identify', // Identify fraction from visual
      'compare', // Compare two fractions
      'add', // Add fractions
      'subtract', // Subtract fractions
      'equivalent' // Find equivalent fraction
    ];
    
    for (let i = 0; i < questionCount; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let question = {};
      
      switch (type) {
        case 'identify':
          const denominator = [2, 3, 4, 6, 8][Math.floor(Math.random() * 5)];
          const numerator = Math.floor(Math.random() * denominator) + 1;
          question = {
            type: 'identify',
            question: `What fraction of the pizza is shaded?`,
            visual: { numerator, denominator },
            correctAnswer: `${numerator}/${denominator}`,
            answers: generateFractionOptions(numerator, denominator)
          };
          break;
          
        case 'compare':
          const frac1 = generateRandomFraction();
          const frac2 = generateRandomFraction();
          const comparison = compareFractions(frac1, frac2);
          question = {
            type: 'compare',
            question: `Which is larger: ${frac1.num}/${frac1.den} or ${frac2.num}/${frac2.den}?`,
            correctAnswer: comparison === 0 ? 'Equal' : comparison > 0 ? `${frac1.num}/${frac1.den}` : `${frac2.num}/${frac2.den}`,
            answers: [`${frac1.num}/${frac1.den}`, `${frac2.num}/${frac2.den}`, 'Equal'].sort(() => Math.random() - 0.5)
          };
          break;
          
        case 'add':
          const addFrac1 = generateSimpleFraction();
          const addFrac2 = generateSimpleFraction();
          const sum = addFractions(addFrac1, addFrac2);
          question = {
            type: 'add',
            question: `${addFrac1.num}/${addFrac1.den} + ${addFrac2.num}/${addFrac2.den} = ?`,
            correctAnswer: `${sum.num}/${sum.den}`,
            answers: generateArithmeticOptions(sum)
          };
          break;
          
        case 'subtract':
          const subFrac1 = generateSimpleFraction();
          const subFrac2 = generateSimpleFraction();
          // Ensure first fraction is larger
          if (compareFractions(subFrac1, subFrac2) < 0) {
            [subFrac1.num, subFrac2.num] = [subFrac2.num, subFrac1.num];
            [subFrac1.den, subFrac2.den] = [subFrac2.den, subFrac1.den];
          }
          const diff = subtractFractions(subFrac1, subFrac2);
          question = {
            type: 'subtract',
            question: `${subFrac1.num}/${subFrac1.den} - ${subFrac2.num}/${subFrac2.den} = ?`,
            correctAnswer: `${diff.num}/${diff.den}`,
            answers: generateArithmeticOptions(diff)
          };
          break;
          
        case 'equivalent':
          const baseFraction = generateSimpleFraction();
          const multiplier = Math.floor(Math.random() * 3) + 2;
          const equivalent = { num: baseFraction.num * multiplier, den: baseFraction.den * multiplier };
          question = {
            type: 'equivalent',
            question: `Which fraction is equivalent to ${baseFraction.num}/${baseFraction.den}?`,
            correctAnswer: `${equivalent.num}/${equivalent.den}`,
            answers: generateEquivalentOptions(baseFraction, equivalent)
          };
          break;
      }
      
      newQuestions.push(question);
    }
    setQuestions(newQuestions);
  }, []);

  // Helper functions for fraction operations
  const generateRandomFraction = () => {
    const den = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
    const num = Math.floor(Math.random() * den) + 1;
    return { num, den };
  };

  const generateSimpleFraction = () => {
    const den = [2, 3, 4, 6][Math.floor(Math.random() * 4)];
    const num = Math.floor(Math.random() * den) + 1;
    return { num, den };
  };

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const simplifyFraction = (num, den) => {
    const g = gcd(num, den);
    return { num: num / g, den: den / g };
  };

  const compareFractions = (frac1, frac2) => {
    const val1 = frac1.num / frac1.den;
    const val2 = frac2.num / frac2.den;
    return val1 - val2;
  };

  const addFractions = (frac1, frac2) => {
    const commonDen = frac1.den * frac2.den;
    const newNum = (frac1.num * frac2.den) + (frac2.num * frac1.den);
    return simplifyFraction(newNum, commonDen);
  };

  const subtractFractions = (frac1, frac2) => {
    const commonDen = frac1.den * frac2.den;
    const newNum = (frac1.num * frac2.den) - (frac2.num * frac1.den);
    return simplifyFraction(newNum, commonDen);
  };

  const generateFractionOptions = (correctNum, correctDen) => {
    const options = [`${correctNum}/${correctDen}`];
    while (options.length < 4) {
      const num = Math.floor(Math.random() * correctDen) + 1;
      const den = correctDen;
      const option = `${num}/${den}`;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateArithmeticOptions = (correct) => {
    const options = [`${correct.num}/${correct.den}`];
    while (options.length < 4) {
      const variation = Math.floor(Math.random() * 4) - 2;
      const newNum = Math.max(1, correct.num + variation);
      const newDen = correct.den + (Math.floor(Math.random() * 3) - 1);
      const option = `${newNum}/${Math.max(1, newDen)}`;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateEquivalentOptions = (base, correct) => {
    const options = [`${correct.num}/${correct.den}`];
    while (options.length < 4) {
      const mult = Math.floor(Math.random() * 4) + 2;
      const num = base.num * mult + Math.floor(Math.random() * 3) - 1;
      const den = base.den * mult + Math.floor(Math.random() * 3) - 1;
      const option = `${Math.max(1, num)}/${Math.max(1, den)}`;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  // Render pizza visual for identify questions
  const renderPizzaVisual = (numerator, denominator) => {
    const sliceAngle = 360 / denominator;
    const slices = Array.from({ length: denominator }, (_, i) => i);
    
    return (
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="90" fill="#fbbf24" stroke="#f59e0b" strokeWidth="4"/>
            {slices.map((slice, index) => {
              const startAngle = (slice * sliceAngle - 90) * (Math.PI / 180);
              const endAngle = ((slice + 1) * sliceAngle - 90) * (Math.PI / 180);
              const x1 = 100 + 90 * Math.cos(startAngle);
              const y1 = 100 + 90 * Math.sin(startAngle);
              const x2 = 100 + 90 * Math.cos(endAngle);
              const y2 = 100 + 90 * Math.sin(endAngle);
              
              return (
                <g key={index}>
                  <line x1="100" y1="100" x2={x1} y2={y1} stroke="#f59e0b" strokeWidth="2"/>
                  {index < numerator && (
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill="#dc2626"
                      opacity="0.8"
                    />
                  )}
                </g>
              );
            })}
            {/* Pizza toppings */}
            <circle cx="85" cy="85" r="4" fill="#dc2626"/>
            <circle cx="115" cy="85" r="4" fill="#dc2626"/>
            <circle cx="85" cy="115" r="4" fill="#dc2626"/>
            <circle cx="115" cy="115" r="4" fill="#dc2626"/>
            <circle cx="100" cy="100" r="4" fill="#dc2626"/>
          </svg>
        </div>
      </div>
    );
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    generateQuestions();
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(180);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
  };

  const selectAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const points = 15 + (streak * 3);
      setScore(score + points);
      setStreak(streak + 1);
      celebrateCorrectAnswer(); // Celebration effect
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 2000);
  };

  const endGame = () => {
    setGameState('completed');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    updateGameProgress('fraction-pizza', {
      completed: true,
      score: score,
      progress: progress,
      bestScore: score,
      lastPlayed: new Date().toISOString()
    });
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions([]);
    setStreak(0);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🍕 Fraction Pizza</CardTitle>
              <CardDescription className="text-lg">
                Learn fractions by slicing and sharing delicious pizzas!
              </CardDescription>
              
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-orange-500">
                  <Star className="h-3 w-3 mr-1" />
                  Medium
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  3 minutes
                </Badge>
                <Badge variant="outline">
                  <Trophy className="h-3 w-3 mr-1" />
                  180 points max
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-left bg-orange-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">How to Play:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Identify fractions shown on pizza slices</li>
                    <li>• Compare different fractions</li>
                    <li>• Add and subtract fractions</li>
                    <li>• Find equivalent fractions</li>
                    <li>• Build streaks for bonus points!</li>
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-32 h-32">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="100" cy="100" r="90" fill="#fbbf24" stroke="#f59e0b" strokeWidth="4"/>
                      <path d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z" fill="#dc2626" opacity="0.8"/>
                      <path d="M 100 100 L 190 100 A 90 90 0 0 1 100 190 Z" fill="#dc2626" opacity="0.8"/>
                      <line x1="100" y1="100" x2="100" y2="10" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="100" y1="100" x2="190" y2="100" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="100" y1="100" x2="100" y2="190" stroke="#f59e0b" strokeWidth="2"/>
                      <line x1="100" y1="100" x2="10" y2="100" stroke="#f59e0b" strokeWidth="2"/>
                      <circle cx="85" cy="85" r="3" fill="#dc2626"/>
                      <circle cx="115" cy="85" r="3" fill="#dc2626"/>
                      <circle cx="85" cy="115" r="3" fill="#dc2626"/>
                      <circle cx="115" cy="115" r="3" fill="#dc2626"/>
                    </svg>
                  </div>
                </div>
                
                <Button onClick={startGame} size="lg" className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                  Start Fraction Pizza
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const correctAnswers = Math.floor(score / 15);
    const percentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🎉 Pizza Mastery!</CardTitle>
              <CardDescription className="text-lg">
                You've become a fraction pizza expert!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-6xl">
                  {percentage >= 90 ? '🏆' : percentage >= 75 ? '🥈' : percentage >= 60 ? '🥉' : '🍕'}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600">{score}</div>
                  <div className="text-gray-600">Total Score</div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-gray-500">{Math.round(percentage)}% Accuracy</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{questions.length}</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Correct</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{180 - timeLeft}s</div>
                    <div className="text-sm text-gray-500">Time Used</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={resetGame} variant="outline" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Play Again
                  </Button>
                  <Link href="/games" className="flex-1">
                    <Button className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Games
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/games">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Game
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline">
              <Trophy className="h-4 w-4 mr-1" />
              {score} pts
            </Badge>
            {streak > 0 && (
              <Badge className="bg-orange-500">
                🔥 {streak} streak
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
              <div className="text-sm text-gray-500">{Math.round(progress)}% Complete</div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-2xl font-bold text-orange-600 mb-4">
                {currentQ?.question}
              </div>
              
              {currentQ?.type === 'identify' && currentQ.visual && 
                renderPizzaVisual(currentQ.visual.numerator, currentQ.visual.denominator)
              }
              
              <div className="grid grid-cols-2 gap-4">
                {currentQ?.answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => selectAnswer(answer)}
                    disabled={showResult}
                    className={`p-6 text-xl h-auto ${
                      showResult
                        ? answer === currentQ.correctAnswer
                          ? 'bg-green-500 hover:bg-green-500'
                          : selectedAnswer === answer
                          ? 'bg-red-500 hover:bg-red-500'
                          : ''
                        : 'hover:scale-105 transition-transform'
                    }`}
                    variant={showResult && answer !== currentQ.correctAnswer && selectedAnswer !== answer ? "outline" : "default"}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
              
              {showResult && (
                <div className={`text-lg font-semibold ${
                  selectedAnswer === currentQ.correctAnswer ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedAnswer === currentQ.correctAnswer 
                    ? `🎉 Correct! +${15 + (streak * 3)} points` 
                    : `❌ Wrong! The answer was ${currentQ.correctAnswer}`
                  }
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}