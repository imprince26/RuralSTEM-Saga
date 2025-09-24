"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Smartphone, Building } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function AppArchitectGame() {
  const { updateGameProgress } = useGameStore();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateQuestions = useCallback(() => {
    const allQuestions = [
      {
        question: "What is the first step in app development?",
        options: ["Writing code", "Planning and wireframing", "Testing", "Publishing"],
        answer: "Planning and wireframing",
        explanation: "Good apps start with careful planning and wireframing to map out functionality",
        category: "Development Process"
      },
      {
        question: "What is a user interface (UI)?",
        options: ["App code", "What users see and interact with", "Database", "Server"],
        answer: "What users see and interact with",
        explanation: "UI is the visual part of an app that users interact with directly",
        category: "App Design"
      },
      {
        question: "What does API stand for?",
        options: ["App Programming Interface", "Application Programming Interface", "Auto Program Interface", "App Process Interface"],
        answer: "Application Programming Interface",
        explanation: "API allows different software applications to communicate with each other",
        category: "Technical Terms"
      },
      {
        question: "Which is NOT a mobile app platform?",
        options: ["iOS", "Android", "Windows", "Calculator"],
        answer: "Calculator",
        explanation: "Calculator is an app, not a platform. iOS, Android, and Windows are platforms",
        category: "Platforms"
      },
      {
        question: "What is debugging in app development?",
        options: ["Adding bugs", "Finding and fixing errors", "Designing interfaces", "Publishing apps"],
        answer: "Finding and fixing errors",
        explanation: "Debugging is the process of identifying and fixing bugs (errors) in code",
        category: "Development Process"
      },
      {
        question: "What makes an app user-friendly?",
        options: ["Complex features", "Simple, intuitive design", "Many advertisements", "Lots of text"],
        answer: "Simple, intuitive design",
        explanation: "User-friendly apps have simple, intuitive designs that are easy to navigate",
        category: "User Experience"
      },
      {
        question: "What is a prototype in app development?",
        options: ["Final app", "Early working model", "App store", "Error message"],
        answer: "Early working model",
        explanation: "A prototype is an early model used to test concepts before full development",
        category: "Development Process"
      },
      {
        question: "Which programming language is commonly used for iOS apps?",
        options: ["Swift", "Python", "HTML", "Java"],
        answer: "Swift",
        explanation: "Swift is Apple's programming language specifically designed for iOS development",
        category: "Programming Languages"
      }
    ];

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      updateGameProgress('app-architect', score, currentQuestion, questions.length);
    }
    return () => clearTimeout(timer);
  }, [gameStarted, gameOver, timeLeft, score, currentQuestion, questions.length, updateGameProgress]);

  const handleAnswerSubmit = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = 12 + (streak * 3);
      setScore(score + points);
      setStreak(streak + 1);
      celebrateCorrectAnswer();
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setGameOver(true);
      updateGameProgress('app-architect', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(480); // 8 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(480);
    setGameStarted(false);
    setGameOver(false);
    setSelectedAnswer('');
    setShowResult(false);
    generateQuestions();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/games">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full">
                  <Smartphone className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">App Architect</CardTitle>
              <CardDescription className="text-lg">
                Learn mobile app development concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Development time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">8 Questions</h3>
                  <p className="text-sm text-muted-foreground">App dev challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">100 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 12)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">App Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've learned the basics of app development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{score}</div>
                  <div className="text-muted-foreground">Final Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground">Architect Knowledge</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rebuild
                </Button>
                <Link href="/games">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Games
                  </Button>
                </Link>
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
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Question {currentQuestion + 1}/{questions.length}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline">
              <Star className="h-4 w-4 mr-1" />
              {score} points
            </Badge>
            {streak > 0 && (
              <Badge className="bg-orange-100 text-orange-800">
                🔥 {streak} streak
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-purple-100 text-purple-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {12 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-full">
                <Building className="h-16 w-16 text-purple-600" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-6 text-center">
              {currentQ?.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQ?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? (isCorrect ? "default" : "destructive") : "outline"}
                  className={`h-16 text-left justify-start ${
                    showResult && option === currentQ.answer 
                      ? 'bg-green-100 border-green-500 text-green-800' 
                      : ''
                  }`}
                  onClick={() => handleAnswerSubmit(option)}
                  disabled={showResult}
                >
                  <span className="text-lg">{option}</span>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '📱 Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Feature' : 'Launch App'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}