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
  Hammer,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import confetti from 'canvas-confetti';

export default function BridgeBuilder() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateGameProgress, addPoints } = useGameStore();

  // Game State
  const [gameState, setGameState] = useState('menu'); // menu, building, testing, completed
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [materials, setMaterials] = useState({});
  const [bridgeDesign, setBridgeDesign] = useState([]);
  const [testResult, setTestResult] = useState(null);
  const [budget, setBudget] = useState(1000);
  const [usedBudget, setUsedBudget] = useState(0);

  const levels = [
    {
      id: 1,
      name: "Simple Span",
      description: "Build a simple bridge across a 50m river",
      gap: 50,
      maxWeight: 500,
      budget: 1000,
      difficulty: "easy",
      requirements: "Bridge must span 50 meters and support 500kg"
    },
    {
      id: 2,
      name: "Heavy Load",
      description: "Build a stronger bridge for heavy vehicles",
      gap: 75,
      maxWeight: 2000,
      budget: 1500,
      difficulty: "medium",
      requirements: "Bridge must span 75 meters and support 2000kg"
    },
    {
      id: 3,
      name: "Long Distance",
      description: "Build a bridge across a wide valley",
      gap: 120,
      maxWeight: 1500,
      budget: 2000,
      difficulty: "hard",
      requirements: "Bridge must span 120 meters and support 1500kg"
    }
  ];

  const materialTypes = {
    steel: {
      name: "Steel Beam",
      cost: 100,
      strength: 500,
      weight: 50,
      length: 10,
      icon: "🔩"
    },
    concrete: {
      name: "Concrete Block",
      cost: 50,
      strength: 300,
      weight: 100,
      length: 5,
      icon: "🧱"
    },
    wood: {
      name: "Wood Plank",
      cost: 25,
      strength: 100,
      weight: 20,
      length: 8,
      icon: "🪵"
    },
    cable: {
      name: "Steel Cable",
      cost: 150,
      strength: 800,
      weight: 10,
      length: 20,
      icon: "🔗"
    },
    support: {
      name: "Support Pillar",
      cost: 200,
      strength: 1000,
      weight: 200,
      length: 0,
      icon: "🏛️"
    }
  };

  const currentLevel_data = levels[currentLevel];

  // Initialize game
  const startGame = () => {
    setGameState('building');
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(1200);
    setBudget(levels[0].budget);
    setUsedBudget(0);
    setMaterials({
      steel: 0,
      concrete: 0,
      wood: 0,
      cable: 0,
      support: 0
    });
    setBridgeDesign([]);
    setTestResult(null);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'building' && timeLeft > 0) {
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

  // Add material to inventory
  const buyMaterial = (materialType) => {
    const material = materialTypes[materialType];
    const totalCost = usedBudget + material.cost;
    
    if (totalCost <= budget) {
      setMaterials(prev => ({
        ...prev,
        [materialType]: prev[materialType] + 1
      }));
      setUsedBudget(totalCost);
    }
  };

  // Add material to bridge design
  const addToBridge = (materialType) => {
    if (materials[materialType] > 0) {
      setMaterials(prev => ({
        ...prev,
        [materialType]: prev[materialType] - 1
      }));
      setBridgeDesign(prev => [...prev, materialType]);
    }
  };

  // Remove material from bridge design
  const removeFromBridge = (index) => {
    const materialType = bridgeDesign[index];
    setBridgeDesign(prev => prev.filter((_, i) => i !== index));
    setMaterials(prev => ({
      ...prev,
      [materialType]: prev[materialType] + 1
    }));
  };

  // Calculate bridge statistics
  const calculateBridgeStats = () => {
    let totalLength = 0;
    let totalStrength = 0;
    let totalWeight = 0;
    let supportCount = 0;

    bridgeDesign.forEach(materialType => {
      const material = materialTypes[materialType];
      totalLength += material.length;
      totalStrength += material.strength;
      totalWeight += material.weight;
      if (materialType === 'support') supportCount++;
    });

    // Strength bonus for supports
    const strengthBonus = supportCount * 200;
    totalStrength += strengthBonus;

    return {
      length: totalLength,
      strength: totalStrength,
      weight: totalWeight,
      supports: supportCount
    };
  };

  // Test the bridge
  const testBridge = () => {
    setGameState('testing');
    
    const stats = calculateBridgeStats();
    const level = currentLevel_data;
    
    const lengthOk = stats.length >= level.gap;
    const strengthOk = stats.strength >= level.maxWeight;
    const budgetOk = usedBudget <= budget;
    
    const success = lengthOk && strengthOk && budgetOk;
    
    setTestResult({
      success,
      lengthOk,
      strengthOk,
      budgetOk,
      stats,
      feedback: success ? 
        "🎉 Bridge passed all tests! Excellent engineering!" :
        "⚠️ Bridge failed some requirements. Try again!"
    });

    if (success) {
      // Calculate score based on efficiency
      const budgetEfficiency = (budget - usedBudget) / budget;
      const strengthEfficiency = Math.min(stats.strength / level.maxWeight, 2);
      const bonusPoints = Math.round((budgetEfficiency + strengthEfficiency) * 100);
      const levelPoints = level.difficulty === 'easy' ? 200 : level.difficulty === 'medium' ? 350 : 500;
      
      const totalPoints = levelPoints + bonusPoints;
      setScore(prev => prev + totalPoints);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Move to next level after delay
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          nextLevel();
        } else {
          finishGame();
        }
      }, 3000);
    }
  };

  const nextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    const newLevel = levels[currentLevel + 1];
    setBudget(newLevel.budget);
    setUsedBudget(0);
    setMaterials({
      steel: 0,
      concrete: 0,
      wood: 0,
      cable: 0,
      support: 0
    });
    setBridgeDesign([]);
    setTestResult(null);
    setGameState('building');
  };

  const finishGame = () => {
    setGameState('completed');
    
    // Update game progress
    const progress = ((currentLevel + (testResult?.success ? 1 : 0)) / levels.length) * 100;
    const gameData = {
      gameId: 'bridge-builder',
      progress: Math.min(progress, 100),
      bestScore: score,
      completed: progress >= 100,
      lastPlayed: new Date().toISOString()
    };
    
    updateGameProgress(gameData);
    addPoints(score);

    if (progress >= 100) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const bridgeStats = calculateBridgeStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => router.push('/games')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          
          {(gameState === 'building' || gameState === 'testing') && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Budget:</span>
                <span className={usedBudget > budget ? 'text-red-500' : 'text-green-600'}>
                  ${usedBudget} / ${budget}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Game Menu */}
        {gameState === 'menu' && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <Hammer className="h-16 w-16 mx-auto mb-4 text-orange-500" />
              <h1 className="text-4xl font-bold mb-4">Bridge Builder</h1>
              <p className="text-xl text-muted-foreground">
                Design and test bridge structures that can support heavy loads!
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Engineering Challenge</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                <div className="flex items-center gap-3">
                  <Hammer className="h-5 w-5 text-orange-500" />
                  <span>Design bridges for 3 different scenarios</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Test your bridges under load</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Earn points for efficient designs</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Stay within budget constraints</span>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={startGame} className="px-8">
              Start Building
            </Button>
          </div>
        )}

        {/* Building State */}
        {gameState === 'building' && currentLevel_data && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentLevel_data.name}</h2>
                  <p className="text-muted-foreground">{currentLevel_data.description}</p>
                </div>
                <Badge className={
                  currentLevel_data.difficulty === 'easy' ? 'bg-green-500' :
                  currentLevel_data.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                }>
                  {currentLevel_data.difficulty}
                </Badge>
              </div>
              <Progress 
                value={((currentLevel + 1) / levels.length) * 100} 
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Materials Store */}
              <Card>
                <CardHeader>
                  <CardTitle>Materials Store</CardTitle>
                  <CardDescription>Buy materials for your bridge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(materialTypes).map(([key, material]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{material.icon}</span>
                        <div>
                          <div className="font-medium">{material.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ${material.cost} • {material.strength}kg • {material.length > 0 ? `${material.length}m` : 'Support'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{materials[key]}</span>
                        <Button 
                          size="sm" 
                          onClick={() => buyMaterial(key)}
                          disabled={usedBudget + material.cost > budget}
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bridge Design */}
              <Card>
                <CardHeader>
                  <CardTitle>Bridge Design</CardTitle>
                  <CardDescription>Add materials to build your bridge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(materials).map(([key, count]) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => addToBridge(key)}
                        disabled={count === 0}
                        className="flex flex-col gap-1 h-16"
                      >
                        <span className="text-lg">{materialTypes[key].icon}</span>
                        <span className="text-xs">{count}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Current Bridge:</h4>
                    <div className="flex flex-wrap gap-1 min-h-[40px] border rounded p-2">
                      {bridgeDesign.map((materialType, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromBridge(index)}
                          className="text-lg p-1 h-8 w-8"
                        >
                          {materialTypes[materialType].icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {bridgeDesign.length > 0 && (
                    <Button onClick={testBridge} className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Test Bridge
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Requirements & Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                  <CardDescription>{currentLevel_data.requirements}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Required Length:</span>
                      <span className={bridgeStats.length >= currentLevel_data.gap ? 'text-green-600' : 'text-red-500'}>
                        {bridgeStats.length}m / {currentLevel_data.gap}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Strength:</span>
                      <span className={bridgeStats.strength >= currentLevel_data.maxWeight ? 'text-green-600' : 'text-red-500'}>
                        {bridgeStats.strength}kg / {currentLevel_data.maxWeight}kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bridge Weight:</span>
                      <span>{bridgeStats.weight}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Pillars:</span>
                      <span>{bridgeStats.supports}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Progress:</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm">Length</span>
                        <Progress 
                          value={Math.min((bridgeStats.length / currentLevel_data.gap) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                      <div>
                        <span className="text-sm">Strength</span>
                        <Progress 
                          value={Math.min((bridgeStats.strength / currentLevel_data.maxWeight) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Testing State */}
        {gameState === 'testing' && testResult && (
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              {testResult.success ? (
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
              )}
              <h1 className="text-4xl font-bold mb-4">
                {testResult.success ? 'Bridge Passed!' : 'Bridge Failed'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {testResult.feedback}
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-3 rounded ${testResult.lengthOk ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <div className="font-semibold">Length Test</div>
                    <div className="text-sm">{testResult.stats.length}m / {currentLevel_data.gap}m</div>
                  </div>
                  <div className={`p-3 rounded ${testResult.strengthOk ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <div className="font-semibold">Strength Test</div>
                    <div className="text-sm">{testResult.stats.strength}kg / {currentLevel_data.maxWeight}kg</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!testResult.success && (
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setGameState('building')}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => router.push('/games')}>
                  Back to Games
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Game Completed */}
        {gameState === 'completed' && (
          <div className="text-center max-w-2xl mx-auto">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl font-bold mb-4">Engineering Complete!</h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">{score}</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {currentLevel + (testResult?.success ? 1 : 0)} / {levels.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Levels</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(((currentLevel + (testResult?.success ? 1 : 0)) / levels.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {formatTime(1200 - timeLeft)}
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