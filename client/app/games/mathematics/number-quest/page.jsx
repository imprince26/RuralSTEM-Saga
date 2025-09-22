"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Trophy, 
  Star, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import confetti from 'canvas-confetti';

export default function NumberQuestGame() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateGameProgress, addPoints } = useGameStore();

  // Game State
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed, paused
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);

  // Generate questions based on level
  const generateQuestions = useCallback((level) => {
    const questionsArray = [];
    const questionCount = 10;

    for (let i = 0; i < questionCount; i++) {
      let question, answer, options;

      switch (level) {
        case 1: // Basic arithmetic
          const num1 = Math.floor(Math.random() * 20) + 1;
          const num2 = Math.floor(Math.random() * 20) + 1;
          const operation = ['+', '-', '×'][Math.floor(Math.random() * 3)];
          
          if (operation === '+') {
            question = `${num1} + ${num2} = ?`;
            answer = num1 + num2;
          } else if (operation === '-') {
            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);
            question = `${larger} - ${smaller} = ?`;
            answer = larger - smaller;
          } else {
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 1;
            question = `${n1} × ${n2} = ?`;
            answer = n1 * n2;
          }
          break;

        case 2: // Fractions and decimals
          const numerator = Math.floor(Math.random() * 9) + 1;
          const denominator = Math.floor(Math.random() * 9) + 2;
          question = `What is ${numerator}/${denominator} as a decimal?`;
          answer = (numerator / denominator).toFixed(2);
          break;

        default:
          // Default to level 1
          const n1 = Math.floor(Math.random() * 10) + 1;
          const n2 = Math.floor(Math.random() * 10) + 1;
          question = `${n1} + ${n2} = ?`;
          answer = n1 + n2;
      }

      // Generate wrong options
      const wrongOptions = new Set();
      while (wrongOptions.size < 3) {
        const variation = Math.floor(Math.random() * 10) - 5;
        const wrongAnswer = answer + variation;
        if (wrongAnswer !== answer && wrongAnswer > 0) {
          wrongOptions.add(wrongAnswer);
        }
      }

      options = [answer, ...Array.from(wrongOptions)].sort(() => Math.random() - 0.5);

      questionsArray.push({
        question,
        answer,
        options,
        explanation: `The correct answer is ${answer}.`,
        difficulty: level
      });
    }

    return questionsArray;
  }, []);

  // Initialize game
  const startGame = () => {
    const newQuestions = generateQuestions(gameLevel);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300);
    setStreak(0);
    setLives(3);
    setGameState('playing');
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setShowResult(true);

    const currentQ = questions[currentQuestion];
    const isCorrect = option === currentQ.answer;

    if (isCorrect) {
      const points = 10 + streak * 2; // Bonus for streak
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      // Celebration effect
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 }
      });
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      
      if (lives <= 1) {
        setGameState('completed');
        return;
      }
    }

    // Move to next question after delay
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setGameState('completed');
        // Save game progress
        updateGameProgress('number-quest', {
          completed: true,
          progress: 100,
          bestScore: score,
          level: gameLevel
        });
        addPoints(score);
      }
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion] || {};
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Number Quest</CardTitle>
              <CardDescription>
                Master arithmetic through adventure! Answer questions correctly to score points and maintain your streak.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <p className="font-medium">10 Questions</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="font-medium">5 Minutes</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Star className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="font-medium">3 Lives</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level:</label>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant={gameLevel === 1 ? "default" : "outline"}
                    onClick={() => setGameLevel(1)}
                  >
                    Easy
                  </Button>
                  <Button 
                    variant={gameLevel === 2 ? "default" : "outline"}
                    onClick={() => setGameLevel(2)}
                  >
                    Medium
                  </Button>
                </div>
              </div>

              <Button size="lg" onClick={startGame} className="w-full">
                Start Quest
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const finalScore = score;
    const accuracy = questions.length > 0 ? Math.round((score / (questions.length * 10)) * 100) : 0;

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">Quest Complete!</CardTitle>
              <CardDescription>
                Great job! Here are your results:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <p className="text-2xl font-bold">{finalScore}</p>
                  <p className="text-sm text-muted-foreground">Final Score</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Star className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={startGame} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="w-full">
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => setGameState('menu')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Menu
          </Button>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline">
              <Star className="h-3 w-3 mr-1" />
              {score}
            </Badge>
            <Badge variant="outline">
              ♥️ {lives}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Streak: {streak}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showResult
                      ? option === currentQ.answer
                        ? "default"
                        : option === selectedAnswer
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  size="lg"
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className="h-16 text-lg"
                >
                  {showResult && option === currentQ.answer && (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  )}
                  {showResult && option === selectedAnswer && option !== currentQ.answer && (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  {option}
                </Button>
              ))}
            </div>
            
            {showResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-center">{currentQ.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}