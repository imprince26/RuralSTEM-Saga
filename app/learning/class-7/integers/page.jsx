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
  Calculator,
  Sparkles
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function IntegersPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Integer concepts
  const concepts = {
    'introduction': {
      title: 'Introduction to Integers',
      description: 'Understanding positive and negative numbers',
      content: {
        definition: 'Integers are whole numbers that can be positive, negative, or zero',
        examples: ['Positive integers: +1, +2, +3, ...', 'Negative integers: -1, -2, -3, ...', 'Zero: 0'],
        numberLine: 'On a number line, positive integers are to the right of zero, negative integers are to the left'
      }
    },
    'operations': {
      title: 'Operations with Integers',
      description: 'Adding, subtracting, multiplying, and dividing integers',
      content: {
        addition: {
          sameSign: 'Same signs: Add absolute values, keep the sign',
          differentSign: 'Different signs: Subtract smaller from larger, take sign of larger'
        },
        subtraction: 'Subtracting = Adding the opposite',
        multiplication: {
          sameSign: 'Same signs: Result is positive',
          differentSign: 'Different signs: Result is negative'
        },
        division: 'Same rules as multiplication for signs'
      }
    },
    'properties': {
      title: 'Properties of Integers',
      description: 'Important properties that integers follow',
      content: [
        'Closure: Sum/Product of integers is an integer',
        'Commutative: a + b = b + a, a × b = b × a',
        'Associative: (a + b) + c = a + (b + c)',
        'Identity: a + 0 = a, a × 1 = a',
        'Additive inverse: a + (-a) = 0'
      ]
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'What is (-5) + (+3)?',
      options: ['-8', '-2', '+2', '+8'],
      correct: '-2',
      explanation: 'Different signs: |5| - |3| = 2, take sign of larger number (negative), so -2'
    },
    {
      question: 'Calculate (-4) × (-6)',
      options: ['-24', '+24', '-10', '+10'],
      correct: '+24',
      explanation: 'Same signs (both negative): result is positive. 4 × 6 = 24, so +24'
    },
    {
      question: 'What is the additive inverse of -7?',
      options: ['-7', '+7', '0', '1'],
      correct: '+7',
      explanation: 'Additive inverse of a number is the number that when added gives 0. (-7) + (+7) = 0'
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
      addPoints(85);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(concepts).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 12);
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
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
            {concept.title}
          </h3>
          <p className="text-blue-600 dark:text-blue-300">{concept.description}</p>
        </div>

        {/* Number line visualization */}
        {conceptKey === 'introduction' && (
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Number Line:</h4>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center">
                  <span className="text-red-500 font-bold">-3</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-red-500 font-bold">-2</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-red-500 font-bold">-1</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-gray-800 dark:text-gray-200 font-bold text-lg">0</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-green-500 font-bold">1</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-green-500 font-bold">2</span>
                  <div className="w-8 h-0.5 bg-gray-400 mx-2"></div>
                  <span className="text-green-500 font-bold">3</span>
                </div>
              </div>
              <p className="text-sm text-center">{concept.content.numberLine}</p>
            </div>
          </div>
        )}

        {/* Content display */}
        <div className="space-y-4">
          {conceptKey === 'introduction' && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Definition:</h4>
                <p className="text-sm">{concept.content.definition}</p>
              </div>
              <div className="grid gap-3">
                {concept.content.examples.map((example, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded">
                    <span className="text-sm">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {conceptKey === 'operations' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Addition Rules:</h4>
                <p className="text-sm mb-1"><strong>Same signs:</strong> {concept.content.addition.sameSign}</p>
                <p className="text-sm"><strong>Different signs:</strong> {concept.content.addition.differentSign}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Subtraction:</h4>
                <p className="text-sm">{concept.content.subtraction}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Multiplication & Division:</h4>
                <p className="text-sm mb-1"><strong>Same signs:</strong> {concept.content.multiplication.sameSign}</p>
                <p className="text-sm mb-1"><strong>Different signs:</strong> {concept.content.multiplication.differentSign}</p>
                <p className="text-sm">{concept.content.division}</p>
              </div>
            </div>
          )}

          {conceptKey === 'properties' && (
            <div className="grid gap-3">
              {concept.content.map((property, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <span className="text-sm">{property}</span>
                </div>
              ))}
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
                className="p-4 text-left font-mono"
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
                {practiceAnswer === problem.correct ? '✅ Correct!' : '❌ Incorrect'}
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
            Back to Class 7
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Calculator className="h-3 w-3 mr-1" />
              Mathematics
            </Badge>
            <Badge variant="outline">Class 7</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Integers
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Learn about positive and negative whole numbers
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
                <span className="text-gold-600 font-semibold">Theorem Completed!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}