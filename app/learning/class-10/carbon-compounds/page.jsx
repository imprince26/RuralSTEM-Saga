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
  Beaker,
  Atom,
  FlaskConical
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function CarbonCompoundsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Carbon compounds concepts
  const concepts = {
    'carbon-bonding': {
      title: 'Carbon and its Bonding',
      description: 'Understanding carbon\'s unique bonding properties',
      content: {
        valency: {
          value: 4,
          explanation: 'Carbon has 4 valence electrons, can form 4 covalent bonds',
          arrangement: 'Tetrahedral arrangement in sp³ hybridization'
        },
        bondTypes: [
          { type: 'Single Bond', symbol: 'C-C', example: 'Ethane (C₂H₆)' },
          { type: 'Double Bond', symbol: 'C=C', example: 'Ethene (C₂H₄)' },
          { type: 'Triple Bond', symbol: 'C≡C', example: 'Ethyne (C₂H₂)' }
        ],
        properties: [
          'Forms stable compounds',
          'Shows catenation (self-linking)',
          'Forms chains, rings, and branches',
          'Small size allows strong bonds'
        ]
      }
    },
    'hydrocarbons': {
      title: 'Hydrocarbons',
      description: 'Compounds containing only carbon and hydrogen',
      content: {
        saturated: {
          name: 'Alkanes (Saturated)',
          formula: 'CₙH₂ₙ₊₂',
          bonding: 'Only single bonds',
          examples: [
            { name: 'Methane', formula: 'CH₄', carbons: 1 },
            { name: 'Ethane', formula: 'C₂H₆', carbons: 2 },
            { name: 'Propane', formula: 'C₃H₈', carbons: 3 },
            { name: 'Butane', formula: 'C₄H₁₀', carbons: 4 }
          ]
        },
        unsaturated: {
          alkenes: {
            name: 'Alkenes',
            formula: 'CₙH₂ₙ',
            bonding: 'One double bond',
            examples: ['Ethene (C₂H₄)', 'Propene (C₃H₆)']
          },
          alkynes: {
            name: 'Alkynes',
            formula: 'CₙH₂ₙ₋₂',
            bonding: 'One triple bond',
            examples: ['Ethyne (C₂H₂)', 'Propyne (C₃H₄)']
          }
        }
      }
    },
    'functional-groups': {
      title: 'Functional Groups',
      description: 'Specific arrangements of atoms that determine compound properties',
      content: {
        alcohol: {
          name: 'Alcohol',
          group: '-OH',
          formula: 'R-OH',
          example: 'Ethanol (C₂H₅OH)',
          properties: ['Soluble in water', 'Higher boiling point']
        },
        aldehyde: {
          name: 'Aldehyde',
          group: '-CHO',
          formula: 'R-CHO',
          example: 'Formaldehyde (HCHO)',
          properties: ['Pleasant smell', 'Reducing agent']
        },
        ketone: {
          name: 'Ketone',
          group: '>C=O',
          formula: 'R-CO-R\'',
          example: 'Acetone (CH₃COCH₃)',
          properties: ['Good solvent', 'Sweet smell']
        },
        carboxylicAcid: {
          name: 'Carboxylic Acid',
          group: '-COOH',
          formula: 'R-COOH',
          example: 'Acetic acid (CH₃COOH)',
          properties: ['Acidic nature', 'Sour taste']
        }
      }
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'What is the molecular formula of butane?',
      options: ['C₄H₈', 'C₄H₁₀', 'C₄H₆', 'C₄H₁₂'],
      correct: 'C₄H₁₀',
      explanation: 'Butane is an alkane with 4 carbons. Using CₙH₂ₙ₊₂: C₄H₁₀'
    },
    {
      question: 'Which functional group is present in alcohols?',
      options: ['-CHO', '-COOH', '-OH', '>C=O'],
      correct: '-OH',
      explanation: 'Alcohols contain the hydroxyl group (-OH) as their functional group'
    },
    {
      question: 'How many bonds can carbon form?',
      options: ['2', '3', '4', '5'],
      correct: '4',
      explanation: 'Carbon has 4 valence electrons and can form 4 covalent bonds'
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
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
            {concept.title}
          </h3>
          <p className="text-green-600 dark:text-green-300">{concept.description}</p>
        </div>

        {/* Concept-specific visualizations */}
        {conceptKey === 'carbon-bonding' && (
          <div className="space-y-6">
            {/* Carbon structure */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-center">Carbon Atom Structure</h4>
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  {/* Nucleus */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">
                    C
                  </div>
                  {/* Electrons */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-center text-sm">Carbon has 4 valence electrons</p>
            </div>

            {/* Bond types */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Types of Carbon Bonds</h4>
              <div className="space-y-3">
                {concept.content.bondTypes.map((bond, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium">{bond.type}</span>
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm">{bond.symbol}</code>
                    <span className="text-sm">{bond.example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Properties */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Carbon Properties</h4>
              <ul className="space-y-2">
                {concept.content.properties.map((prop, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{prop}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {conceptKey === 'hydrocarbons' && (
          <div className="space-y-6">
            {/* Saturated hydrocarbons */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
                Saturated Hydrocarbons (Alkanes)
              </h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded mb-3">
                <p className="text-center"><strong>General Formula:</strong> {concept.content.saturated.formula}</p>
              </div>
              <div className="grid gap-2">
                {concept.content.saturated.examples.map((compound, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span>{compound.name}</span>
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{compound.formula}</code>
                    <span className="text-sm">C: {compound.carbons}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unsaturated hydrocarbons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">Alkenes</h4>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded mb-2">
                  <p><strong>Formula:</strong> {concept.content.unsaturated.alkenes.formula}</p>
                  <p><strong>Bonding:</strong> {concept.content.unsaturated.alkenes.bonding}</p>
                </div>
                <ul className="text-sm space-y-1">
                  {concept.content.unsaturated.alkenes.examples.map((ex, i) => (
                    <li key={i}>• {ex}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-orange-700 dark:text-orange-300">Alkynes</h4>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded mb-2">
                  <p><strong>Formula:</strong> {concept.content.unsaturated.alkynes.formula}</p>
                  <p><strong>Bonding:</strong> {concept.content.unsaturated.alkynes.bonding}</p>
                </div>
                <ul className="text-sm space-y-1">
                  {concept.content.unsaturated.alkynes.examples.map((ex, i) => (
                    <li key={i}>• {ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {conceptKey === 'functional-groups' && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {Object.entries(concept.content).map(([key, group]) => (
                <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <FlaskConical className="h-5 w-5 text-red-500" />
                    <h4 className="font-semibold text-lg">{group.name}</h4>
                    <code className="bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded text-sm">
                      {group.group}
                    </code>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-2"><strong>General Formula:</strong> {group.formula}</p>
                      <p className="text-sm mb-2"><strong>Example:</strong> {group.example}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Properties:</p>
                      <ul className="text-sm space-y-1">
                        {group.properties.map((prop, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-300">• {prop}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
            <Badge className="bg-green-100 text-green-800">
              <Beaker className="h-3 w-3 mr-1" />
              Chemistry
            </Badge>
            <Badge variant="outline">Class 10</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Carbon and its Compounds
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Explore the world of organic chemistry and carbon compounds
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
                <span className="text-gold-600 font-semibold">Carbon Chemistry Mastered!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}