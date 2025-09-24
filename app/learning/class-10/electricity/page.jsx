"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  CheckCircle,
  Star,
  Trophy,
  Zap,
  Lightbulb
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function ElectricityPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Electricity concepts
  const concepts = {
    'basic-concepts': {
      title: 'Basic Electrical Concepts',
      description: 'Understanding electric current, voltage, and resistance',
      content: {
        current: {
          definition: 'Electric current is the flow of electric charge',
          formula: 'I = Q/t',
          unit: 'Ampere (A)',
          analogy: 'Like water flowing through a pipe'
        },
        voltage: {
          definition: 'Voltage is the electric potential difference',
          formula: 'V = W/Q',
          unit: 'Volt (V)',
          analogy: 'Like water pressure in pipes'
        },
        resistance: {
          definition: 'Resistance opposes the flow of current',
          formula: 'R = ρL/A',
          unit: 'Ohm (Ω)',
          analogy: 'Like friction in water pipes'
        }
      }
    },
    'ohms-law': {
      title: 'Ohm\'s Law',
      description: 'The fundamental relationship between voltage, current, and resistance',
      content: {
        law: 'V = I × R',
        statement: 'Voltage is directly proportional to current when resistance is constant',
        triangle: {
          top: 'V (Voltage)',
          bottomLeft: 'I (Current)',
          bottomRight: 'R (Resistance)'
        },
        applications: [
          'Calculate unknown electrical quantities',
          'Design electrical circuits',
          'Understand power consumption',
          'Electrical safety calculations'
        ]
      }
    },
    'power-energy': {
      title: 'Electrical Power and Energy',
      description: 'Understanding power consumption and energy calculations',
      content: {
        power: {
          definition: 'Rate of energy consumption or production',
          formulas: ['P = V × I', 'P = I²R', 'P = V²/R'],
          unit: 'Watt (W)'
        },
        energy: {
          definition: 'Total electrical work done',
          formula: 'W = P × t = V × I × t',
          unit: 'Joule (J) or kWh'
        },
        commercialUnit: {
          name: 'Kilowatt-hour (kWh)',
          definition: '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J',
          usage: 'Used in electricity bills'
        }
      }
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'If a bulb draws 2A current at 12V, what is its resistance?',
      options: ['6Ω', '8Ω', '10Ω', '24Ω'],
      correct: '6Ω',
      explanation: 'Using Ohm\'s law: R = V/I = 12V/2A = 6Ω'
    },
    {
      question: 'A 100W bulb operates for 5 hours. How much energy does it consume?',
      options: ['0.5 kWh', '1.0 kWh', '1.5 kWh', '2.0 kWh'],
      correct: '0.5 kWh',
      explanation: 'Energy = Power × Time = 100W × 5h = 500Wh = 0.5 kWh'
    },
    {
      question: 'What happens to current if voltage doubles and resistance remains same?',
      options: ['Halves', 'Remains same', 'Doubles', 'Becomes four times'],
      correct: 'Doubles',
      explanation: 'From V = IR, if V doubles and R is constant, then I also doubles'
    }
  ];

  const totalSteps = Object.keys(concepts).length + practiceProblems.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowAnswer(false);
      setPracticeAnswer('');
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      addPoints(150);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(concepts).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 20);
      setPracticeAnswer(answer);
      setShowAnswer(true);
    } else {
      setPracticeAnswer(answer);
      setShowAnswer(true);
    }
  };

  const ConceptVisualization = ({ conceptKey }) => {
    const concept = concepts[conceptKey];
    
    return (
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
            {concept.title}
          </h3>
          <p className="text-purple-600 dark:text-purple-300">{concept.description}</p>
        </div>

        {/* Circuit diagram */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-3 text-center">Simple Electric Circuit</h4>
          <div className="flex justify-center">
            <div className="relative w-64 h-32">
              {/* Battery */}
              <div className="absolute left-4 top-12 w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                +
              </div>
              <div className="absolute left-4 top-20 w-8 h-2 bg-black"></div>
              <div className="absolute left-4 bottom-12 w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs">
                -
              </div>
              
              {/* Wires */}
              <div className="absolute left-12 top-16 w-32 h-0.5 bg-black"></div>
              <div className="absolute right-12 top-16 w-32 h-0.5 bg-black"></div>  
              <div className="absolute left-12 bottom-16 w-32 h-0.5 bg-black"></div>
              <div className="absolute right-12 bottom-16 w-32 h-0.5 bg-black"></div>
              <div className="absolute right-4 top-16 w-0.5 h-16 bg-black"></div>
              
              {/* Bulb */}
              <div className="absolute right-4 top-12 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                💡
              </div>
            </div>
          </div>
        </div>

        {/* Content display */}
        <div className="space-y-4">
          {conceptKey === 'basic-concepts' && (
            <div className="grid gap-4">
              {Object.entries(concept.content).map(([key, item]) => (
                <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 capitalize">
                    {key === 'current' ? 'Electric Current' : key === 'voltage' ? 'Voltage' : 'Resistance'}
                  </h4>
                  <p className="text-sm mb-2">{item.definition}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                    <code className="text-sm">{item.formula}</code>
                  </div>
                  <p className="text-xs mb-1"><strong>Unit:</strong> {item.unit}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400"><strong>Analogy:</strong> {item.analogy}</p>
                </div>
              ))}
            </div>
          )}

          {conceptKey === 'ohms-law' && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Ohm\'s Law:</h4>
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded text-center mb-3">
                  <code className="text-2xl font-bold">{concept.content.law}</code>
                </div>
                <p className="text-sm">{concept.content.statement}</p>
              </div>

              {/* Ohm's Law Triangle */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-3 text-center">Ohm\'s Law Triangle</h4>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-blue-500 relative">
                      <div className="absolute -top-8 -left-3 text-sm font-bold">V</div>
                      <div className="absolute top-6 -left-8 text-sm font-bold">I</div>
                      <div className="absolute top-6 right-0 text-sm font-bold">R</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-4">Cover the unknown quantity to find the formula</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Applications:</h4>
                <ul className="space-y-1">
                  {concept.content.applications.map((app, index) => (
                    <li key={index} className="text-sm">• {app}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {conceptKey === 'power-energy' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Power</h4>
                  <p className="text-sm mb-2">{concept.content.power.definition}</p>
                  <div className="space-y-1 mb-2">
                    {concept.content.power.formulas.map((formula, index) => (
                      <div key={index} className="bg-orange-100 dark:bg-orange-900/20 p-1 rounded">
                        <code className="text-sm">{formula}</code>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs"><strong>Unit:</strong> {concept.content.power.unit}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Energy</h4>
                  <p className="text-sm mb-2">{concept.content.energy.definition}</p>
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded mb-2">
                    <code className="text-sm">{concept.content.energy.formula}</code>
                  </div>
                  <p className="text-xs"><strong>Unit:</strong> {concept.content.energy.unit}</p>
                </div>
              </div>

              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Commercial Unit: {concept.content.commercialUnit.name}
                </h4>
                <p className="text-sm mb-2">{concept.content.commercialUnit.definition}</p>
                <p className="text-xs">{concept.content.commercialUnit.usage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PracticeProblem = ({ problem, index }) => {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Practice Problem {index + 1}</h3>
          <p className="text-lg mb-6">{problem.question}</p>
          
          <div className="grid grid-cols-2 gap-3">
            {problem.options.map((option, optIndex) => (
              <Button
                key={optIndex}
                variant={practiceAnswer === option ? 
                  (option === problem.correct ? 'default' : 'destructive') : 'outline'
                }
                onClick={() => handlePracticeAnswer(option)}
                disabled={showAnswer}
                className="p-4 text-left"
              >
                {option}
              </Button>
            ))}
          </div>

          {showAnswer && (
            <div className={`mt-4 p-4 rounded-lg ${
              practiceAnswer === problem.correct 
                ? 'bg-green-100 dark:bg-green-900/20 border border-green-200' 
                : 'bg-red-100 dark:bg-red-900/20 border border-red-200'
            }`}>
              <p className="font-semibold">
                {practiceAnswer === problem.correct ? '✅ Excellent!' : '❌ Try again!'}
              </p>
              <p className="text-sm mt-2">{problem.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Class 10
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Physics
            </Badge>
            <Badge variant="outline">Class 10</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Electricity
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Master the fundamentals of electric current, voltage, and power
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {currentStep < Object.keys(concepts).length ? (
          <ConceptVisualization conceptKey={Object.keys(concepts)[currentStep]} />
        ) : (
          <PracticeProblem 
            problem={practiceProblems[currentStep - Object.keys(concepts).length]} 
            index={currentStep - Object.keys(concepts).length}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </div>
          
          <Button 
            onClick={handleNextStep}
            disabled={currentStep >= Object.keys(concepts).length && !showAnswer}
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>

        {/* Score Display */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Score: {score}</span>
            </div>
            {completed && (
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold-500" />
                <span className="text-gold-600 font-semibold">Electricity Mastered!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}