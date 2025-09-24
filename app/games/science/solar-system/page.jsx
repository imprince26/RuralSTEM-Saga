"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function SolarSystemGame() {
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
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        explanation: "Mars appears red due to iron oxide (rust) on its surface",
        category: "Planets"
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
        answer: "Jupiter",
        explanation: "Jupiter is more than twice as massive as all other planets combined",
        category: "Planets"
      },
      {
        question: "How many moons does Earth have?",
        options: ["0", "1", "2", "3"],
        answer: "1",
        explanation: "Earth has one natural satellite - the Moon",
        category: "Earth & Moon"
      },
      {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        answer: "Mercury",
        explanation: "Mercury orbits closest to the Sun at about 36 million miles away",
        category: "Planets"
      },
      {
        question: "What is the hottest planet in our solar system?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        answer: "Venus",
        explanation: "Venus has a thick atmosphere that traps heat, making it hotter than Mercury",
        category: "Planets"
      },
      {
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
        answer: "Saturn",
        explanation: "Saturn has over 80 confirmed moons, more than any other planet",
        category: "Moons"
      },
      {
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Whirlpool", "Pinwheel"],
        answer: "Milky Way",
        explanation: "We live in the Milky Way galaxy, which contains billions of stars",
        category: "Galaxy"
      },
      {
        question: "How long does it take Earth to orbit the Sun?",
        options: ["365 days", "24 hours", "30 days", "7 days"],
        answer: "365 days",
        explanation: "Earth takes approximately 365.25 days to complete one orbit around the Sun",
        category: "Earth & Moon"
      },
      {
        question: "Which planet is famous for its prominent ring system?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: "Saturn",
        explanation: "Saturn has the most visible and extensive ring system of any planet",
        category: "Planets"
      },
      {
        question: "What causes the phases of the Moon?",
        options: ["Earth's shadow", "Moon's rotation", "Sun's position", "Clouds"],
        answer: "Sun's position",
        explanation: "Moon phases are caused by the changing positions of the Moon, Earth, and Sun",
        category: "Earth & Moon"
      },
      {
        question: "Which is the smallest planet in our solar system?",
        options: ["Mars", "Venus", "Mercury", "Pluto"],
        answer: "Mercury",
        explanation: "Mercury is the smallest planet, smaller even than some moons",
        category: "Planets"
      },
      {
        question: "What is a comet made of?",
        options: ["Rock only", "Ice and dust", "Metal", "Gas"],
        answer: "Ice and dust",
        explanation: "Comets are 'dirty snowballs' made of frozen water, dust, and rocky material",
        category: "Space Objects"
      }
    ];

    // Shuffle and select 10 questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
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
      updateGameProgress('solar-system', score, currentQuestion, questions.length);
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
      const points = 18 + (streak * 4);
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
      updateGameProgress('solar-system', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(450); // 7.5 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(450);
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
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full">
                  <Globe className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Solar System Adventure</CardTitle>
              <CardDescription className="text-lg">
                Explore planets, moons, and space phenomena in our cosmic neighborhood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">7.5 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Time to explore</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Space challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">180 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                Launch Space Mission
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 18)) * 100);
    
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
                You've successfully explored our solar system
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
                {18 + (streak * 4)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              {currentQ?.category === 'Planets' && <Globe className="h-16 w-16 text-blue-500" />}
              {currentQ?.category === 'Earth & Moon' && <Globe className="h-16 w-16 text-green-500" />}
              {currentQ?.category === 'Galaxy' && <Star className="h-16 w-16 text-yellow-500" />}
              {currentQ?.category === 'Space Objects' && <Zap className="h-16 w-16 text-purple-500" />}
              {currentQ?.category === 'Moons' && <Globe className="h-16 w-16 text-gray-500" />}
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
                  {isCorrect ? '🚀 Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Planet' : 'Complete Mission'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}