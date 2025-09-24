"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Trees, Leaf } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function EcosystemManagerGame() {
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
        question: "What are organisms that make their own food called?",
        options: ["Consumers", "Producers", "Decomposers", "Predators"],
        answer: "Producers",
        explanation: "Producers (like plants) make their own food through photosynthesis",
        category: "Food Chains"
      },
      {
        question: "Which organisms break down dead material in an ecosystem?",
        options: ["Producers", "Primary consumers", "Decomposers", "Predators"],
        answer: "Decomposers",
        explanation: "Decomposers like bacteria and fungi break down dead organisms and recycle nutrients",
        category: "Ecosystem Roles"
      },
      {
        question: "What is a food web?",
        options: ["A single food chain", "Multiple interconnected food chains", "Animals eating plants only", "Plants growing together"],
        answer: "Multiple interconnected food chains",
        explanation: "A food web shows how multiple food chains are connected in an ecosystem",
        category: "Food Webs"
      },
      {
        question: "What happens if a keystone species is removed from an ecosystem?",
        options: ["Nothing changes", "The ecosystem becomes more stable", "The ecosystem may collapse", "Only plants are affected"],
        answer: "The ecosystem may collapse",
        explanation: "Keystone species have a crucial role in maintaining ecosystem balance",
        category: "Keystone Species"
      },
      {
        question: "Which level of the energy pyramid has the most energy?",
        options: ["Primary consumers", "Secondary consumers", "Producers", "Top predators"],
        answer: "Producers",
        explanation: "Producers capture energy from the sun and form the base of the energy pyramid",
        category: "Energy Flow"
      },
      {
        question: "What is biodiversity?",
        options: ["Number of plants only", "Variety of life in an ecosystem", "Number of animals only", "Amount of water"],
        answer: "Variety of life in an ecosystem",
        explanation: "Biodiversity refers to the variety of different species and genetic diversity in an ecosystem",
        category: "Biodiversity"
      },
      {
        question: "What is the carrying capacity of an ecosystem?",
        options: ["Maximum population it can support", "Minimum population needed", "Number of species present", "Amount of rainfall"],
        answer: "Maximum population it can support",
        explanation: "Carrying capacity is the maximum number of individuals an ecosystem can sustain",
        category: "Population Ecology"
      },
      {
        question: "What is symbiosis?",
        options: ["Animals fighting", "Close relationship between species", "Plants competing", "Animals migrating"],
        answer: "Close relationship between species",
        explanation: "Symbiosis is a close, long-term relationship between different species",
        category: "Species Interactions"
      },
      {
        question: "Which factor is NOT abiotic in an ecosystem?",
        options: ["Temperature", "Water", "Soil", "Bacteria"],
        answer: "Bacteria",
        explanation: "Bacteria are living organisms (biotic), while temperature, water, and soil are non-living (abiotic)",
        category: "Ecosystem Components"
      },
      {
        question: "What is the greenhouse effect?",
        options: ["Cooling of Earth", "Warming due to trapped gases", "Plant growth", "Water cycle"],
        answer: "Warming due to trapped gases",
        explanation: "Greenhouse gases trap heat in the atmosphere, warming the planet",
        category: "Climate"
      }
    ];

    // Shuffle and select 8 questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 8));
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
      updateGameProgress('ecosystem-manager', score, currentQuestion, questions.length);
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
      const points = 24 + (streak * 4);
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
      updateGameProgress('ecosystem-manager', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-full">
                  <Trees className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Ecosystem Manager</CardTitle>
              <CardDescription className="text-lg">
                Balance nature and manage ecosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Time to manage</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">8 Questions</h3>
                  <p className="text-sm text-muted-foreground">Ecology challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">190 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                Start Managing Ecosystems
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 24)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">Ecosystem Managed!</CardTitle>
              <CardDescription className="text-lg">
                You've successfully balanced nature
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
                  Manage Again
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
              <Badge className="bg-green-100 text-green-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {24 + (streak * 4)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Trees className="h-16 w-16 text-green-500" />
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
                  {isCorrect ? '🌿 Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Challenge' : 'Complete Management'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}