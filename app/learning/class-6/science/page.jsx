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
  Microscope,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function Class6SciencePage() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const scienceTopics = [
    {
      id: 'food-components',
      title: 'Food: Where Does It Come From?',
      description: 'Sources of food, plant and animal products',
      difficulty: 'Easy',
      points: 65,
      duration: '22 min',
      completed: false,
      concepts: ['Food Sources', 'Plant Products', 'Animal Products', 'Food Chain'],
      realWorld: 'Understanding nutrition, farming, and food production!'
    },
    {
      id: 'components-of-food',
      title: 'Components of Food',
      description: 'Nutrients, balanced diet, and deficiency diseases',
      difficulty: 'Easy',
      points: 70,
      duration: '25 min',
      completed: false,
      concepts: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins', 'Minerals'],
      realWorld: 'Healthy eating, meal planning, and preventing diseases!'
    },
    {
      id: 'fibre-to-fabric',
      title: 'Fibre to Fabric',
      description: 'Natural and synthetic fibres, fabric making process',
      difficulty: 'Easy',
      points: 75,
      duration: '28 min',
      completed: false,
      concepts: ['Natural Fibres', 'Synthetic Fibres', 'Spinning', 'Weaving'],
      realWorld: 'Clothing industry, textile manufacturing, and material science!'
    },
    {
      id: 'sorting-materials',
      title: 'Sorting Materials into Groups',
      description: 'Properties of materials, grouping, and classification',
      difficulty: 'Easy',
      points: 70,
      duration: '24 min',
      completed: false,
      concepts: ['Material Properties', 'Classification', 'Transparency', 'Solubility'],
      realWorld: 'Recycling, material selection, and everyday object identification!'
    },
    {
      id: 'changes-around-us',
      title: 'Changes Around Us',
      description: 'Physical and chemical changes, reversible and irreversible changes',
      difficulty: 'Medium',
      points: 80,
      duration: '30 min',
      completed: false,
      concepts: ['Physical Changes', 'Chemical Changes', 'Reversible Changes', 'Irreversible Changes'],
      realWorld: 'Cooking, weather changes, and industrial processes!'
    },
    {
      id: 'getting-to-know-plants',
      title: 'Getting to Know Plants',
      description: 'Plant parts, their functions, and types of plants',
      difficulty: 'Medium',
      points: 85,
      duration: '32 min',
      completed: false,
      concepts: ['Plant Parts', 'Root System', 'Shoot System', 'Leaf Functions'],
      realWorld: 'Gardening, agriculture, and understanding nature!'
    },
    {
      id: 'body-movements',
      title: 'Body Movements',
      description: 'Human body joints, bones, and movement mechanisms',
      difficulty: 'Medium',
      points: 80,
      duration: '30 min',
      completed: false,
      concepts: ['Joints', 'Bones', 'Muscles', 'Movement'],
      realWorld: 'Sports, exercise, health, and understanding our body!'
    },
    {
      id: 'living-non-living',
      title: 'The Living Organisms and Their Surroundings',
      description: 'Characteristics of living things, habitats, and adaptations',
      difficulty: 'Easy',
      points: 75,
      duration: '28 min',
      completed: false,
      concepts: ['Living Characteristics', 'Habitats', 'Adaptations', 'Environment'],
      realWorld: 'Wildlife conservation, ecosystem understanding, and biodiversity!'
    }
  ];

  const completionRate = (completedTopics.size / scienceTopics.length) * 100;

  const handleTopicComplete = (topicId, points) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    addPoints(points);
    updateGameProgress(`class-6-science-${topicId}`, 100);
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
              {isCompleted ? 'Review' : 'Start Learning'}
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
            Back to Class 6
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            <Microscope className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 6 Science
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Explore the fascinating world of science through observation and discovery
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.size} of {scienceTopics.length} topics completed
            </p>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scienceTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Achievement Section */}
      {completedTopics.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-6 w-6 text-green-600" />
              Science Exploration Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTopics.size}</div>
                <div className="text-sm text-muted-foreground">Topics Explored</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Array.from(completedTopics).reduce((total, id) => {
                    const topic = scienceTopics.find(t => t.id === id);
                    return total + (topic?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Discovery Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Science Mastery</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}