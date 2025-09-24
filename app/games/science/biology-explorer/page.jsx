"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Microscope, Leaf, Heart } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function BiologyExplorerGame() {
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
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        answer: "Mitochondria",
        explanation: "Mitochondria produce ATP, the energy currency of cells",
        category: "Cell Biology"
      },
      {
        question: "Which process do plants use to make their own food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
        answer: "Photosynthesis",
        explanation: "Plants convert sunlight, CO2, and water into glucose through photosynthesis",
        category: "Plant Biology"
      },
      {
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Skin", "Lungs"],
        answer: "Skin",
        explanation: "The skin covers the entire body and is the largest organ by surface area",
        category: "Human Anatomy"
      },
      {
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        answer: "4",
        explanation: "The human heart has 4 chambers: 2 atria and 2 ventricles",
        category: "Human Anatomy"
      },
      {
        question: "What type of blood vessel carries blood away from the heart?",
        options: ["Vein", "Artery", "Capillary", "Valve"],
        answer: "Artery",
        explanation: "Arteries carry oxygenated blood away from the heart to body tissues",
        category: "Circulatory System"
      },
      {
        question: "What is the basic unit of heredity?",
        options: ["Cell", "Gene", "Chromosome", "DNA"],
        answer: "Gene",
        explanation: "Genes are specific DNA sequences that code for traits",
        category: "Genetics"
      },
      {
        question: "Which organelle contains chlorophyll in plant cells?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Vacuole"],
        answer: "Chloroplast",
        explanation: "Chloroplasts contain chlorophyll, the green pigment used in photosynthesis",
        category: "Plant Biology"
      },
      {
        question: "What is the process by which organisms produce offspring?",
        options: ["Growth", "Reproduction", "Metabolism", "Homeostasis"],
        answer: "Reproduction",
        explanation: "Reproduction is the biological process of creating new individuals",
        category: "Life Processes"
      },
      {
        question: "Which system in the human body fights infections?",
        options: ["Nervous", "Digestive", "Immune", "Respiratory"],
        answer: "Immune",
        explanation: "The immune system protects the body from pathogens and diseases",
        category: "Human Systems"
      },
      {
        question: "What do we call animals that eat only plants?",
        options: ["Carnivores", "Herbivores", "Omnivores", "Decomposers"],
        answer: "Herbivores",
        explanation: "Herbivores are animals that feed exclusively on plant material",
        category: "Ecology"
      },
      {
        question: "Which gas do plants absorb from the air during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
        explanation: "Plants absorb CO2 from the air and convert it to glucose using sunlight",
        category: "Plant Biology"
      },
      {
        question: "What is the smallest unit of life?",
        options: ["Atom", "Molecule", "Cell", "Tissue"],
        answer: "Cell",
        explanation: "The cell is the basic structural and functional unit of all living things",
        category: "Cell Biology"
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
      updateGameProgress('biology-explorer', score, currentQuestion, questions.length);
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
      updateGameProgress('biology-explorer', score, questions.length, questions.length);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(420); // 7 minutes
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(420);
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
                  <Microscope className="h-12 w-12" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-2">Biology Explorer</CardTitle>
              <CardDescription className="text-lg">
                Journey through living systems and discover the wonders of life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">7 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Time to complete</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <h3 className="font-semibold">10 Questions</h3>
                  <p className="text-sm text-muted-foreground">Biology challenges</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">225 Points</h3>
                  <p className="text-sm text-muted-foreground">Maximum score</p>
                </div>
              </div>
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                Start Exploring Life
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
              <CardTitle className="text-3xl mb-2">Exploration Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've discovered the wonders of biology
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
                  Explore Again
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
                {15 + (streak * 3)} points
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              {currentQ?.category === 'Cell Biology' && <Microscope className="h-16 w-16 text-blue-500" />}
              {currentQ?.category === 'Plant Biology' && <Leaf className="h-16 w-16 text-green-500" />}
              {(currentQ?.category === 'Human Anatomy' || currentQ?.category === 'Circulatory System') && <Heart className="h-16 w-16 text-red-500" />}
              {!['Cell Biology', 'Plant Biology', 'Human Anatomy', 'Circulatory System'].includes(currentQ?.category) && <Microscope className="h-16 w-16 text-purple-500" />}
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
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Exploration'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}