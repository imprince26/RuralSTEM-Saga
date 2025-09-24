"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function ProbabilityCasinoGame() {
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

  const questionTypes = [
    'coin_flip',
    'dice_roll', 
    'card_draw',
    'spinner',
    'combinations'
  ];

  const generateQuestions = useCallback(() => {
    const newQuestions = [];
    const questionCount = 10;

    for (let i = 0; i < questionCount; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      switch (type) {
        case 'coin_flip':
          newQuestions.push(generateCoinFlipQuestion());
          break;
        case 'dice_roll':
          newQuestions.push(generateDiceRollQuestion());
          break;
        case 'card_draw':
          newQuestions.push(generateCardDrawQuestion());
          break;
        case 'spinner':
          newQuestions.push(generateSpinnerQuestion());
          break;
        case 'combinations':
          newQuestions.push(generateCombinationQuestion());
          break;
        default:
          newQuestions.push(generateCoinFlipQuestion());
      }
    }

    setQuestions(newQuestions);
  }, []);

  const generateCoinFlipQuestion = () => {
    const scenarios = [
      {
        question: "What is the probability of getting heads when flipping a fair coin?",
        answer: "1/2",
        options: ["1/4", "1/3", "1/2", "2/3"],
        explanation: "A fair coin has 2 equally likely outcomes, so P(heads) = 1/2"
      },
      {
        question: "If you flip a coin 3 times, what's the probability of getting at least one head?",
        answer: "7/8",
        options: ["1/2", "3/4", "7/8", "1/8"],
        explanation: "P(at least one head) = 1 - P(all tails) = 1 - (1/2)³ = 7/8"
      },
      {
        question: "What's the probability of getting exactly 2 heads in 3 coin flips?",
        answer: "3/8",
        options: ["1/8", "2/8", "3/8", "4/8"],
        explanation: "There are 3 ways to get exactly 2 heads out of 8 total outcomes"
      }
    ];
    
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return {
      type: 'coin_flip',
      question: scenario.question,
      answer: scenario.answer,
      options: scenario.options,
      explanation: scenario.explanation,
      visual: { type: 'coin' }
    };
  };

  const generateDiceRollQuestion = () => {
    const diceQuestions = [
      {
        question: "What's the probability of rolling a 6 on a fair six-sided die?",
        answer: "1/6",
        options: ["1/4", "1/5", "1/6", "1/8"],
        explanation: "There's 1 favorable outcome out of 6 possible outcomes"
      },
      {
        question: "What's the probability of rolling an even number on a die?",
        answer: "1/2",
        options: ["1/3", "1/2", "2/3", "3/4"],
        explanation: "Even numbers are 2, 4, 6. That's 3 out of 6 outcomes = 1/2"
      },
      {
        question: "What's the probability of rolling a number greater than 4?",
        answer: "1/3",
        options: ["1/6", "1/3", "1/2", "2/3"],
        explanation: "Numbers greater than 4 are 5 and 6. That's 2 out of 6 = 1/3"
      }
    ];
    
    const question = diceQuestions[Math.floor(Math.random() * diceQuestions.length)];
    return {
      type: 'dice_roll',
      ...question,
      visual: { type: 'dice', value: Math.floor(Math.random() * 6) + 1 }
    };
  };

  const generateCardDrawQuestion = () => {
    const cardQuestions = [
      {
        question: "What's the probability of drawing a heart from a standard deck?",
        answer: "1/4",
        options: ["1/13", "1/4", "1/3", "1/2"],
        explanation: "There are 13 hearts in a 52-card deck. 13/52 = 1/4"
      },
      {
        question: "What's the probability of drawing an ace from a standard deck?",
        answer: "1/13",
        options: ["1/52", "1/13", "1/4", "4/52"],
        explanation: "There are 4 aces in a 52-card deck. 4/52 = 1/13"
      },
      {
        question: "What's the probability of drawing a face card (J, Q, K)?",
        answer: "3/13",
        options: ["1/13", "3/13", "1/4", "12/52"],
        explanation: "There are 12 face cards (3 per suit × 4 suits). 12/52 = 3/13"
      }
    ];
    
    const question = cardQuestions[Math.floor(Math.random() * cardQuestions.length)];
    return {
      type: 'card_draw',
      ...question,
      visual: { type: 'cards' }
    };
  };

  const generateSpinnerQuestion = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const sections = Math.floor(Math.random() * 3) + 4; // 4-6 sections
    const targetColor = colors[Math.floor(Math.random() * Math.min(colors.length, sections))];
    const targetSections = Math.floor(Math.random() * 2) + 1; // 1-2 sections of target color
    
    return {
      type: 'spinner',
      question: `A spinner has ${sections} equal sections. ${targetSections} section${targetSections > 1 ? 's are' : ' is'} ${targetColor}. What's the probability of landing on ${targetColor}?`,
      answer: `${targetSections}/${sections}`,
      options: [`1/${sections}`, `${targetSections}/${sections}`, `${targetSections + 1}/${sections}`, `${sections - targetSections}/${sections}`],
      explanation: `P(${targetColor}) = favorable outcomes / total outcomes = ${targetSections}/${sections}`,
      visual: { type: 'spinner', sections, targetColor, targetSections }
    };
  };

  const generateCombinationQuestion = () => {
    const combQuestions = [
      {
        question: "How many ways can you arrange 3 different books on a shelf?",
        answer: "6",
        options: ["3", "6", "9", "12"],
        explanation: "3! = 3 × 2 × 1 = 6 ways"
      },
      {
        question: "How many ways can you choose 2 items from 4 items?",
        answer: "6",
        options: ["4", "6", "8", "12"],
        explanation: "C(4,2) = 4!/(2!×2!) = 6 ways"
      },
      {
        question: "If you have 5 shirts and 3 pants, how many outfits can you make?",
        answer: "15",
        options: ["8", "12", "15", "18"],
        explanation: "5 × 3 = 15 different combinations"
      }
    ];
    
    const question = combQuestions[Math.floor(Math.random() * combQuestions.length)];
    return {
      type: 'combinations',
      ...question,
      visual: { type: 'combination' }
    };
  };

  const renderDice = (value) => {
    const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][value - 1];
    return <DiceIcon className="h-16 w-16 text-blue-500" />;
  };

  const renderVisual = (visual) => {
    switch (visual.type) {
      case 'coin':
        return (
          <div className="flex justify-center my-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center">
              <span className="text-lg font-bold">₹</span>
            </div>
          </div>
        );
      case 'dice':
        return (
          <div className="flex justify-center my-4">
            {renderDice(visual.value)}
          </div>
        );
      case 'cards':
        return (
          <div className="flex justify-center my-4 space-x-2">
            {['♠', '♥', '♣', '♦'].map((suit, i) => (
              <div key={i} className={`w-12 h-16 rounded border-2 flex items-center justify-center text-xl ${suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black'}`}>
                {suit}
              </div>
            ))}
          </div>
        );
      case 'spinner':
        return (
          <div className="flex justify-center my-4">
            <div className="w-24 h-24 rounded-full border-4 border-gray-300 relative bg-gradient-conic from-red-400 via-blue-400 to-yellow-400">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-black"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      updateGameProgress('probability-casino', score, currentQuestion, questions.length);
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
      const points = 10 + (streak * 2);
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
      updateGameProgress('probability-casino', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(300); // 5 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(300);
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
                  <Dice1 className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Probability Casino</CardTitle>
              <CardDescription className="text-lg">
                Learn probability through fun casino games and scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">5 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Time to complete</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Probability challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold">160 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                Start Casino Adventure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className={`h-16 w-16 ${percentage >= 80 ? 'text-yellow-500' : percentage >= 60 ? 'text-gray-400' : 'text-orange-500'}`} />
              </div>
              <CardTitle className="text-3xl mb-2">Casino Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered probability concepts
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
                  Play Again
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
                {currentQ?.type.replace('_', ' ').toUpperCase()}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {10 + (streak * 2)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentQ?.visual && renderVisual(currentQ.visual)}
            
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
                  {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Game'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}