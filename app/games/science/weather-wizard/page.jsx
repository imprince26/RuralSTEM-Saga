"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Cloud, CloudRain } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function WeatherWizardGame() {
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
        question: "What causes clouds to form?",
        options: ["Water vapor condensing", "Air pressure changes", "Wind movement", "Temperature dropping"],
        answer: "Water vapor condensing",
        explanation: "Clouds form when water vapor in the air condenses around tiny particles",
        category: "Weather Formation"
      },
      {
        question: "What is the water cycle?",
        options: ["Water moving in circles", "Water changing between states", "Rivers flowing to oceans", "Rain falling"],
        answer: "Water changing between states",
        explanation: "The water cycle involves evaporation, condensation, and precipitation",
        category: "Water Cycle"
      },
      {
        question: "What type of weather front brings thunderstorms?",
        options: ["Warm front", "Cold front", "Occluded front", "Stationary front"],
        answer: "Cold front",
        explanation: "Cold fronts often produce severe weather including thunderstorms",
        category: "Weather Fronts"
      },
      {
        question: "What instrument measures air pressure?",
        options: ["Thermometer", "Barometer", "Anemometer", "Hygrometer"],
        answer: "Barometer",
        explanation: "A barometer measures atmospheric pressure, which helps predict weather",
        category: "Weather Instruments"
      },
      {
        question: "What causes wind?",
        options: ["Temperature differences", "Earth's rotation", "Air pressure differences", "All of the above"],
        answer: "All of the above",
        explanation: "Wind is caused by temperature differences, pressure differences, and Earth's rotation",
        category: "Wind Formation"
      },
      {
        question: "What is humidity?",
        options: ["Amount of rain", "Water vapor in air", "Cloud thickness", "Temperature"],
        answer: "Water vapor in air",
        explanation: "Humidity is the amount of water vapor present in the air",
        category: "Atmospheric Conditions"
      },
      {
        question: "What type of cloud produces precipitation?",
        options: ["Cirrus", "Cumulus", "Nimbus", "Stratus"],
        answer: "Nimbus",
        explanation: "Nimbus clouds (or clouds with 'nimbo-' prefix) produce rain or snow",
        category: "Cloud Types"
      },
      {
        question: "What is the greenhouse effect?",
        options: ["Plants growing", "Heat trapped in atmosphere", "Glass house warming", "Solar energy"],
        answer: "Heat trapped in atmosphere",
        explanation: "Greenhouse gases trap heat in Earth's atmosphere, warming the planet",
        category: "Climate"
      }
    ];

    // Shuffle and select all 8 questions
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
      updateGameProgress('weather-wizard', score, currentQuestion, questions.length);
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
      const points = 14 + (streak * 3);
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
      updateGameProgress('weather-wizard', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(360); // 6 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(360);
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
                <div className="bg-gradient-to-r from-blue-500 to-sky-500 text-white p-4 rounded-full">
                  <CloudRain className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Weather Wizard</CardTitle>
              <CardDescription className="text-lg">
                Predict weather patterns and understand climate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">6 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Weather forecast time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">8 Questions</h3>
                  <p className="text-sm text-muted-foreground">Weather challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">110 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-blue-500 to-sky-600 text-white">
                Start Weather Prediction
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 14)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">Weather Predicted!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered weather forecasting
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
                  Forecast Again
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
              <Badge className="bg-blue-100 text-blue-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {14 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <CloudRain className="h-16 w-16 text-blue-500" />
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
                  {isCorrect ? '🌤️ Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Forecast' : 'Complete Prediction'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}