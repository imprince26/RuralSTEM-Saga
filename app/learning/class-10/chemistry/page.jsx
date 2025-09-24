"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Lightbulb,
  Target,
  Star,
  Clock,
  FlaskConical,
  Eye,
  Atom
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function Class10ChemistryPage() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const chemistryTopics = [
    {
      id: 'acids-bases-salts',
      title: 'Acids, Bases and Salts',
      description: 'Properties, reactions, and everyday applications of acids and bases',
      difficulty: 'Medium',
      points: 140,
      duration: '38 min',
      completed: false,
      concepts: ['Acid Properties', 'Base Properties', 'pH Scale', 'Salt Formation', 'Indicators'],
      realWorld: 'Food preservation, cleaning products, medicine, and industrial processes!'
    },
    {
      id: 'metals-non-metals',
      title: 'Metals and Non-metals',
      description: 'Physical and chemical properties, reactivity series, and extraction',
      difficulty: 'Medium',
      points: 135,
      duration: '36 min',
      completed: false,
      concepts: ['Metallic Properties', 'Non-metallic Properties', 'Reactivity Series', 'Extraction Methods'],
      realWorld: 'Construction materials, electronics, jewelry, and industrial manufacturing!'
    },
    {
      id: 'carbon-compounds',
      title: 'Carbon and its Compounds',
      description: 'Covalent bonding, hydrocarbons, and functional groups',
      difficulty: 'Hard',
      points: 150,
      duration: '42 min',
      completed: false,
      concepts: ['Covalent Bonding', 'Hydrocarbons', 'Functional Groups', 'Organic Chemistry Basics'],
      realWorld: 'Fuels, plastics, medicines, food additives, and petrochemicals!'
    },
    {
      id: 'periodic-classification',
      title: 'Periodic Classification of Elements',
      description: 'Modern periodic table, trends, and element properties',
      difficulty: 'Medium',
      points: 130,
      duration: '35 min',
      completed: false,
      concepts: ['Periodic Table', 'Periodic Trends', 'Groups & Periods', 'Element Properties'],
      realWorld: 'Material science, drug discovery, semiconductor technology, and research!'
    },
    {
      id: 'life-processes-chemical',
      title: 'Life Processes (Chemical Aspects)',
      description: 'Respiration, photosynthesis, and chemical reactions in living beings',
      difficulty: 'Hard',
      points: 145,
      duration: '40 min',
      completed: false,
      concepts: ['Photosynthesis', 'Respiration', 'Enzyme Action', 'Biochemical Reactions'],
      realWorld: 'Agriculture, medicine, biotechnology, and understanding life itself!'
    }
  ];

  const completionRate = (completedTopics.size / chemistryTopics.length) * 100;

  const handleTopicComplete = (topicId, points) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    addPoints(points);
    updateGameProgress(`class-10-chemistry-${topicId}`, 100);
    celebrateCorrectAnswer();
  };

  const TopicCard = ({ topic }) => {
    const isCompleted = completedTopics.has(topic.id);
    
    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getDifficultyColor(topic.difficulty)}>
              {topic.difficulty}
            </Badge>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold">
            {topic.title}
          </CardTitle>
          
          <CardDescription>
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>{topic.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              <span>{topic.points} pts</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Concepts:</h4>
            <div className="flex flex-wrap gap-1">
              {topic.concepts.map((concept, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Real World:</h4>
            <p className="text-sm text-green-700 dark:text-green-300">{topic.realWorld}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              disabled={true} // Will enable when individual topic pages are created
            >
              <Play className="mr-2 h-4 w-4" />
              {isCompleted ? 'Review' : 'Explore Chemistry'}
            </Button>
          </div>
        </CardContent>
      </Card>
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
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            <FlaskConical className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 10 Chemistry
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Discover the molecular world and chemical reactions around us
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.size} of {chemistryTopics.length} topics completed
            </p>
          </div>
        </div>
      </div>

      {/* Chemistry Concepts Info */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Atom className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Chemistry: The Central Science
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Explore atoms, molecules, and the amazing reactions that power our world!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chemistryTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Achievement Section */}
      {completedTopics.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-6 w-6 text-green-600" />
              Chemistry Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTopics.size}</div>
                <div className="text-sm text-muted-foreground">Chemistry Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Array.from(completedTopics).reduce((total, id) => {
                    const topic = chemistryTopics.find(t => t.id === id);
                    return total + (topic?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Chemistry Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Chemistry Mastery</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}