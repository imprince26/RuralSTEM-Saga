"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Shapes } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function PatternMasterGame() {
  const { updateGameProgress } = useGameStore();
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(240);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');

  // Pattern types and shapes
  const shapes = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠', '⭐', '❤️', '💎', '🔷'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Generate pattern questions
  const generateQuestions = useCallback((diff) => {
    const newQuestions = [];
    const questionCount = diff === 'easy' ? 8 : diff === 'medium' ? 10 : 12;
    
    const patternTypes = [
      'sequence', // Number sequences
      'shape', // Shape patterns
      'color', // Color patterns
      'mixed', // Mixed patterns
      'fibonacci', // Special sequences
      'arithmetic' // Arithmetic progressions
    ];
    
    for (let i = 0; i < questionCount; i++) {
      const type = patternTypes[Math.floor(Math.random() * patternTypes.length)];
      let question = {};
      
      switch (type) {
        case 'sequence':
          question = generateNumberSequence(diff);
          break;
        case 'shape':
          question = generateShapePattern(diff);
          break;
        case 'color':
          question = generateColorPattern(diff);
          break;
        case 'mixed':
          question = generateMixedPattern(diff);
          break;
        case 'fibonacci':
          question = generateFibonacciPattern(diff);
          break;
        case 'arithmetic':
          question = generateArithmeticPattern(diff);
          break;
      }
      
      newQuestions.push(question);
    }
    setQuestions(newQuestions);
  }, []);

  const generateNumberSequence = (diff) => {
    const start = Math.floor(Math.random() * 10) + 1;
    const step = diff === 'easy' ? Math.floor(Math.random() * 3) + 1 : 
                 diff === 'medium' ? Math.floor(Math.random() * 5) + 1 : 
                 Math.floor(Math.random() * 8) + 1;
    
    const length = diff === 'easy' ? 4 : diff === 'medium' ? 5 : 6;
    const sequence = [];
    
    for (let i = 0; i < length; i++) {
      sequence.push(start + (i * step));
    }
    
    const correctAnswer = start + (length * step);
    const pattern = sequence.join(', ') + ', ?';
    
    return {
      type: 'sequence',
      question: `What comes next in this sequence: ${pattern}`,
      correctAnswer: correctAnswer.toString(),
      answers: generateNumberOptions(correctAnswer, step),
      pattern: sequence
    };
  };

  const generateShapePattern = (diff) => {
    const patternLength = diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5;
    const shapeCount = diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5;
    const selectedShapes = shapes.slice(0, shapeCount);
    const pattern = [];
    
    for (let i = 0; i < patternLength * 2; i++) {
      pattern.push(selectedShapes[i % patternLength]);
    }
    
    const correctAnswer = selectedShapes[pattern.length % patternLength];
    const patternDisplay = pattern.join(' ') + ' ?';
    
    return {
      type: 'shape',
      question: `What shape comes next in this pattern: ${patternDisplay}`,
      correctAnswer: correctAnswer,
      answers: generateShapeOptions(correctAnswer, selectedShapes),
      pattern: pattern
    };
  };

  const generateColorPattern = (diff) => {
    const colors = ['🔴', '🔵', '🟡', '🟢'];
    const patternLength = diff === 'easy' ? 2 : diff === 'medium' ? 3 : 4;
    const pattern = [];
    
    for (let i = 0; i < patternLength * 2 + Math.floor(Math.random() * 2); i++) {
      pattern.push(colors[i % patternLength]);
    }
    
    const correctAnswer = colors[pattern.length % patternLength];
    const patternDisplay = pattern.join(' ') + ' ?';
    
    return {
      type: 'color',
      question: `What color comes next in this pattern: ${patternDisplay}`,
      correctAnswer: correctAnswer,
      answers: generateShapeOptions(correctAnswer, colors),
      pattern: pattern
    };
  };

  const generateMixedPattern = (diff) => {
    const items = ['A1', 'B2', 'C3', 'D4', 'E5', 'F6', 'G7', 'H8'];
    const patternLength = diff === 'easy' ? 2 : 3;
    const pattern = [];
    
    for (let i = 0; i < patternLength * 2; i++) {
      pattern.push(items[i % patternLength]);
    }
    
    const correctAnswer = items[pattern.length % patternLength];
    const patternDisplay = pattern.join(', ') + ', ?';
    
    return {
      type: 'mixed',
      question: `What comes next in this pattern: ${patternDisplay}`,
      correctAnswer: correctAnswer,
      answers: generateMixedOptions(correctAnswer, items),
      pattern: pattern
    };
  };

  const generateFibonacciPattern = (diff) => {
    const sequence = [1, 1];
    const length = diff === 'easy' ? 5 : diff === 'medium' ? 6 : 7;
    
    for (let i = 2; i < length; i++) {
      sequence.push(sequence[i-1] + sequence[i-2]);
    }
    
    const correctAnswer = sequence[length-1] + sequence[length-2];
    const pattern = sequence.join(', ') + ', ?';
    
    return {
      type: 'fibonacci',
      question: `What comes next in this Fibonacci sequence: ${pattern}`,
      correctAnswer: correctAnswer.toString(),
      answers: generateNumberOptions(correctAnswer, Math.floor(correctAnswer * 0.2)),
      pattern: sequence
    };
  };

  const generateArithmeticPattern = (diff) => {
    const start = Math.floor(Math.random() * 20) + 1;
    const difference = diff === 'easy' ? Math.floor(Math.random() * 5) + 2 : 
                      diff === 'medium' ? Math.floor(Math.random() * 8) + 3 : 
                      Math.floor(Math.random() * 12) + 4;
    
    const length = diff === 'easy' ? 4 : diff === 'medium' ? 5 : 6;
    const sequence = [];
    
    for (let i = 0; i < length; i++) {
      sequence.push(start + (i * difference));
    }
    
    const correctAnswer = start + (length * difference);
    const pattern = sequence.join(', ') + ', ?';
    
    return {
      type: 'arithmetic',
      question: `What comes next in this arithmetic sequence: ${pattern}`,
      correctAnswer: correctAnswer.toString(),
      answers: generateNumberOptions(correctAnswer, difference),
      pattern: sequence
    };
  };

  const generateNumberOptions = (correct, step) => {
    const options = [correct.toString()];
    const variations = [step, -step, step * 2, -step * 2, Math.floor(step / 2)];
    
    for (let variation of variations) {
      const option = (correct + variation).toString();
      if (!options.includes(option) && options.length < 4) {
        options.push(option);
      }
    }
    
    while (options.length < 4) {
      const random = (correct + Math.floor(Math.random() * 20) - 10).toString();
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generateShapeOptions = (correct, availableShapes) => {
    const options = [correct];
    for (let shape of availableShapes) {
      if (shape !== correct && options.length < 4) {
        options.push(shape);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const generateMixedOptions = (correct, items) => {
    const options = [correct];
    const shuffled = items.filter(item => item !== correct).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push(shuffled[i]);
    }
    
    return options.sort(() => Math.random() - 0.5);
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

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    generateQuestions(selectedDifficulty);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(selectedDifficulty === 'easy' ? 240 : selectedDifficulty === 'medium' ? 180 : 120);
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
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
      const points = basePoints + (streak * 2);
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
    
    updateGameProgress('pattern-master', {
      completed: true,
      score: score,
      progress: progress,
      bestScore: score,
      lastPlayed: new Date().toISOString(),
      difficulty: difficulty
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
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
              <CardTitle className="text-3xl mb-2">🔮 Pattern Master</CardTitle>
              <CardDescription className="text-lg">
                Discover hidden patterns and predict what comes next!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-left bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pattern Types:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Number sequences (2, 4, 6, ?)</li>
                    <li>• Shape patterns (🔴 🔵 🔴 ?)</li>
                    <li>• Fibonacci sequences (1, 1, 2, 3, ?)</li>
                    <li>• Arithmetic progressions</li>
                    <li>• Mixed patterns with letters and numbers</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose Difficulty:</h3>
                  
                  <div className="grid gap-4">
                    <Button
                      onClick={() => startGame('easy')}
                      className="p-6 h-auto bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">🟢 Easy</div>
                        <div className="text-sm opacity-90">Simple patterns • 8 questions • 4 minutes</div>
                        <Badge className="mt-2 bg-green-600">10 points per question</Badge>
                      </div>
                    </Button>
                    
                    <Button
                      onClick={() => startGame('medium')}
                      className="p-6 h-auto bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">🟡 Medium</div>
                        <div className="text-sm opacity-90">Complex patterns • 10 questions • 3 minutes</div>
                        <Badge className="mt-2 bg-yellow-600">15 points per question</Badge>
                      </div>
                    </Button>
                    
                    <Button
                      onClick={() => startGame('hard')}
                      className="p-6 h-auto bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">🔴 Hard</div>
                        <div className="text-sm opacity-90">Advanced patterns • 12 questions • 2 minutes</div>
                        <Badge className="mt-2 bg-red-600">20 points per question</Badge>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg mb-2">Example Pattern:</div>
                  <div className="text-2xl font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    🔴 🔵 🟡 🔴 🔵 ?
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
    const correctAnswers = Math.floor(score / basePoints);
    const percentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🎉 Pattern Mastery!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered the art of pattern recognition!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-6xl">
                  {percentage >= 90 ? '🏆' : percentage >= 75 ? '🥈' : percentage >= 60 ? '🥉' : '🔮'}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">{score}</div>
                  <div className="text-gray-600">Total Score</div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-gray-500">{Math.round(percentage)}% Accuracy</div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{questions.length}</div>
                    <div className="text-sm text-gray-500">Patterns</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Solved</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold capitalize">{difficulty}</div>
                    <div className="text-sm text-gray-500">Difficulty</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{240 - timeLeft}s</div>
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
              <Badge className="bg-purple-500">
                🔥 {streak} streak
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pattern {currentQuestion + 1} of {questions.length}</CardTitle>
              <Badge className={`${difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {difficulty.toUpperCase()}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-lg font-medium text-purple-600 mb-4">
                {currentQ?.question}
              </div>
              
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
                    ? `🎉 Excellent! +${(difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20) + (streak * 2)} points` 
                    : `❌ Not quite! The answer was ${currentQ.correctAnswer}`
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