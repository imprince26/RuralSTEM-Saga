"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Building, Map, TreePine, Car, Home } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function CityPlannerGame() {
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
        question: "What should be placed near residential areas for convenience?",
        options: ["Heavy industry", "Schools and parks", "Power plants", "Landfills"],
        answer: "Schools and parks",
        explanation: "Schools and parks should be easily accessible from residential areas for community convenience",
        category: "Residential Planning",
        icon: Home
      },
      {
        question: "Which transportation system is best for reducing traffic congestion?",
        options: ["More roads", "Public transport", "Parking lots", "Highway expansion"],
        answer: "Public transport",
        explanation: "Public transport moves many people efficiently, reducing the number of individual vehicles",
        category: "Transportation",
        icon: Car
      },
      {
        question: "What is the ideal percentage of green space in a city?",
        options: ["5%", "15%", "30%", "50%"],
        answer: "30%",
        explanation: "Cities should aim for about 30% green space for environmental health and quality of life",
        category: "Green Spaces",
        icon: TreePine
      },
      {
        question: "Where should industrial zones be located?",
        options: ["City center", "Near schools", "Downwind from residential areas", "Next to hospitals"],
        answer: "Downwind from residential areas",
        explanation: "Industrial zones should be downwind to prevent pollution from affecting residential areas",
        category: "Industrial Planning",
        icon: Building
      },
      {
        question: "What is mixed-use development?",
        options: ["Only residential buildings", "Only commercial buildings", "Combining different land uses", "Only industrial buildings"],
        answer: "Combining different land uses",
        explanation: "Mixed-use development combines residential, commercial, and office spaces in one area",
        category: "Mixed Development",
        icon: Building
      },
      {
        question: "What helps prevent urban flooding?",
        options: ["More concrete", "Green infrastructure", "Taller buildings", "More parking"],
        answer: "Green infrastructure",
        explanation: "Green infrastructure like rain gardens and permeable surfaces help absorb rainwater",
        category: "Water Management",
        icon: TreePine
      },
      {
        question: "What is the best way to design pedestrian-friendly streets?",
        options: ["Wider roads", "More parking", "Sidewalks and crosswalks", "Faster traffic"],
        answer: "Sidewalks and crosswalks",
        explanation: "Wide sidewalks and safe crosswalks make streets accessible and safe for pedestrians",
        category: "Walkability",
        icon: Map
      },
      {
        question: "How far should bus stops be spaced in residential areas?",
        options: ["100 meters", "400 meters", "1 kilometer", "2 kilometers"],
        answer: "400 meters",
        explanation: "Bus stops should be about 400 meters apart for convenient access without being too frequent",
        category: "Public Transit",
        icon: Car
      },
      {
        question: "What is transit-oriented development?",
        options: ["Building far from transit", "Building near transit stations", "Building only roads", "Building only parking"],
        answer: "Building near transit stations",
        explanation: "Transit-oriented development focuses density around public transit to reduce car dependence",
        category: "Smart Growth",
        icon: Building
      },
      {
        question: "What helps create a sense of community in neighborhoods?",
        options: ["High walls", "Public spaces", "Private garages", "Isolated buildings"],
        answer: "Public spaces",
        explanation: "Public spaces like parks and plazas provide places for neighbors to meet and interact",
        category: "Community Design",
        icon: TreePine
      }
    ];

    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
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
      updateGameProgress('city-planner', score, currentQuestion, questions.length);
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
      const points = 15 + (streak * 3);
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
      updateGameProgress('city-planner', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full">
                  <Building className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">City Planner</CardTitle>
              <CardDescription className="text-lg">
                Design smart, sustainable cities for the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Planning time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Planning challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">150 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Home className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <span className="text-sm font-medium">Residential</span>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Building className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <span className="text-sm font-medium">Commercial</span>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TreePine className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <span className="text-sm font-medium">Green Spaces</span>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Car className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <span className="text-sm font-medium">Transport</span>
                </div>
              </div>
              
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                Start Planning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 15)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">City Planning Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've designed a wonderful city! 🏙️
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{score}</div>
                  <div className="text-muted-foreground">Planning Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground">City Score</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Plan New City
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
  const IconComponent = currentQ?.icon || Building;

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
              <Badge className="bg-blue-100 text-blue-800">
                🏗️ {streak} streak
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
              <Badge className="bg-blue-100 text-blue-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {15 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <IconComponent className="h-16 w-16 text-blue-500" />
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
                  <span className="text-sm">{option}</span>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '🏗️ Excellent Planning!' : '❌ Needs Revision'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Planning Challenge' : 'Complete City'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}