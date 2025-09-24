"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Heart } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function BasicArithmeticGame() {
  const { updateGameProgress } = useGameStore();
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  // Generate random questions based on difficulty
  const generateQuestions = useCallback((diff) => {
    const newQuestions = [];
    const questionCount = 15;
    
    for (let i = 0; i < questionCount; i++) {
      let num1, num2, operation, correctAnswer, questionText;
      
      switch (diff) {
        case 'easy':
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 20) + 1;
          operation = ['+', '-'][Math.floor(Math.random() * 2)];
          break;
        case 'medium':
          num1 = Math.floor(Math.random() * 50) + 10;
          num2 = Math.floor(Math.random() * 50) + 10;
          operation = ['+', '-', '×'][Math.floor(Math.random() * 3)];
          break;
        case 'hard':
          num1 = Math.floor(Math.random() * 100) + 20;
          num2 = Math.floor(Math.random() * 100) + 20;
          operation = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
          break;
      }

      switch (operation) {
        case '+':
          correctAnswer = num1 + num2;
          questionText = `${num1} + ${num2}`;
          break;
        case '-':
          if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
          correctAnswer = num1 - num2;
          questionText = `${num1} - ${num2}`;
          break;
        case '×':
          correctAnswer = num1 * num2;
          questionText = `${num1} × ${num2}`;
          break;
        case '÷':
          correctAnswer = Math.floor(num1 / num2);
          num1 = correctAnswer * num2; // Ensure clean division
          questionText = `${num1} ÷ ${num2}`;
          break;
      }

      // Generate wrong answers
      const wrongAnswers = [];
      for (let j = 0; j < 3; j++) {
        let wrongAnswer;
        do {
          const variation = Math.floor(Math.random() * 20) - 10;
          wrongAnswer = correctAnswer + variation;
        } while (wrongAnswer === correctAnswer || wrongAnswer < 0 || wrongAnswers.includes(wrongAnswer));
        wrongAnswers.push(wrongAnswer);
      }

      const allAnswers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      newQuestions.push({
        question: questionText,
        answers: allAnswers,
        correctAnswer: correctAnswer,
        operation: operation
      });
    }
    setQuestions(newQuestions);
  }, []);

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
    setTimeLeft(selectedDifficulty === 'easy' ? 120 : selectedDifficulty === 'medium' ? 90 : 60);
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
      const points = (difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15) + (streak * 2);
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
    }, 1500);
  };

  const endGame = () => {
    setGameState('completed');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    updateGameProgress('basic-arithmetic', {
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
              <CardTitle className="text-3xl mb-2">🧮 Basic Arithmetic</CardTitle>
              <CardDescription className="text-lg">
                Master fundamental math operations: addition, subtraction, multiplication, and division!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-left bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">How to Play:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Solve arithmetic problems quickly and accurately</li>
                    <li>• Build streaks for bonus points</li>
                    <li>• Choose your difficulty level</li>
                    <li>• Higher difficulty = more points per question</li>
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
                        <div className="text-sm opacity-90">Numbers 1-20 • Addition & Subtraction • 2 minutes</div>
                        <Badge className="mt-2 bg-green-600">5 points per question</Badge>
                      </div>
                    </Button>
                    
                    <Button
                      onClick={() => startGame('medium')}
                      className="p-6 h-auto bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">🟡 Medium</div>
                        <div className="text-sm opacity-90">Numbers 10-60 • +, -, × • 90 seconds</div>
                        <Badge className="mt-2 bg-yellow-600">10 points per question</Badge>
                      </div>
                    </Button>
                    
                    <Button
                      onClick={() => startGame('hard')}
                      className="p-6 h-auto bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">🔴 Hard</div>
                        <div className="text-sm opacity-90">Numbers 20-120 • All operations • 60 seconds</div>
                        <Badge className="mt-2 bg-red-600">15 points per question</Badge>
                      </div>
                    </Button>
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
    const correctAnswers = Math.floor(score / (difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15));
    const percentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🎉 Arithmetic Complete!</CardTitle>
              <CardDescription className="text-lg">
                Excellent work on your math skills!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-6xl">
                  {percentage >= 90 ? '🏆' : percentage >= 75 ? '🥈' : percentage >= 60 ? '🥉' : '🎯'}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600">{score}</div>
                  <div className="text-gray-600">Total Score</div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-gray-500">{Math.round(percentage)}% Accuracy</div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{questions.length}</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Correct</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold capitalize">{difficulty}</div>
                    <div className="text-sm text-gray-500">Difficulty</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{120 - timeLeft}s</div>
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
              {timeLeft}s
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
              <Badge className={`${difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                {difficulty.toUpperCase()}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-5xl font-bold text-green-600 mb-8">
                {currentQ?.question} = ?
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {currentQ?.answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => selectAnswer(answer)}
                    disabled={showResult}
                    className={`p-6 text-2xl h-auto ${
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
                    ? `🎉 Correct! +${(difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15) + (streak * 2)} points` 
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