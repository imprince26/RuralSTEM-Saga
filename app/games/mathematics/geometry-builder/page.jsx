"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, Square, Triangle, Circle } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function GeometryBuilderGame() {
  const { updateGameProgress } = useGameStore();
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate geometry questions
  const generateQuestions = useCallback(() => {
    const newQuestions = [];
    const questionCount = 10;
    
    const questionTypes = [
      'area_rectangle', // Calculate rectangle area
      'area_triangle', // Calculate triangle area
      'area_circle', // Calculate circle area
      'perimeter', // Calculate perimeter
      'angles', // Angle calculations
      'volume', // Volume calculations
      'shape_identify', // Identify shapes
      'properties' // Shape properties
    ];
    
    for (let i = 0; i < questionCount; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let question = {};
      
      switch (type) {
        case 'area_rectangle':
          question = generateRectangleAreaQuestion();
          break;
        case 'area_triangle':
          question = generateTriangleAreaQuestion();
          break;
        case 'area_circle':
          question = generateCircleAreaQuestion();
          break;
        case 'perimeter':
          question = generatePerimeterQuestion();
          break;
        case 'angles':
          question = generateAngleQuestion();
          break;
        case 'volume':
          question = generateVolumeQuestion();
          break;
        case 'shape_identify':
          question = generateShapeIdentifyQuestion();
          break;
        case 'properties':
          question = generatePropertiesQuestion();
          break;
      }
      
      newQuestions.push(question);
    }
    setQuestions(newQuestions);
  }, []);

  const generateRectangleAreaQuestion = () => {
    const length = Math.floor(Math.random() * 10) + 3;
    const width = Math.floor(Math.random() * 8) + 2;
    const correctAnswer = length * width;
    
    return {
      type: 'area_rectangle',
      question: `What is the area of a rectangle with length ${length} units and width ${width} units?`,
      visual: { type: 'rectangle', length, width },
      correctAnswer: `${correctAnswer} square units`,
      answers: generateAreaOptions(correctAnswer, 'square units'),
      explanation: `Area = length × width = ${length} × ${width} = ${correctAnswer}`
    };
  };

  const generateTriangleAreaQuestion = () => {
    const base = Math.floor(Math.random() * 12) + 4;
    const height = Math.floor(Math.random() * 10) + 3;
    const correctAnswer = (base * height) / 2;
    
    return {
      type: 'area_triangle',
      question: `What is the area of a triangle with base ${base} units and height ${height} units?`,
      visual: { type: 'triangle', base, height },
      correctAnswer: `${correctAnswer} square units`,
      answers: generateAreaOptions(correctAnswer, 'square units'),
      explanation: `Area = (base × height) ÷ 2 = (${base} × ${height}) ÷ 2 = ${correctAnswer}`
    };
  };

  const generateCircleAreaQuestion = () => {
    const radius = Math.floor(Math.random() * 6) + 2;
    const correctAnswer = Math.round(Math.PI * radius * radius * 100) / 100;
    
    return {
      type: 'area_circle',
      question: `What is the area of a circle with radius ${radius} units? (Use π ≈ 3.14)`,
      visual: { type: 'circle', radius },
      correctAnswer: `${correctAnswer} square units`,
      answers: generateAreaOptions(correctAnswer, 'square units'),
      explanation: `Area = π × r² = 3.14 × ${radius}² = ${correctAnswer}`
    };
  };

  const generatePerimeterQuestion = () => {
    const shapeType = ['rectangle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
    
    if (shapeType === 'rectangle') {
      const length = Math.floor(Math.random() * 10) + 3;
      const width = Math.floor(Math.random() * 8) + 2;
      const correctAnswer = 2 * (length + width);
      
      return {
        type: 'perimeter',
        question: `What is the perimeter of a rectangle with length ${length} units and width ${width} units?`,
        visual: { type: 'rectangle', length, width },
        correctAnswer: `${correctAnswer} units`,
        answers: generatePerimeterOptions(correctAnswer),
        explanation: `Perimeter = 2 × (length + width) = 2 × (${length} + ${width}) = ${correctAnswer}`
      };
    } else if (shapeType === 'square') {
      const side = Math.floor(Math.random() * 10) + 3;
      const correctAnswer = 4 * side;
      
      return {
        type: 'perimeter',
        question: `What is the perimeter of a square with side length ${side} units?`,
        visual: { type: 'square', side },
        correctAnswer: `${correctAnswer} units`,
        answers: generatePerimeterOptions(correctAnswer),
        explanation: `Perimeter = 4 × side = 4 × ${side} = ${correctAnswer}`
      };
    } else {
      const side1 = Math.floor(Math.random() * 8) + 3;
      const side2 = Math.floor(Math.random() * 8) + 3;
      const side3 = Math.floor(Math.random() * 8) + 3;
      const correctAnswer = side1 + side2 + side3;
      
      return {
        type: 'perimeter',
        question: `What is the perimeter of a triangle with sides ${side1}, ${side2}, and ${side3} units?`,
        visual: { type: 'triangle', side1, side2, side3 },
        correctAnswer: `${correctAnswer} units`,
        answers: generatePerimeterOptions(correctAnswer),
        explanation: `Perimeter = ${side1} + ${side2} + ${side3} = ${correctAnswer}`
      };
    }
  };

  const generateAngleQuestion = () => {
    const questionType = ['triangle_sum', 'straight_line', 'complementary'][Math.floor(Math.random() * 3)];
    
    if (questionType === 'triangle_sum') {
      const angle1 = Math.floor(Math.random() * 60) + 30;
      const angle2 = Math.floor(Math.random() * 60) + 30;
      const correctAnswer = 180 - angle1 - angle2;
      
      return {
        type: 'angles',
        question: `In a triangle, two angles measure ${angle1}° and ${angle2}°. What is the third angle?`,
        correctAnswer: `${correctAnswer}°`,
        answers: generateAngleOptions(correctAnswer),
        explanation: `Sum of angles in triangle = 180°, so third angle = 180° - ${angle1}° - ${angle2}° = ${correctAnswer}°`
      };
    } else if (questionType === 'straight_line') {
      const angle1 = Math.floor(Math.random() * 120) + 30;
      const correctAnswer = 180 - angle1;
      
      return {
        type: 'angles',
        question: `Two angles on a straight line measure ${angle1}° and x°. What is x?`,
        correctAnswer: `${correctAnswer}°`,
        answers: generateAngleOptions(correctAnswer),
        explanation: `Angles on straight line sum to 180°, so x = 180° - ${angle1}° = ${correctAnswer}°`
      };
    } else {
      const angle1 = Math.floor(Math.random() * 60) + 15;
      const correctAnswer = 90 - angle1;
      
      return {
        type: 'angles',
        question: `Two complementary angles measure ${angle1}° and x°. What is x?`,
        correctAnswer: `${correctAnswer}°`,
        answers: generateAngleOptions(correctAnswer),
        explanation: `Complementary angles sum to 90°, so x = 90° - ${angle1}° = ${correctAnswer}°`
      };
    }
  };

  const generateVolumeQuestion = () => {
    const length = Math.floor(Math.random() * 8) + 3;
    const width = Math.floor(Math.random() * 6) + 2;
    const height = Math.floor(Math.random() * 5) + 2;
    const correctAnswer = length * width * height;
    
    return {
      type: 'volume',
      question: `What is the volume of a rectangular prism with length ${length}, width ${width}, and height ${height} units?`,
      visual: { type: 'prism', length, width, height },
      correctAnswer: `${correctAnswer} cubic units`,
      answers: generateVolumeOptions(correctAnswer),
      explanation: `Volume = length × width × height = ${length} × ${width} × ${height} = ${correctAnswer}`
    };
  };

  const generateShapeIdentifyQuestion = () => {
    const shapes = [
      { name: 'Triangle', sides: 3, description: '3 sides and 3 angles' },
      { name: 'Square', sides: 4, description: '4 equal sides and 4 right angles' },
      { name: 'Rectangle', sides: 4, description: '4 sides with opposite sides equal' },
      { name: 'Pentagon', sides: 5, description: '5 sides and 5 angles' },
      { name: 'Hexagon', sides: 6, description: '6 sides and 6 angles' }
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    return {
      type: 'identify',
      question: `Which shape has ${shape.description}?`,
      correctAnswer: shape.name,
      answers: [shape.name, ...shapes.filter(s => s.name !== shape.name).slice(0, 3).map(s => s.name)].sort(() => Math.random() - 0.5),
      explanation: `A ${shape.name.toLowerCase()} has ${shape.description.toLowerCase()}`
    };
  };

  const generatePropertiesQuestion = () => {
    const properties = [
      { shape: 'Square', property: 'All sides are equal', answer: 'True' },
      { shape: 'Rectangle', property: 'All angles are 90 degrees', answer: 'True' },
      { shape: 'Triangle', property: 'Has 4 sides', answer: 'False' },
      { shape: 'Circle', property: 'Has corners', answer: 'False' },
      { shape: 'Pentagon', property: 'Has 5 sides', answer: 'True' }
    ];
    
    const prop = properties[Math.floor(Math.random() * properties.length)];
    
    return {
      type: 'properties',
      question: `True or False: A ${prop.shape} ${prop.property.toLowerCase()}?`,
      correctAnswer: prop.answer,
      answers: ['True', 'False'],
      explanation: `This statement is ${prop.answer.toLowerCase()}`
    };
  };

  const generateAreaOptions = (correct, unit) => {
    const options = [`${correct} ${unit}`];
    const variations = [2, -2, 5, -5, Math.floor(correct * 0.5), Math.floor(correct * 1.5)];
    
    for (let variation of variations) {
      const option = `${Math.max(1, correct + variation)} ${unit}`;
      if (!options.includes(option) && options.length < 4) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generatePerimeterOptions = (correct) => {
    const options = [`${correct} units`];
    const variations = [2, -2, 4, -4, Math.floor(correct * 0.5)];
    
    for (let variation of variations) {
      const option = `${Math.max(1, correct + variation)} units`;
      if (!options.includes(option) && options.length < 4) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generateAngleOptions = (correct) => {
    const options = [`${correct}°`];
    const variations = [10, -10, 15, -15, 30];
    
    for (let variation of variations) {
      const angle = Math.max(0, Math.min(180, correct + variation));
      const option = `${angle}°`;
      if (!options.includes(option) && options.length < 4) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const generateVolumeOptions = (correct) => {
    const options = [`${correct} cubic units`];
    const variations = [5, -5, 10, -10, Math.floor(correct * 0.5)];
    
    for (let variation of variations) {
      const option = `${Math.max(1, correct + variation)} cubic units`;
      if (!options.includes(option) && options.length < 4) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  // Render shape visuals
  const renderShapeVisual = (visual) => {
    if (!visual) return null;
    
    return (
      <div className="flex justify-center mb-6">
        <div className="w-48 h-32 bg-blue-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          {visual.type === 'rectangle' && (
            <div className="text-center">
              <div className="w-24 h-16 border-4 border-blue-500 mb-2"></div>
              <div className="text-sm">{visual.length} × {visual.width}</div>
            </div>
          )}
          {visual.type === 'triangle' && (
            <div className="text-center">
              <div className="w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-blue-500 mb-2"></div>
              <div className="text-sm">base: {visual.base}, height: {visual.height}</div>
            </div>
          )}
          {visual.type === 'circle' && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full mb-2"></div>
              <div className="text-sm">radius: {visual.radius}</div>
            </div>
          )}
          {visual.type === 'square' && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 mb-2"></div>
              <div className="text-sm">side: {visual.side}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    generateQuestions();
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300);
    setSelectedAnswer(null);
    setShowResult(false);
    setStreak(0);
  };

  const selectAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const points = 20 + (streak * 5);
      setScore(score + points);
      setStreak(streak + 1);
      celebrateCorrectAnswer(); // Celebration effect
    } else {
      setStreak(0);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 2500);
  };

  const endGame = () => {
    setGameState('completed');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    updateGameProgress('geometry-builder', {
      completed: true,
      score: score,
      progress: progress,
      bestScore: score,
      lastPlayed: new Date().toISOString()
    });
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuestions([]);
    setStreak(0);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">📐 Geometry Builder</CardTitle>
              <CardDescription className="text-lg">
                Master shapes, areas, perimeters, and geometric properties!
              </CardDescription>
              
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-blue-500">
                  <Star className="h-3 w-3 mr-1" />
                  Hard
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  5 minutes
                </Badge>
                <Badge variant="outline">
                  <Trophy className="h-3 w-3 mr-1" />
                  200 points max
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-left bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Topics Covered:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Area calculations (rectangles, triangles, circles)</li>
                    <li>• Perimeter and circumference</li>
                    <li>• Angle properties and relationships</li>
                    <li>• Volume of 3D shapes</li>
                    <li>• Shape identification and properties</li>
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <Square className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm">Rectangles</div>
                  </div>
                  <div className="text-center">
                    <Triangle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <div className="text-sm">Triangles</div>
                  </div>
                  <div className="text-center">
                    <Circle className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                    <div className="text-sm">Circles</div>
                  </div>
                </div>
                
                <Button onClick={startGame} size="lg" className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                  Start Geometry Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const correctAnswers = Math.floor(score / 20);
    const percentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🎉 Geometry Mastered!</CardTitle>
              <CardDescription className="text-lg">
                You've built amazing geometric knowledge!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-6xl">
                  {percentage >= 90 ? '🏆' : percentage >= 75 ? '🥈' : percentage >= 60 ? '🥉' : '📐'}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{score}</div>
                  <div className="text-gray-600">Total Score</div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-gray-500">{Math.round(percentage)}% Accuracy</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{questions.length}</div>
                    <div className="text-sm text-gray-500">Problems</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Solved</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{300 - timeLeft}s</div>
                    <div className="text-sm text-gray-500">Time Used</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={resetGame} variant="outline" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Play Again
                  </Button>
                  <Link href="/games" className="flex-1">
                    <Button className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Games
                    </Button>
                  </Link>
                </div>
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
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Game
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Badge>
            <Badge variant="outline">
              <Trophy className="h-4 w-4 mr-1" />
              {score} pts
            </Badge>
            {streak > 0 && (
              <Badge className="bg-blue-500">
                🔥 {streak} streak
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Problem {currentQuestion + 1} of {questions.length}</CardTitle>
              <Badge className="bg-blue-500">GEOMETRY</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-lg font-medium text-blue-600 mb-4">
                {currentQ?.question}
              </div>
              
              {currentQ?.visual && renderShapeVisual(currentQ.visual)}
              
              <div className="grid grid-cols-2 gap-4">
                {currentQ?.answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => selectAnswer(answer)}
                    disabled={showResult}
                    className={`p-6 text-lg h-auto ${
                      showResult
                        ? answer === currentQ.correctAnswer
                          ? 'bg-green-500 hover:bg-green-500'
                          : selectedAnswer === answer
                          ? 'bg-red-500 hover:bg-red-500'
                          : ''
                        : 'hover:scale-105 transition-transform'
                    }`}
                    variant={showResult && answer !== currentQ.correctAnswer && selectedAnswer !== answer ? "outline" : "default"}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
              
              {showResult && (
                <div className="space-y-2">
                  <div className={`text-lg font-semibold ${
                    selectedAnswer === currentQ.correctAnswer ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedAnswer === currentQ.correctAnswer 
                      ? `🎉 Perfect! +${20 + (streak * 5)} points` 
                      : `❌ Not quite! The answer was ${currentQ.correctAnswer}`
                    }
                  </div>
                  {currentQ.explanation && (
                    <div className="text-sm text-gray-600 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      {currentQ.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}