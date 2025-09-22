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
  RefreshCw,
  Calculator
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import confetti from 'canvas-confetti';

export default function AlgebraAdventure() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateGameProgress, addPoints } = useGameStore();

  // Game State
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed, paused
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Generate algebra questions
  const generateQuestions = useCallback(() => {
    const questionsArray = [];
    const questionCount = 12;

    for (let i = 0; i < questionCount; i++) {
      let question, answer, options;

      const questionType = Math.floor(Math.random() * 3);

      switch (questionType) {
        case 0: // Linear equations: x + a = b
          const a = Math.floor(Math.random() * 20) + 1;
          const x = Math.floor(Math.random() * 15) + 1;
          const b = x + a;
          question = `Solve for x: x + ${a} = ${b}`;
          answer = x;
          break;

        case 1: // Linear equations: ax = b
          const coefficient = Math.floor(Math.random() * 8) + 2;
          const result = Math.floor(Math.random() * 20) + 1;
          const product = coefficient * result;
          question = `Solve for x: ${coefficient}x = ${product}`;
          answer = result;
          break;

        case 2: // Simple quadratic: x² = a
          const square = Math.floor(Math.random() * 8) + 1;
          const squared = square * square;
          question = `Solve for x: x² = ${squared}`;
          answer = square;
          break;

        default:
          question = "Error generating question";
          answer = 0;
      }

      // Generate wrong options
      const wrongOptions = [];
      while (wrongOptions.length < 3) {
        let wrongAnswer;
        if (questionType === 2) {
          wrongAnswer = Math.floor(Math.random() * 10) + 1;
        } else {
          wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
        }
        
        if (wrongAnswer !== answer && wrongAnswer > 0 && !wrongOptions.includes(wrongAnswer)) {
          wrongOptions.push(wrongAnswer);
        }
      }

      options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);

      questionsArray.push({
        id: i,
        question,
        options,
        correctAnswer: answer,
        difficulty: i < 4 ? 'easy' : i < 8 ? 'medium' : 'hard'
      });
    }

    return questionsArray;
  }, []);

  // Initialize game
  const startGame = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(600);
    setStreak(0);
    setLives(3);
    setSelectedAnswer(null);
    setShowResult(false);
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
  const handleAnswerSelect = (selectedOption) => {
    if (showResult) return;

    setSelectedAnswer(selectedOption);
    setShowResult(true);

    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      // Trigger celebration
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.8 }
      });
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1 && lives > (isCorrect ? 0 : 1)) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        finishGame();
      }
    }, 1500);
  };

  // Finish game
  const finishGame = () => {
    setGameState('completed');
    
    // Update game progress
    const progress = (currentQuestion + 1) / questions.length * 100;
    const gameData = {
      gameId: 'algebra-adventure',
      progress: Math.min(progress, 100),
      bestScore: score,
      completed: progress >= 100 && lives > 0,
      lastPlayed: new Date().toISOString()
    };
    
    updateGameProgress(gameData);
    addPoints(score);

    // Celebration if completed successfully
    if (progress >= 100 && lives > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => router.push('/games')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Lives:</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < lives ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Game Menu */}
        {gameState === 'menu' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <Calculator className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h1 className="text-4xl font-bold mb-4">Algebra Adventure</h1>
              <p className="text-xl text-muted-foreground">
                Solve algebraic equations to unlock mathematical treasures!
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Game Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Solve 12 algebraic equations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Complete within 10 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Earn bonus points for consecutive correct answers</span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span>You have 3 lives - lose one for each wrong answer</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="px-8">
              Start Adventure
            </Button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && currentQ && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Badge className={
                  currentQ.difficulty === 'easy' ? 'bg-green-500' :
                  currentQ.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                }>
                  {currentQ.difficulty}
                </Badge>
              </div>
              <Progress 
                value={((currentQuestion + 1) / questions.length) * 100} 
                className="h-2"
              />
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        !showResult ? 'outline' :
                        option === currentQ.correctAnswer ? 'default' :
                        option === selectedAnswer ? 'destructive' : 'outline'
                      }
                      className={`p-6 text-xl ${
                        !showResult ? 'hover:bg-primary hover:text-primary-foreground' : ''
                      } ${
                        showResult && option === currentQ.correctAnswer 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : ''
                      } ${
                        showResult && option === selectedAnswer && option !== currentQ.correctAnswer
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : ''
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                    >
                      <span className="text-2xl font-bold">x = {option}</span>
                    </Button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-6 text-center">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <div className="text-green-600">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-lg font-semibold">Correct! +{10 + (streak * 2)} points</p>
                        {streak > 1 && (
                          <p className="text-sm">🔥 {streak} in a row!</p>
                        )}
                      </div>
                    ) : (
                      <div className="text-red-600">
                        <XCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-lg font-semibold">
                          Incorrect! The answer was x = {currentQ.correctAnswer}
                        </p>
                        <p className="text-sm">Lives remaining: {lives - 1}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Completed */}
        {gameState === 'completed' && (
          <div className="text-center max-w-2xl mx-auto">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-4">Adventure Complete!</h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{score}</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{streak}</div>
                    <div className="text-sm text-muted-foreground">Best Streak</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">
                      {formatTime(600 - timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setGameState('menu')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button variant="outline" onClick={() => router.push('/games')}>
                Back to Games
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}