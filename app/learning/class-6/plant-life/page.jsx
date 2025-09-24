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
  Leaf,
  Droplets,
  Sun,
  Sprout
} from 'lucide-react';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer, celebrateTheoremComplete } from '@/lib/confetti';

export default function PlantLifePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('parts');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const { addPoints } = useGameStore();

  // Plant life topics
  const topics = {
    parts: {
      title: 'Parts of a Plant',
      description: 'Learn about different parts of plants and their functions',
      content: [
        { part: 'Roots', function: 'Absorb water and nutrients from soil', example: 'Carrot, radish' },
        { part: 'Stem', function: 'Support plant and transport materials', example: 'Tree trunk, flower stem' },
        { part: 'Leaves', function: 'Make food through photosynthesis', example: 'Mango leaf, grass blade' },
        { part: 'Flowers', function: 'Reproduction and making seeds', example: 'Rose, sunflower' },
        { part: 'Fruits', function: 'Protect seeds and help in dispersal', example: 'Apple, mango' },
        { part: 'Seeds', function: 'Grow into new plants', example: 'Bean seed, corn seed' }
      ]
    },
    photosynthesis: {
      title: 'Photosynthesis',
      description: 'How plants make their own food using sunlight',
      content: [
        { step: '1. Light Absorption', description: 'Leaves absorb sunlight using chlorophyll', importance: 'Energy source' },
        { step: '2. Water Uptake', description: 'Roots absorb water from soil', importance: 'Raw material' },
        { step: '3. CO₂ Intake', description: 'Leaves take in carbon dioxide from air', importance: 'Raw material' },
        { step: '4. Food Production', description: 'Plants make glucose (sugar) and oxygen', importance: 'Food and oxygen' }
      ],
      equation: '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂'
    },
    growth: {
      title: 'Plant Growth',
      description: 'How plants grow and what they need',
      content: [
        { need: 'Sunlight', why: 'For photosynthesis and energy', without: 'Plants become weak and pale' },
        { need: 'Water', why: 'For photosynthesis and transport', without: 'Plants wilt and dry up' },
        { need: 'Air', why: 'For carbon dioxide and oxygen', without: 'Plants cannot make food' },
        { need: 'Nutrients', why: 'For healthy growth and development', without: 'Plants become weak and yellow' }
      ]
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      question: 'Which part of the plant absorbs water from the soil?',
      options: ['Leaves', 'Roots', 'Flowers', 'Fruits'],
      correct: 'Roots',
      explanation: 'Roots are underground parts that absorb water and nutrients from soil.'
    },
    {
      question: 'What do plants produce during photosynthesis?',
      options: ['Only oxygen', 'Only glucose', 'Glucose and oxygen', 'Water and carbon dioxide'],
      correct: 'Glucose and oxygen',
      explanation: 'Plants make glucose (food) and release oxygen during photosynthesis.'
    },
    {
      question: 'What happens to plants without sunlight?',
      options: ['They grow faster', 'They become weak and pale', 'They produce more flowers', 'Nothing changes'],
      correct: 'They become weak and pale',
      explanation: 'Without sunlight, plants cannot make food and become weak and pale.'
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
      addPoints(60);
      celebrateTheoremComplete();
    }
  };

  const handlePracticeAnswer = (answer) => {
    const currentProblem = practiceProblems[currentStep - Object.keys(topics).length];
    if (currentProblem && answer === currentProblem.correct) {
      celebrateCorrectAnswer();
      setScore(score + 10);
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
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
            {topic.title}
          </h3>
          <p className="text-green-600 dark:text-green-300">{topic.description}</p>
        </div>

        {/* Visual representation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {topicKey === 'parts' && (
              <div className="text-6xl">🌱</div>
            )}
            {topicKey === 'photosynthesis' && (
              <div className="flex items-center gap-4 text-4xl">
                <Sun className="h-12 w-12 text-yellow-500" />
                <span>+</span>
                <Droplets className="h-12 w-12 text-blue-500" />
                <span>→</span>
                <Leaf className="h-12 w-12 text-green-500" />
              </div>
            )}
            {topicKey === 'growth' && (
              <div className="flex items-center gap-2 text-4xl">
                <Sprout className="h-12 w-12 text-green-500" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {topicKey === 'parts' && topic.content.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300">{item.part}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.function}</p>
              <p className="text-xs text-primary mt-1">Examples: {item.example}</p>
            </div>
          ))}

          {topicKey === 'photosynthesis' && (
            <div>
              <div className="grid gap-3 mb-4">
                {topic.content.map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">{item.step}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                      {item.importance}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Photosynthesis Equation:</h4>
                <p className="font-mono text-sm">{topic.equation}</p>
              </div>
            </div>
          )}

          {topicKey === 'growth' && topic.content.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300">{item.need}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.why}</p>
              <p className="text-xs text-red-600 dark:text-red-400">Without it: {item.without}</p>
            </div>
          ))}
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
            Back to Class 6
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              <Leaf className="h-3 w-3 mr-1" />
              Science
            </Badge>
            <Badge variant="outline">Class 6</Badge>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Plant Life
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Discover how plants live, grow, and make their own food
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