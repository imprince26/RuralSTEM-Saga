"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Trophy, 
  Star, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Code,
  Play,
  Bug
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import confetti from 'canvas-confetti';

export default function CodeCreator() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateGameProgress, addPoints } = useGameStore();

  // Game State
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [challengeComplete, setChallengeComplete] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Hello World",
      description: "Write a program that prints 'Hello, World!' to the console.",
      difficulty: "easy",
      expectedOutput: "Hello, World!",
      starterCode: "// Write your code here\nconsole.log();",
      hint: "Use console.log() to print text to the console",
      solution: "console.log('Hello, World!');"
    },
    {
      id: 2,
      title: "Simple Math",
      description: "Calculate and print the sum of 15 + 27",
      difficulty: "easy",
      expectedOutput: "42",
      starterCode: "// Calculate 15 + 27\nlet result = ;\nconsole.log(result);",
      hint: "Use the + operator to add numbers",
      solution: "let result = 15 + 27;\nconsole.log(result);"
    },
    {
      id: 3,
      title: "Variables",
      description: "Create a variable called 'name' with your name and print 'My name is [name]'",
      difficulty: "easy",
      expectedOutput: "My name is Student",
      starterCode: "// Create a variable called name\nlet name = ;\nconsole.log();",
      hint: "Store text in quotes and use template literals or string concatenation",
      solution: "let name = 'Student';\nconsole.log('My name is ' + name);"
    },
    {
      id: 4,
      title: "Loops",
      description: "Use a for loop to print numbers 1 to 5",
      difficulty: "medium",
      expectedOutput: "1\n2\n3\n4\n5",
      starterCode: "// Use a for loop to print 1 to 5\nfor() {\n    \n}",
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      solution: "for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}"
    },
    {
      id: 5,
      title: "Functions",
      description: "Create a function called 'greet' that takes a name and returns 'Hello [name]!'",
      difficulty: "medium",
      expectedOutput: "Hello Alice!",
      starterCode: "// Create a function called greet\nfunction greet() {\n    \n}\n\nconsole.log(greet('Alice'));",
      hint: "Functions take parameters and use return to give back a value",
      solution: "function greet(name) {\n    return 'Hello ' + name + '!';\n}\n\nconsole.log(greet('Alice'));"
    },
    {
      id: 6,
      title: "Arrays",
      description: "Create an array with fruits and print the first item",
      difficulty: "medium",
      expectedOutput: "apple",
      starterCode: "// Create an array of fruits\nlet fruits = [];\nconsole.log();",
      hint: "Arrays use square brackets and access items with index [0]",
      solution: "let fruits = ['apple', 'banana', 'orange'];\nconsole.log(fruits[0]);"
    }
  ];

  const currentChall = challenges[currentChallenge];

  // Initialize game
  const startGame = () => {
    setGameState('playing');
    setCurrentChallenge(0);
    setScore(0);
    setTimeLeft(900);
    setCode(challenges[0].starterCode);
    setOutput('');
    setShowResult(false);
    setChallengeComplete(false);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Initialize starter code when challenge changes
  useEffect(() => {
    if (currentChall) {
      setCode(currentChall.starterCode);
      setOutput('');
      setShowResult(false);
      setChallengeComplete(false);
    }
  }, [currentChallenge, currentChall]);

  // Simple code execution simulation
  const runCode = () => {
    let result = '';
    
    try {
      // Simple simulation of JavaScript execution
      // In a real implementation, you'd use a safer sandbox
      const lines = code.split('\n');
      
      for (const line of lines) {
        if (line.includes('console.log(')) {
          const match = line.match(/console\.log\((.+)\)/);
          if (match) {
            let content = match[1];
            
            // Handle simple expressions
            if (content.includes('+')) {
              const parts = content.split('+').map(p => p.trim());
              if (parts.every(p => !isNaN(p))) {
                // All numbers
                const sum = parts.reduce((acc, p) => acc + parseInt(p), 0);
                result += sum + '\n';
              } else {
                // String concatenation
                const combined = parts.map(p => {
                  p = p.replace(/['"]/g, '');
                  if (p.includes('name') && code.includes("name = 'Student'")) {
                    p = p.replace('name', 'Student');
                  }
                  return p;
                }).join('');
                result += combined + '\n';
              }
            } else if (content.includes('greet(')) {
              const nameMatch = content.match(/greet\(['"](.+)['"]\)/);
              if (nameMatch && code.includes('return')) {
                result += `Hello ${nameMatch[1]}!\n`;
              }
            } else if (content.includes('fruits[0]') && code.includes('apple')) {
              result += 'apple\n';
            } else {
              // Direct string or number
              const cleaned = content.replace(/['"]/g, '');
              result += cleaned + '\n';
            }
          }
        }
      }
      
      // Handle loops
      if (code.includes('for') && code.includes('i <= 5')) {
        result = '1\n2\n3\n4\n5\n';
      }
      
    } catch (error) {
      result = 'Error: ' + error.message;
    }
    
    setOutput(result.trim());
    
    // Check if output matches expected
    const isCorrect = result.trim() === currentChall.expectedOutput;
    setShowResult(true);
    setChallengeComplete(isCorrect);
    
    if (isCorrect) {
      const points = currentChall.difficulty === 'easy' ? 50 : 100;
      setScore(prev => prev + points);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('completed');
    
    // Update game progress
    const progress = ((currentChallenge + (challengeComplete ? 1 : 0)) / challenges.length) * 100;
    const gameData = {
      gameId: 'code-creator',
      progress: Math.min(progress, 100),
      bestScore: score,
      completed: progress >= 100,
      lastPlayed: new Date().toISOString()
    };
    
    updateGameProgress(gameData);
    addPoints(score);

    if (progress >= 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => router.push('/games')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          )}
        </div>

        {/* Game Menu */}
        {gameState === 'menu' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <Code className="h-16 w-16 mx-auto mb-4 text-purple-500" />
              <h1 className="text-4xl font-bold mb-4">Code Creator</h1>
              <p className="text-xl text-muted-foreground">
                Learn programming basics through interactive coding challenges!
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Game Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-purple-500" />
                  <span>Complete 6 programming challenges</span>
                </div>
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-green-500" />
                  <span>Write and run JavaScript code</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Earn points for correct solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bug className="h-5 w-5 text-red-500" />
                  <span>Debug your code if it doesn't work</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="px-8">
              Start Coding
            </Button>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && currentChall && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">
                  Challenge {currentChallenge + 1} of {challenges.length}
                </span>
                <Badge className={
                  currentChall.difficulty === 'easy' ? 'bg-green-500' : 'bg-yellow-500'
                }>
                  {currentChall.difficulty}
                </Badge>
              </div>
              <Progress 
                value={((currentChallenge + (challengeComplete ? 1 : 0)) / challenges.length) * 100} 
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Challenge Description */}
              <Card>
                <CardHeader>
                  <CardTitle>{currentChall.title}</CardTitle>
                  <CardDescription>{currentChall.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Expected Output:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm">
                      {currentChall.expectedOutput}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Hint:</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentChall.hint}
                    </p>
                  </div>
                  
                  {showResult && (
                    <div className="mt-4">
                      {challengeComplete ? (
                        <div className="text-green-600">
                          <CheckCircle className="h-6 w-6 inline mr-2" />
                          <span className="font-semibold">Challenge Complete!</span>
                          <p className="text-sm mt-1">Great job! Your code works correctly.</p>
                        </div>
                      ) : (
                        <div className="text-red-600">
                          <XCircle className="h-6 w-6 inline mr-2" />
                          <span className="font-semibold">Not quite right</span>
                          <p className="text-sm mt-1">Check your code and try again.</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {challengeComplete && (
                    <div className="pt-4 border-t">
                      <Button onClick={nextChallenge} className="w-full">
                        {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Finish Game'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Code Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Code Editor</CardTitle>
                  <CardDescription>Write your JavaScript code here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-48 p-3 font-mono text-sm border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your code here..."
                      disabled={challengeComplete}
                    />
                  </div>
                  
                  <Button 
                    onClick={runCode} 
                    className="w-full"
                    disabled={challengeComplete}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </Button>
                  
                  {output && (
                    <div>
                      <h4 className="font-semibold mb-2">Output:</h4>
                      <pre className={`p-3 rounded text-sm border ${
                        challengeComplete ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
                      }`}>
                        {output}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Game Completed */}
        {gameState === 'completed' && (
          <div className="text-center max-w-2xl mx-auto">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-4">Coding Complete!</h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{score}</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {currentChallenge + (challengeComplete ? 1 : 0)} / {challenges.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Challenges</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(((currentChallenge + (challengeComplete ? 1 : 0)) / challenges.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">
                      {formatTime(900 - timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setGameState('menu')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Play Again
              </Button>
              <Button variant="outline" onClick={() => router.push('/games')}>
                Back to Games
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}