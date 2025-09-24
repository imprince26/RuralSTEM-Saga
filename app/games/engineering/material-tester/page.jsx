"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, TestTube, HardHat, Zap, Shield, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function MaterialTesterGame() {
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
        question: "Which material is strongest in tension?",
        options: ["Wood", "Steel", "Glass", "Plastic"],
        answer: "Steel",
        explanation: "Steel has excellent tensile strength, meaning it resists being pulled apart",
        category: "Tensile Strength",
        icon: Shield
      },
      {
        question: "What test measures how much a material can bend before breaking?",
        options: ["Hardness test", "Flexibility test", "Impact test", "Density test"],
        answer: "Flexibility test",
        explanation: "Flexibility tests determine how much a material can bend without permanent damage",
        category: "Flexibility Testing",
        icon: TestTube
      },
      {
        question: "Which material property describes resistance to scratching?",
        options: ["Ductility", "Hardness", "Elasticity", "Conductivity"],
        answer: "Hardness",
        explanation: "Hardness measures a material's resistance to surface deformation and scratching",
        category: "Hardness",
        icon: HardHat
      },
      {
        question: "What happens to most metals when heated?",
        options: ["They shrink", "They expand", "They become harder", "They change color only"],
        answer: "They expand",
        explanation: "Most metals expand when heated due to increased molecular motion",
        category: "Thermal Properties",
        icon: Zap
      },
      {
        question: "Which test determines if a material conducts electricity?",
        options: ["Flexibility test", "Hardness test", "Conductivity test", "Density test"],
        answer: "Conductivity test",
        explanation: "Conductivity tests measure how well a material allows electric current to flow through it",
        category: "Electrical Properties",
        icon: Zap
      },
      {
        question: "What is the ability of a material to return to its original shape called?",
        options: ["Plasticity", "Elasticity", "Ductility", "Brittleness"],
        answer: "Elasticity",
        explanation: "Elasticity is the property that allows materials to return to their original shape after deformation",
        category: "Elastic Properties",
        icon: FlaskConical
      },
      {
        question: "Which material is most likely to shatter when hit?",
        options: ["Rubber", "Steel", "Glass", "Wood"],
        answer: "Glass",
        explanation: "Glass is brittle and tends to break suddenly without much deformation",
        category: "Brittleness",
        icon: Shield
      },
      {
        question: "What does a density test measure?",
        options: ["How heavy something feels", "Mass per unit volume", "Strength of material", "Color intensity"],
        answer: "Mass per unit volume",
        explanation: "Density is mass divided by volume, telling us how much matter is packed into a space",
        category: "Density Testing",
        icon: TestTube
      },
      {
        question: "Which property allows metals to be hammered into thin sheets?",
        options: ["Brittleness", "Malleability", "Conductivity", "Magnetism"],
        answer: "Malleability",
        explanation: "Malleability allows materials to be shaped by hammering or rolling without breaking",
        category: "Malleability",
        icon: HardHat
      },
      {
        question: "What safety equipment is most important when testing materials?",
        options: ["Comfortable shoes", "Safety goggles", "Warm clothing", "Gloves only"],
        answer: "Safety goggles",
        explanation: "Safety goggles protect eyes from flying debris and chemical splashes during testing",
        category: "Safety",
        icon: Shield
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
      updateGameProgress('material-tester', score, currentQuestion, questions.length);
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
      updateGameProgress('material-tester', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full">
                  <TestTube className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Material Tester</CardTitle>
              <CardDescription className="text-lg">
                Discover the properties and strength of different materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Testing time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Material tests</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold">150 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <span className="text-sm font-medium">Strength Tests</span>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <HardHat className="h-6 w-6 mx-auto mb-2 text-red-500" />
                  <span className="text-sm font-medium">Hardness</span>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                  <span className="text-sm font-medium">Conductivity</span>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FlaskConical className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <span className="text-sm font-medium">Elasticity</span>
                </div>
              </div>
              
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                Start Testing
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
              <CardTitle className="text-3xl mb-2">Testing Complete!</CardTitle>
              <CardDescription className="text-lg">
                You're now a certified Material Tester! 🔬
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{score}</div>
                  <div className="text-muted-foreground">Test Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground">Testing Accuracy</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Test New Materials
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
  const IconComponent = currentQ?.icon || TestTube;

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
                🔬 {streak} streak
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
              <Badge className="bg-orange-100 text-orange-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {15 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <IconComponent className="h-16 w-16 text-orange-500" />
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
                  {isCorrect ? '🔬 Test Successful!' : '❌ Test Failed'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Material' : 'Complete Testing'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}