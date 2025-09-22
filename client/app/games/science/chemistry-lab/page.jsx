"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  FlaskConical,
  Beaker,
  TestTube,
  Thermometer,
  Zap,
  CheckCircle,
  AlertTriangle,
  Trophy,
  Star,
  RefreshCw
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import confetti from 'canvas-confetti';

export default function ChemistryLabGame() {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateGameProgress, addPoints } = useGameStore();

  // Game state
  const [gameState, setGameState] = useState('menu'); // menu, playing, completed
  const [currentExperiment, setCurrentExperiment] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedElements, setSelectedElements] = useState([]);
  const [reactionResult, setReactionResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [experimentsCompleted, setExperimentsCompleted] = useState(0);

  const experiments = [
    {
      id: 'water-formation',
      title: 'Making Water',
      description: 'Combine hydrogen and oxygen to create water',
      requiredElements: ['H', 'H', 'O'],
      result: 'H₂O',
      reaction: '2H₂ + O₂ → 2H₂O',
      explanation: 'Two hydrogen molecules combine with one oxygen molecule to form two water molecules.',
      points: 50,
      safetyTips: ['Always use proper ventilation', 'Wear safety goggles'],
      difficulty: 'easy'
    },
    {
      id: 'salt-formation',
      title: 'Creating Salt',
      description: 'React sodium with chlorine to make table salt',
      requiredElements: ['Na', 'Cl'],
      result: 'NaCl',
      reaction: 'Na + Cl → NaCl',
      explanation: 'Sodium and chlorine react to form sodium chloride (table salt).',
      points: 75,
      safetyTips: ['Handle sodium with care', 'Chlorine is toxic - use fume hood'],
      difficulty: 'medium'
    },
    {
      id: 'carbon-dioxide',
      title: 'Making CO₂',
      description: 'Combine carbon and oxygen to create carbon dioxide',
      requiredElements: ['C', 'O', 'O'],
      result: 'CO₂',
      reaction: 'C + O₂ → CO₂',
      explanation: 'Carbon burns in oxygen to produce carbon dioxide.',
      points: 60,
      safetyTips: ['Ensure good ventilation', 'CO₂ displaces oxygen'],
      difficulty: 'easy'
    },
    {
      id: 'methane-combustion',
      title: 'Burning Methane',
      description: 'Combust methane with oxygen',
      requiredElements: ['C', 'H', 'H', 'H', 'H', 'O', 'O'],
      result: 'CO₂ + H₂O',
      reaction: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      explanation: 'Methane burns in oxygen to produce carbon dioxide and water.',
      points: 100,
      safetyTips: ['Methane is flammable', 'Control the flame carefully'],
      difficulty: 'hard'
    },
    {
      id: 'ammonia-synthesis',
      title: 'Haber Process',
      description: 'Synthesize ammonia from nitrogen and hydrogen',
      requiredElements: ['N', 'N', 'H', 'H', 'H', 'H', 'H', 'H'],
      result: 'NH₃',
      reaction: 'N₂ + 3H₂ → 2NH₃',
      explanation: 'The Haber process combines nitrogen and hydrogen under high pressure to make ammonia.',
      points: 125,
      safetyTips: ['High pressure required', 'Ammonia has strong odor'],
      difficulty: 'hard'
    }
  ];

  const availableElements = [
    { symbol: 'H', name: 'Hydrogen', color: 'bg-red-500' },
    { symbol: 'O', name: 'Oxygen', color: 'bg-blue-500' },
    { symbol: 'C', name: 'Carbon', color: 'bg-gray-700' },
    { symbol: 'N', name: 'Nitrogen', color: 'bg-purple-500' },
    { symbol: 'Na', name: 'Sodium', color: 'bg-yellow-500' },
    { symbol: 'Cl', name: 'Chlorine', color: 'bg-green-500' },
    { symbol: 'Ca', name: 'Calcium', color: 'bg-orange-500' },
    { symbol: 'S', name: 'Sulfur', color: 'bg-yellow-600' }
  ];

  const startGame = () => {
    setCurrentExperiment(0);
    setScore(0);
    setSelectedElements([]);
    setReactionResult(null);
    setShowResult(false);
    setExperimentsCompleted(0);
    setGameState('playing');
  };

  const handleElementSelect = (element) => {
    if (selectedElements.length < 10) { // Limit to prevent overflow
      setSelectedElements(prev => [...prev, element]);
    }
  };

  const clearElements = () => {
    setSelectedElements([]);
    setReactionResult(null);
    setShowResult(false);
  };

  const runExperiment = () => {
    const currentExp = experiments[currentExperiment];
    const required = [...currentExp.requiredElements].sort();
    const selected = [...selectedElements.map(e => e.symbol)].sort();

    const isCorrect = JSON.stringify(required) === JSON.stringify(selected);

    if (isCorrect) {
      setReactionResult('success');
      setScore(prev => prev + currentExp.points);
      
      // Celebration effect
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setReactionResult('error');
    }

    setShowResult(true);

    // Auto-advance after showing result
    setTimeout(() => {
      if (isCorrect) {
        setExperimentsCompleted(prev => prev + 1);
        if (currentExperiment < experiments.length - 1) {
          setCurrentExperiment(prev => prev + 1);
          clearElements();
        } else {
          // Game completed
          setGameState('completed');
          updateGameProgress('chemistry-lab', {
            completed: true,
            progress: 100,
            bestScore: score + currentExp.points
          });
          addPoints(score + currentExp.points);
        }
      } else {
        setShowResult(false);
      }
    }, 3000);
  };

  const currentExp = experiments[currentExperiment] || {};
  const progress = experiments.length > 0 ? (experimentsCompleted / experiments.length) * 100 : 0;

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <FlaskConical className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl">Virtual Chemistry Lab</CardTitle>
              <CardDescription className="text-lg">
                Conduct safe virtual experiments by combining elements to create compounds!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <TestTube className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="font-medium">{experiments.length} Experiments</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Beaker className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                  <p className="font-medium">Element Combining</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <p className="font-medium">Chemical Reactions</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-6 w-6 mx-auto text-orange-600 mb-2" />
                <p className="text-sm text-orange-700">
                  <strong>Safety First!</strong> Always read safety tips before each experiment.
                </p>
              </div>

              <Button size="lg" onClick={startGame} className="w-full">
                <FlaskConical className="h-5 w-5 mr-2" />
                Enter Lab
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <CardTitle className="text-3xl">Lab Session Complete!</CardTitle>
              <CardDescription>
                Excellent work! You've mastered all the experiments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Star className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">{score}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <FlaskConical className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-2xl font-bold">{experimentsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Experiments</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={startGame} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Repeat Experiments
                </Button>
                <Button variant="outline" onClick={() => router.back()} className="w-full">
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => setGameState('menu')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Lab Menu
          </Button>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">
              <Star className="h-3 w-3 mr-1" />
              {score} points
            </Badge>
            <Badge variant="outline">
              {experimentsCompleted}/{experiments.length} complete
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Experiment {currentExperiment + 1}: {currentExp.title}</span>
            <span>Progress: {Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Experiment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                {currentExp.title}
              </CardTitle>
              <CardDescription>{currentExp.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Target Reaction:</p>
                <p className="text-blue-700 font-mono">{currentExp.reaction}</p>
              </div>

              {currentExp.safetyTips && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-orange-800 flex items-center gap-1 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Safety Tips:
                  </p>
                  <ul className="text-sm text-orange-700 space-y-1">
                    {currentExp.safetyTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <Badge className="mb-2">{currentExp.points} points</Badge>
                <Badge variant="outline" className="ml-2">
                  {currentExp.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Laboratory Workspace */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5" />
                Laboratory Workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Elements */}
              <div>
                <p className="text-sm font-medium mb-2">Selected Elements:</p>
                <div className="min-h-16 p-3 border-2 border-dashed border-muted-foreground rounded-lg bg-muted/30">
                  {selectedElements.length === 0 ? (
                    <p className="text-muted-foreground text-center">Drag elements here</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedElements.map((element, index) => (
                        <Badge key={index} className={`${element.color} text-white`}>
                          {element.symbol}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Available Elements */}
              <div>
                <p className="text-sm font-medium mb-2">Available Elements:</p>
                <div className="grid grid-cols-4 gap-2">
                  {availableElements.map((element) => (
                    <Button
                      key={element.symbol}
                      variant="outline"
                      size="sm"
                      onClick={() => handleElementSelect(element)}
                      className="h-12 text-xs flex flex-col"
                    >
                      <span className="font-bold">{element.symbol}</span>
                      <span className="text-xs opacity-70">{element.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={runExperiment} 
                  disabled={selectedElements.length === 0 || showResult}
                  className="flex-1"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Run Experiment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearElements}
                  disabled={selectedElements.length === 0}
                >
                  Clear
                </Button>
              </div>

              {/* Result Display */}
              {showResult && (
                <div className={`p-4 rounded-lg ${
                  reactionResult === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {reactionResult === 'success' ? (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <p className="text-green-800 font-medium">Experiment Successful!</p>
                      <p className="text-green-700 text-sm mt-1">Result: {currentExp.result}</p>
                      <p className="text-green-600 text-xs mt-2">{currentExp.explanation}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                      <p className="text-red-800 font-medium">Incorrect Combination</p>
                      <p className="text-red-700 text-sm mt-1">Try again with the right elements!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}