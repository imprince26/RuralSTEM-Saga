"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Target,
  Star,
  Trophy,
  Calculator,
  TrendingUp,
  Crown,
  Sparkles
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function IntegralsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('basic-integration');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Integration topics
  const topics = {
    'basic-integration': {
      title: 'Basic Integration',
      description: 'Fundamental integration rules and formulas',
      content: {
        definition: 'Integration is the reverse process of differentiation',
        symbol: '∫ f(x) dx = F(x) + C',
        basicRules: [
          { rule: '∫ k dx = kx + C', description: 'Constant rule' },
          { rule: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', description: 'Power rule (n ≠ -1)' },
          { rule: '∫ eˣ dx = eˣ + C', description: 'Exponential function' },
          { rule: '∫ 1/x dx = ln|x| + C', description: 'Natural logarithm' },
          { rule: '∫ sin x dx = -cos x + C', description: 'Sine function' },
          { rule: '∫ cos x dx = sin x + C', description: 'Cosine function' }
        ]
      }
    },
    'integration-techniques': {
      title: 'Integration Techniques',
      description: 'Advanced methods for solving complex integrals',
      content: {
        substitution: {
          name: 'Integration by Substitution',
          formula: '∫ f(g(x))g\'(x) dx = ∫ f(u) du',
          example: '∫ 2x(x² + 1)³ dx, let u = x² + 1'
        },
        byParts: {
          name: 'Integration by Parts',
          formula: '∫ u dv = uv - ∫ v du',
          example: '∫ x eˣ dx, let u = x, dv = eˣ dx'
        },
        partial: {
          name: 'Partial Fractions',
          formula: 'Break rational functions into simpler fractions',
          example: '∫ 1/(x²-1) dx = ∫ [1/2(1/(x-1) - 1/(x+1))] dx'
        }
      }
    },
    'definite-integrals': {
      title: 'Definite Integrals',
      description: 'Computing definite integrals and their applications',
      content: {
        definition: 'Definite integral gives the area under curve from a to b',
        formula: '∫ᵃᵇ f(x) dx = F(b) - F(a)',
        properties: [
          '∫ᵃᵃ f(x) dx = 0',
          '∫ᵃᵇ f(x) dx = -∫ᵇᵃ f(x) dx',
          '∫ᵃᵇ f(x) dx + ∫ᵇᶜ f(x) dx = ∫ᵃᶜ f(x) dx',
          '∫ᵃᵇ [f(x) + g(x)] dx = ∫ᵃᵇ f(x) dx + ∫ᵃᵇ g(x) dx'
        ],
        applications: [
          'Area under curves',
          'Volume of solids of revolution',
          'Arc length calculation',
          'Surface area calculation'
        ]
      }
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'Find ∫ x³ dx',
      options: ['x⁴/4 + C', 'x⁴ + C', '3x² + C', '4x³ + C'],
      correct: 'x⁴/4 + C',
      explanation: 'Using power rule: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, so ∫ x³ dx = x⁴/4 + C'
    },
    {
      question: 'Evaluate ∫₀² x dx',
      options: ['2', '4', '1', '0'],
      correct: '2',
      explanation: '∫₀² x dx = [x²/2]₀² = (2²/2) - (0²/2) = 2 - 0 = 2'
    },
    {
      question: 'Find ∫ sin x dx',
      options: ['cos x + C', '-cos x + C', 'sin x + C', '-sin x + C'],
      correct: '-cos x + C',
      explanation: 'The integral of sin x is -cos x + C (derivative of -cos x is sin x)'
    },
    {
      question: 'Using substitution, find ∫ 2x(x² + 1)² dx',
      options: ['(x² + 1)³/3 + C', '2(x² + 1)³ + C', '(x² + 1)³ + C', 'x(x² + 1)³ + C'],
      correct: '(x² + 1)³/3 + C',
      explanation: 'Let u = x² + 1, then du = 2x dx. ∫ u² du = u³/3 + C = (x² + 1)³/3 + C'
    }
  ];

  const totalSteps = Object.keys(topics).length + practiceProblems.length;
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
      addPoints(230);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(topics).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 25);
      setPracticeAnswer(answer);
      setShowAnswer(true);
    } else {
      setPracticeAnswer(answer);
      setShowAnswer(true);
    }
  };

  const TopicVisualization = ({ topicKey }) => {
    const topic = topics[topicKey];
    
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-gold-500" />
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
              {topic.title}
            </h3>
            <Crown className="h-6 w-6 text-gold-500" />
          </div>
          <p className="text-blue-600 dark:text-blue-300">{topic.description}</p>
        </div>

        {/* Content based on topic */}
        <div className="space-y-6">
          {topicKey === 'basic-integration' && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Definition:</h4>
                <p className="text-sm mb-2">{topic.content.definition}</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <code className="text-lg font-mono">{topic.content.symbol}</code>
                </div>
              </div>
              
              <div className="grid gap-3">
                <h4 className="font-semibold">Basic Integration Rules:</h4>
                {topic.content.basicRules.map((rule, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded mb-2">
                      <code className="font-mono">{rule.rule}</code>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topicKey === 'integration-techniques' && (
            <div className="space-y-4">
              {Object.entries(topic.content).map(([key, technique]) => (
                <div key={key} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    {technique.name}
                  </h4>
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded mb-2">
                    <code className="font-mono text-sm">{technique.formula}</code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Example:</strong> {technique.example}
                  </p>
                </div>
              ))}
            </div>
          )}

          {topicKey === 'definite-integrals' && (
            <div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Definition:</h4>
                <p className="text-sm mb-2">{topic.content.definition}</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-center">
                  <code className="text-lg font-mono">{topic.content.formula}</code>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Properties:</h4>
                  <ul className="space-y-2">
                    {topic.content.properties.map((prop, index) => (
                      <li key={index} className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                        <code className="text-sm font-mono">{prop}</code>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Applications:</h4>
                  <ul className="space-y-2">
                    {topic.content.applications.map((app, index) => (
                      <li key={index} className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-sm">
                        • {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visual graph representation */}
        <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Visual Representation
          </h4>
          <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">∫</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Area under the curve f(x)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PracticeProblem = ({ problem, index }) => {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-gold-500" />
            <h3 className="text-lg font-semibold">Expert Problem {index + 1}</h3>
            <Badge className="bg-red-100 text-red-800">Advanced</Badge>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
            <code className="text-lg font-mono">{problem.question}</code>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {problem.options.map((option, optIndex) => (
              <Button
                key={optIndex}
                variant={practiceAnswer === option ? 
                  (option === problem.correct ? 'default' : 'destructive') : 'outline'
                }
                onClick={() => handlePracticeAnswer(option)}
                disabled={showAnswer}
                className="p-4 text-left justify-start font-mono"
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
                {practiceAnswer === problem.correct ? '✅ Excellent!' : '❌ Not quite right'}
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
            Back to Class 12
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Calculator className="h-3 w-3 mr-1" />
              Mathematics
            </Badge>
            <Badge variant="outline">Class 12</Badge>
            <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
              <Crown className="h-3 w-3" />
              Expert Level
            </Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-gold-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Integrals
            </h1>
            <Sparkles className="h-8 w-8 text-gold-500" />
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Master the art of integration - the reverse of differentiation
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Mastery Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      {/* Expert Level Notice */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-3">
          <Crown className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200">Expert Level Calculus</h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              Integration is a fundamental concept in calculus. Master these techniques for success in advanced mathematics!
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {currentStep < Object.keys(topics).length ? (
          // Topic learning steps
          <TopicVisualization topicKey={Object.keys(topics)[currentStep]} />
        ) : (
          // Practice problems
          <PracticeProblem 
            problem={practiceProblems[currentStep - Object.keys(topics).length]} 
            index={currentStep - Object.keys(topics).length}
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
            disabled={currentStep >= Object.keys(topics).length && !showAnswer}
          >
            {currentStep === totalSteps - 1 ? 'Master Complete!' : 'Next'}
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
                <span className="text-gold-600 font-semibold">Integration Mastered!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}