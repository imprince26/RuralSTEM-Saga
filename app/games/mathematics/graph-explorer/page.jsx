"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Star, ArrowLeft, RotateCcw, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function GraphExplorerGame() {
  const { updateGameProgress } = useGameStore();
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate graph and data interpretation questions
  const generateQuestions = useCallback(() => {
    const newQuestions = [];
    const questionCount = 12;
    
    const questionTypes = [
      'bar_chart', // Reading bar charts
      'line_graph', // Reading line graphs
      'pie_chart', // Reading pie charts
      'coordinate', // Coordinate points
      'slope', // Finding slope
      'data_compare', // Comparing data
      'mean_median', // Statistics
      'trend' // Identifying trends
    ];
    
    for (let i = 0; i < questionCount; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let question = {};
      
      switch (type) {
        case 'bar_chart':
          question = generateBarChartQuestion();
          break;
        case 'line_graph':
          question = generateLineGraphQuestion();
          break;
        case 'pie_chart':
          question = generatePieChartQuestion();
          break;
        case 'coordinate':
          question = generateCoordinateQuestion();
          break;
        case 'slope':
          question = generateSlopeQuestion();
          break;
        case 'data_compare':
          question = generateDataCompareQuestion();
          break;
        case 'mean_median':
          question = generateStatisticsQuestion();
          break;
        case 'trend':
          question = generateTrendQuestion();
          break;
      }
      
      newQuestions.push(question);
    }
    setQuestions(newQuestions);
  }, []);

  const generateBarChartQuestion = () => {
    const categories = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
    const values = categories.map(() => Math.floor(Math.random() * 50) + 10);
    const maxIndex = values.indexOf(Math.max(...values));
    const minIndex = values.indexOf(Math.min(...values));
    
    const questionType = Math.random() > 0.5 ? 'max' : 'min';
    const correctAnswer = questionType === 'max' ? categories[maxIndex] : categories[minIndex];
    
    return {
      type: 'bar_chart',
      question: `Looking at the bar chart, which color has the ${questionType === 'max' ? 'highest' : 'lowest'} value?`,
      data: { categories, values, type: 'bar' },
      correctAnswer: correctAnswer,
      answers: [correctAnswer, ...categories.filter(c => c !== correctAnswer).slice(0, 3)].sort(() => Math.random() - 0.5),
      explanation: `${correctAnswer} has the ${questionType === 'max' ? 'highest' : 'lowest'} bar with value ${questionType === 'max' ? Math.max(...values) : Math.min(...values)}`
    };
  };

  const generateLineGraphQuestion = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const temperatures = months.map(() => Math.floor(Math.random() * 30) + 10);
    
    const trend = temperatures[temperatures.length - 1] > temperatures[0] ? 'increasing' : 'decreasing';
    const maxTemp = Math.max(...temperatures);
    const maxMonth = months[temperatures.indexOf(maxTemp)];
    
    const questionType = Math.random() > 0.5 ? 'trend' : 'max';
    
    if (questionType === 'trend') {
      return {
        type: 'line_graph',
        question: 'What is the overall trend of temperature from January to June?',
        data: { months, temperatures, type: 'line' },
        correctAnswer: trend,
        answers: ['increasing', 'decreasing', 'staying same', 'no pattern'].sort(() => Math.random() - 0.5),
        explanation: `The temperature is generally ${trend} from ${temperatures[0]}° to ${temperatures[temperatures.length - 1]}°`
      };
    } else {
      return {
        type: 'line_graph',
        question: 'In which month was the temperature highest?',
        data: { months, temperatures, type: 'line' },
        correctAnswer: maxMonth,
        answers: [maxMonth, ...months.filter(m => m !== maxMonth).slice(0, 3)].sort(() => Math.random() - 0.5),
        explanation: `${maxMonth} had the highest temperature of ${maxTemp}°`
      };
    }
  };

  const generatePieChartQuestion = () => {
    const fruits = ['Apples', 'Bananas', 'Oranges', 'Grapes'];
    const percentages = [30, 25, 25, 20];
    const largest = fruits[percentages.indexOf(Math.max(...percentages))];
    
    return {
      type: 'pie_chart',
      question: 'Which fruit makes up the largest portion of the pie chart?',
      data: { fruits, percentages, type: 'pie' },
      correctAnswer: largest,
      answers: fruits.sort(() => Math.random() - 0.5),
      explanation: `${largest} represents ${Math.max(...percentages)}% of the total`
    };
  };

  const generateCoordinateQuestion = () => {
    const x = Math.floor(Math.random() * 10) - 5;
    const y = Math.floor(Math.random() * 10) - 5;
    
    let quadrant;
    if (x > 0 && y > 0) quadrant = 'I';
    else if (x < 0 && y > 0) quadrant = 'II';
    else if (x < 0 && y < 0) quadrant = 'III';
    else if (x > 0 && y < 0) quadrant = 'IV';
    else quadrant = 'on an axis';
    
    return {
      type: 'coordinate',
      question: `In which quadrant is the point (${x}, ${y}) located?`,
      correctAnswer: quadrant === 'on an axis' ? 'On an axis' : `Quadrant ${quadrant}`,
      answers: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV', 'On an axis'].slice(0, 4).sort(() => Math.random() - 0.5),
      explanation: `Point (${x}, ${y}) is in ${quadrant === 'on an axis' ? 'on an axis' : `quadrant ${quadrant}`}`
    };
  };

  const generateSlopeQuestion = () => {
    const x1 = Math.floor(Math.random() * 6) + 1;
    const y1 = Math.floor(Math.random() * 6) + 1;
    const x2 = x1 + Math.floor(Math.random() * 4) + 1;
    const y2 = y1 + Math.floor(Math.random() * 4) + 1;
    
    const slope = (y2 - y1) / (x2 - x1);
    const slopeFormatted = slope % 1 === 0 ? slope.toString() : slope.toFixed(1);
    
    return {
      type: 'slope',
      question: `What is the slope of the line passing through points (${x1}, ${y1}) and (${x2}, ${y2})?`,
      correctAnswer: slopeFormatted,
      answers: [slopeFormatted, (slope + 0.5).toFixed(1), (slope - 0.5).toFixed(1), (slope * 2).toFixed(1)].sort(() => Math.random() - 0.5),
      explanation: `Slope = (y₂ - y₁) / (x₂ - x₁) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${slopeFormatted}`
    };
  };

  const generateDataCompareQuestion = () => {
    const students = ['Alice', 'Bob', 'Carol', 'David'];
    const scores = students.map(() => Math.floor(Math.random() * 50) + 50);
    const highest = students[scores.indexOf(Math.max(...scores))];
    const lowest = students[scores.indexOf(Math.min(...scores))];
    
    const questionType = Math.random() > 0.5 ? 'highest' : 'lowest';
    const correct = questionType === 'highest' ? highest : lowest;
    
    return {
      type: 'data_compare',
      question: `Who scored the ${questionType} on the test?`,
      data: { students, scores },
      correctAnswer: correct,
      answers: students.sort(() => Math.random() - 0.5),
      explanation: `${correct} scored ${questionType === 'highest' ? Math.max(...scores) : Math.min(...scores)} points`
    };
  };

  const generateStatisticsQuestion = () => {
    const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 10);
    const mean = Math.round((numbers.reduce((a, b) => a + b, 0) / numbers.length) * 10) / 10;
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const median = sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    
    const questionType = Math.random() > 0.5 ? 'mean' : 'median';
    const correct = questionType === 'mean' ? mean.toString() : median.toString();
    
    return {
      type: 'statistics',
      question: `What is the ${questionType} of these numbers: ${numbers.join(', ')}?`,
      correctAnswer: correct,
      answers: [correct, (parseFloat(correct) + 1).toString(), (parseFloat(correct) - 1).toString(), (parseFloat(correct) + 2).toString()].sort(() => Math.random() - 0.5),
      explanation: `The ${questionType} is ${correct}`
    };
  };

  const generateTrendQuestion = () => {
    const years = ['2019', '2020', '2021', '2022', '2023'];
    const sales = [100, 120, 110, 150, 180];
    
    return {
      type: 'trend',
      question: 'What is the overall trend in sales from 2019 to 2023?',
      data: { years, sales },
      correctAnswer: 'Increasing',
      answers: ['Increasing', 'Decreasing', 'Stable', 'No clear trend'],
      explanation: 'Sales increased from 100 in 2019 to 180 in 2023, showing an overall increasing trend'
    };
  };

  // Render data visualizations
  const renderDataVisualization = (data) => {
    if (!data) return null;
    
    return (
      <div className="flex justify-center mb-6">
        <div className="w-80 h-48 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          {data.type === 'bar' && (
            <div className="h-full flex items-end justify-around">
              {data.categories.map((category, index) => (
                <div key={category} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-500 w-8 mb-1"
                    style={{ 
                      height: `${(data.values[index] / Math.max(...data.values)) * 100}px` 
                    }}
                  ></div>
                  <div className="text-xs">{category}</div>
                  <div className="text-xs font-bold">{data.values[index]}</div>
                </div>
              ))}
            </div>
          )}
          
          {data.type === 'line' && (
            <div className="h-full relative">
              <div className="text-center text-sm font-semibold mb-2">Temperature Over Time</div>
              <div className="flex items-end justify-around h-32">
                {data.months.map((month, index) => (
                  <div key={month} className="flex flex-col items-center">
                    <div className="text-xs font-bold mb-1">{data.temperatures[index]}°</div>
                    <div 
                      className="bg-red-500 w-6 mb-1"
                      style={{ 
                        height: `${(data.temperatures[index] / Math.max(...data.temperatures)) * 80}px` 
                      }}
                    ></div>
                    <div className="text-xs">{month}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.type === 'pie' && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full" 
                     style={{
                       background: `conic-gradient(
                         #3b82f6 0deg ${data.percentages[0] * 3.6}deg,
                         #ef4444 ${data.percentages[0] * 3.6}deg ${(data.percentages[0] + data.percentages[1]) * 3.6}deg,
                         #10b981 ${(data.percentages[0] + data.percentages[1]) * 3.6}deg ${(data.percentages[0] + data.percentages[1] + data.percentages[2]) * 3.6}deg,
                         #f59e0b ${(data.percentages[0] + data.percentages[1] + data.percentages[2]) * 3.6}deg 360deg
                       )`
                     }}
                ></div>
                <div className="text-xs space-y-1">
                  {data.fruits.map((fruit, index) => (
                    <div key={fruit} className="flex items-center justify-center">
                      <div className={`w-3 h-3 mr-2 ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-red-500' : 
                        index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span>{fruit}: {data.percentages[index]}%</span>
                    </div>
                  ))}
                </div>
              </div>
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
      const points = 15 + (streak * 3);
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
    
    updateGameProgress('graph-explorer', {
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
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
              <CardTitle className="text-3xl mb-2">📊 Graph Explorer</CardTitle>
              <CardDescription className="text-lg">
                Master data interpretation through charts, graphs, and statistics!
              </CardDescription>
              
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-indigo-500">
                  <Star className="h-3 w-3 mr-1" />
                  Medium
                </Badge>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  5 minutes
                </Badge>
                <Badge variant="outline">
                  <Trophy className="h-3 w-3 mr-1" />
                  180 points max
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-left bg-indigo-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Skills You'll Practice:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Reading bar charts and line graphs</li>
                    <li>• Interpreting pie charts</li>
                    <li>• Coordinate geometry</li>
                    <li>• Calculating slope and statistics</li>
                    <li>• Identifying trends in data</li>
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm">Bar Charts</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <div className="text-sm">Line Graphs</div>
                  </div>
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">π</div>
                    <div className="text-sm">Pie Charts</div>
                  </div>
                </div>
                
                <Button onClick={startGame} size="lg" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  Start Graph Explorer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const correctAnswers = Math.floor(score / 15);
    const percentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">🎉 Data Master!</CardTitle>
              <CardDescription className="text-lg">
                You've mastered the art of data interpretation!
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="text-6xl">
                  {percentage >= 90 ? '🏆' : percentage >= 75 ? '🥈' : percentage >= 60 ? '🥉' : '📊'}
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-indigo-600">{score}</div>
                  <div className="text-gray-600">Total Score</div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-gray-500">{Math.round(percentage)}% Accuracy</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{questions.length}</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Correct</div>
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
              <Badge className="bg-indigo-500">
                🔥 {streak} streak
              </Badge>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
              <Badge className="bg-indigo-500">DATA</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-lg font-medium text-indigo-600 mb-4">
                {currentQ?.question}
              </div>
              
              {currentQ?.data && renderDataVisualization(currentQ.data)}
              
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
                      ? `🎉 Excellent! +${15 + (streak * 3)} points` 
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