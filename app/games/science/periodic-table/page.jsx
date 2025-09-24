"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Beaker, Zap } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function PeriodicTableGame() {
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
        question: "What is the symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: "Au",
        explanation: "Gold's symbol Au comes from its Latin name 'aurum'",
        category: "Element Symbols"
      },
      {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        answer: "Hydrogen",
        explanation: "Hydrogen is the first element with 1 proton",
        category: "Atomic Numbers"
      },
      {
        question: "What is the most abundant element in the universe?",
        options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
        answer: "Hydrogen",
        explanation: "Hydrogen makes up about 75% of the universe's mass",
        category: "Element Abundance"
      },
      {
        question: "Which group contains the noble gases?",
        options: ["Group 1", "Group 7", "Group 8", "Group 18"],
        answer: "Group 18",
        explanation: "Group 18 (formerly Group 8) contains the noble gases like helium and neon",
        category: "Periodic Groups"
      },
      {
        question: "What is the symbol for Iron?",
        options: ["Ir", "Fe", "In", "I"],
        answer: "Fe",
        explanation: "Iron's symbol Fe comes from its Latin name 'ferrum'",
        category: "Element Symbols"
      },
      {
        question: "Which element is a liquid at room temperature?",
        options: ["Bromine", "Mercury", "Both A and B", "Gallium"],
        answer: "Both A and B",
        explanation: "Both bromine and mercury are liquids at room temperature",
        category: "Physical Properties"
      },
      {
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        answer: "6",
        explanation: "Carbon has 6 protons, giving it atomic number 6",
        category: "Atomic Numbers"
      },
      {
        question: "Which period contains the most elements?",
        options: ["Period 4", "Period 5", "Period 6", "Period 7"],
        answer: "Period 6",
        explanation: "Period 6 contains 32 elements, the most of any period",
        category: "Periodic Trends"
      },
      {
        question: "What is the symbol for Silver?",
        options: ["Si", "Ag", "S", "Au"],
        answer: "Ag",
        explanation: "Silver's symbol Ag comes from its Latin name 'argentum'",
        category: "Element Symbols"
      },
      {
        question: "Which element has the highest atomic number that occurs naturally?",
        options: ["Plutonium", "Uranium", "Thorium", "Radium"],
        answer: "Uranium",
        explanation: "Uranium (atomic number 92) is the heaviest naturally occurring element",
        category: "Natural Elements"
      }
    ];

    // Shuffle and select all 10 questions
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
      updateGameProgress('periodic-table', score, currentQuestion, questions.length);
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
      const points = 25 + (streak * 5);
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
      updateGameProgress('periodic-table', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(600); // 10 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(600);
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
                  <Beaker className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Periodic Table Quest</CardTitle>
              <CardDescription className="text-lg">
                Master elements and chemical properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">10 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Quest duration</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Element challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">250 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                Start Element Quest
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 25)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">Quest Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered the periodic table
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
                  <div className="text-muted-foreground">Accuracy</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Quest
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
                {25 + (streak * 5)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Beaker className="h-16 w-16 text-purple-500" />
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
                  {isCorrect ? '⚗️ Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Element' : 'Complete Quest'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}