"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Bot, Cpu, Zap, Settings, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function RobotBuilderGame() {
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
        question: "What component allows a robot to move around?",
        options: ["Battery", "Motors", "Camera", "Speaker"],
        answer: "Motors",
        explanation: "Motors convert electrical energy into mechanical motion, allowing robots to move",
        category: "Movement",
        icon: Zap
      },
      {
        question: "What does a robot's sensor do?",
        options: ["Provides power", "Processes information", "Collects data from environment", "Stores programs"],
        answer: "Collects data from environment",
        explanation: "Sensors gather information about the robot's surroundings like light, sound, or distance",
        category: "Sensors",
        icon: Settings
      },
      {
        question: "What is the 'brain' of a robot called?",
        options: ["Battery", "Motor", "Microcontroller", "Wheel"],
        answer: "Microcontroller",
        explanation: "The microcontroller processes information and controls all robot functions",
        category: "Control",
        icon: Cpu
      },
      {
        question: "Which sensor helps a robot avoid obstacles?",
        options: ["Light sensor", "Ultrasonic sensor", "Temperature sensor", "Sound sensor"],
        answer: "Ultrasonic sensor",
        explanation: "Ultrasonic sensors measure distance using sound waves to detect obstacles",
        category: "Navigation",
        icon: Settings
      },
      {
        question: "What programming concept makes a robot repeat actions?",
        options: ["Variables", "Loops", "Functions", "Arrays"],
        answer: "Loops",
        explanation: "Loops allow robots to repeat the same set of instructions multiple times",
        category: "Programming",
        icon: Bot
      },
      {
        question: "What type of robot is used to explore space?",
        options: ["Humanoid robot", "Industrial robot", "Rover", "Pet robot"],
        answer: "Rover",
        explanation: "Space rovers like Mars rovers are designed to explore planetary surfaces",
        category: "Applications",
        icon: Bot
      },
      {
        question: "What allows a robot to pick up objects?",
        options: ["Wheels", "Gripper", "Antenna", "LED lights"],
        answer: "Gripper",
        explanation: "Grippers are robotic hands that can grasp and manipulate objects",
        category: "Manipulation",
        icon: Wrench
      },
      {
        question: "What does AI stand for in robotics?",
        options: ["Automatic Intelligence", "Artificial Intelligence", "Advanced Integration", "Automatic Integration"],
        answer: "Artificial Intelligence",
        explanation: "AI enables robots to make decisions and learn from their environment",
        category: "Intelligence",
        icon: Cpu
      },
      {
        question: "Which robot is commonly used in manufacturing?",
        options: ["Pet robot", "Industrial arm", "Humanoid robot", "Cleaning robot"],
        answer: "Industrial arm",
        explanation: "Industrial robotic arms perform precise manufacturing tasks in factories",
        category: "Industry",
        icon: Wrench
      },
      {
        question: "What powers most small robots?",
        options: ["Solar panels", "Batteries", "Wall outlet", "Wind power"],
        answer: "Batteries",
        explanation: "Batteries provide portable electrical power for most mobile robots",
        category: "Power",
        icon: Zap
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
      updateGameProgress('robot-builder', score, currentQuestion, questions.length);
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
      updateGameProgress('robot-builder', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-full">
                  <Bot className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Robot Builder</CardTitle>
              <CardDescription className="text-lg">
                Learn robotics fundamentals and build amazing robots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Build time</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Robot challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                  <h3 className="font-semibold">150 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-cyan-500" />
                  <span className="text-sm font-medium">Motors & Power</span>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Settings className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <span className="text-sm font-medium">Sensors</span>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Cpu className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                  <span className="text-sm font-medium">Control Systems</span>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Wrench className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <span className="text-sm font-medium">Mechanical Parts</span>
                </div>
              </div>
              
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                Start Building
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
              <CardTitle className="text-3xl mb-2">Robot Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered robot building! 🤖
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{score}</div>
                  <div className="text-muted-foreground">Build Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
                  <div className="text-muted-foreground">Builder Score</div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Build New Robot
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
  const IconComponent = currentQ?.icon || Bot;

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
              <Badge className="bg-cyan-100 text-cyan-800">
                🤖 {streak} streak
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
              <Badge className="bg-cyan-100 text-cyan-800">
                {currentQ?.category}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {15 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <IconComponent className="h-16 w-16 text-cyan-500" />
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
                  {isCorrect ? '🤖 Perfect Build!' : '❌ Component Error'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Component' : 'Complete Robot'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}