"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Atom, Zap } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function AtomBuilderGame() {
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
        question: "What are the three main particles that make up an atom?",
        options: ["Protons, Neutrons, Electrons", "Photons, Neutrons, Electrons", "Protons, Positrons, Electrons", "Protons, Neutrons, Positrons"],
        answer: "Protons, Neutrons, Electrons",
        explanation: "Atoms consist of protons (positive), neutrons (neutral), and electrons (negative)",
        category: "Atomic Structure"
      },
      {
        question: "Where are protons and neutrons located in an atom?",
        options: ["In the electron cloud", "In the nucleus", "Around the nucleus", "In the outer shell"],
        answer: "In the nucleus",
        explanation: "Protons and neutrons are found in the dense central nucleus of the atom",
        category: "Atomic Structure"
      },
      {
        question: "What determines the atomic number of an element?",
        options: ["Number of neutrons", "Number of protons", "Number of electrons", "Total mass"],
        answer: "Number of protons",
        explanation: "The atomic number equals the number of protons in the nucleus",
        category: "Elements"
      },
      {
        question: "Which particle has a negative charge?",
        options: ["Proton", "Neutron", "Electron", "Nucleus"],
        answer: "Electron",
        explanation: "Electrons carry a negative electric charge and orbit the nucleus",
        category: "Particles"
      },
      {
        question: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        answer: "6",
        explanation: "Carbon has 6 protons, giving it an atomic number of 6",
        category: "Elements"
      },
      {
        question: "What are atoms with the same number of protons but different numbers of neutrons called?",
        options: ["Ions", "Isotopes", "Molecules", "Compounds"],
        answer: "Isotopes",
        explanation: "Isotopes are atoms of the same element with different numbers of neutrons",
        category: "Isotopes"
      },
      {
        question: "How many electrons does a neutral atom have compared to protons?",
        options: ["More electrons", "Fewer electrons", "The same number", "It varies"],
        answer: "The same number",
        explanation: "In a neutral atom, the number of electrons equals the number of protons",
        category: "Atomic Structure"
      },
      {
        question: "What is the smallest unit of an element that retains its properties?",
        options: ["Molecule", "Atom", "Ion", "Compound"],
        answer: "Atom",
        explanation: "An atom is the smallest unit that maintains the chemical properties of an element",
        category: "Basic Concepts"
      },
      {
        question: "Which element has the symbol 'He'?",
        options: ["Hydrogen", "Helium", "Mercury", "Hafnium"],
        answer: "Helium",
        explanation: "Helium is represented by the symbol 'He' and has atomic number 2",
        category: "Elements"
      },
      {
        question: "What happens when an atom gains or loses electrons?",
        options: ["It becomes an isotope", "It becomes an ion", "It becomes a molecule", "Nothing happens"],
        answer: "It becomes an ion",
        explanation: "Atoms that gain or lose electrons become charged particles called ions",
        category: "Ions"
      }
    ];

    // Shuffle and select 8 questions for this game
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
      updateGameProgress('atom-builder', score, currentQuestion, questions.length);
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
      updateGameProgress('atom-builder', score, questions.length, questions.length);
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
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full">
                  <Atom className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Atom Builder</CardTitle>
              <CardDescription className="text-lg">
                Build atoms and understand atomic structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">8 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Time to build</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">8 Questions</h3>
                  <p className="text-sm text-muted-foreground">Atomic challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">200 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                Start Building Atoms
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
              <CardTitle className="text-3xl mb-2">Atoms Built!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered atomic structure
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
                  Build Again
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
                {25 + (streak * 5)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <Atom className="h-16 w-16 text-blue-500 animate-spin" style={{animationDuration: '3s'}} />
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
                  {isCorrect ? '⚛️ Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentQ?.explanation}
                </div>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? 'Next Atom' : 'Complete Building'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}