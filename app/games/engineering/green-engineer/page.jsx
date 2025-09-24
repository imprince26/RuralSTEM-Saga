"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Leaf, TreePine, Recycle, Wind } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function GreenEngineerGame() {
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
        question: "Which renewable energy source uses wind to generate electricity?",
        options: ["Solar panels", "Wind turbines", "Hydroelectric dams", "Coal plants"],
        answer: "Wind turbines",
        explanation: "Wind turbines convert wind energy into electrical energy using rotating blades",
        category: "Wind Energy",
        icon: Wind
      },
      {
        question: "What is the process of converting waste materials into new materials called?",
        options: ["Recycling", "Burning", "Burying", "Storing"],
        answer: "Recycling",
        explanation: "Recycling transforms waste materials into new products to prevent waste",
        category: "Waste Management",
        icon: Recycle
      },
      {
        question: "Which building design helps reduce energy consumption?",
        options: ["Large windows facing north", "Green roofs with plants", "Dark colored walls", "No insulation"],
        answer: "Green roofs with plants",
        explanation: "Green roofs provide insulation and reduce building energy needs",
        category: "Green Building",
        icon: Leaf
      },
      {
        question: "What type of energy comes from the sun?",
        options: ["Nuclear energy", "Solar energy", "Chemical energy", "Thermal energy"],
        answer: "Solar energy",
        explanation: "Solar energy is electromagnetic radiation from the sun that can be converted to electricity",
        category: "Solar Power",
        icon: Star
      },
      {
        question: "Which transportation method produces the least pollution per person?",
        options: ["Private car", "Airplane", "Public bus", "Motorcycle"],
        answer: "Public bus",
        explanation: "Public buses transport many people efficiently, reducing per-person emissions",
        category: "Green Transport",
        icon: Leaf
      },
      {
        question: "What is biomass energy made from?",
        options: ["Wind power", "Ocean waves", "Plant and animal waste", "Nuclear reactions"],
        answer: "Plant and animal waste",
        explanation: "Biomass energy comes from organic materials like wood, crops, and animal waste",
        category: "Biomass Energy",
        icon: TreePine
      },
      {
        question: "Which material is most environmentally friendly for construction?",
        options: ["Plastic", "Steel", "Bamboo", "Glass"],
        answer: "Bamboo",
        explanation: "Bamboo grows quickly, absorbs CO2, and is renewable making it eco-friendly",
        category: "Sustainable Materials",
        icon: TreePine
      },
      {
        question: "What does LED stand for in LED lights?",
        options: ["Low Energy Diode", "Light Emitting Diode", "Long Lasting Device", "Light Energy Display"],
        answer: "Light Emitting Diode",
        explanation: "LED stands for Light Emitting Diode, an energy-efficient lighting technology",
        category: "Energy Efficiency",
        icon: Star
      },
      {
        question: "Which practice helps conserve water in buildings?",
        options: ["Using more water", "Installing leak detectors", "Removing faucets", "Using hot water only"],
        answer: "Installing leak detectors",
        explanation: "Leak detectors help identify and fix water waste quickly",
        category: "Water Conservation",
        icon: Leaf
      },
      {
        question: "What is geothermal energy?",
        options: ["Energy from wind", "Energy from earth's heat", "Energy from water", "Energy from coal"],
        answer: "Energy from earth's heat",
        explanation: "Geothermal energy harnesses heat from inside the Earth for power generation",
        category: "Geothermal Energy",
        icon: Star
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
      updateGameProgress('green-engineer', score, currentQuestion, questions.length);
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
      updateGameProgress('green-engineer', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full">
                  <Leaf className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Green Engineer</CardTitle>
              <CardDescription className="text-lg">
                Learn about sustainable engineering and environmental solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Eco-learning time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Green challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">150 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <span className="text-sm font-medium">Renewable Energy</span>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <Recycle className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
                  <span className="text-sm font-medium">Recycling</span>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TreePine className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <span className="text-sm font-medium">Sustainable Materials</span>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <Leaf className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                  <span className="text-sm font-medium">Green Building</span>
                </div>
              </div>
              
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                Start Green Mission
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
              <CardTitle className="text-3xl mb-2">Mission Complete!</CardTitle>
              <CardDescription className="text-lg">
                You're now a certified Green Engineer! 🌱
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{score}</div>
                  <div className="text-muted-foreground">Eco Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground">Green Score</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Mission
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
  const IconComponent = currentQ?.icon || Leaf;

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
              <Badge className="bg-green-100 text-green-800">
                🌱 {streak} streak
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
                {15 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <IconComponent className="h-16 w-16 text-green-500" />
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
                  {isCorrect ? '🌱 Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Challenge' : 'Complete Mission'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}