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
  Calculator,
  Eye,
  Crown,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';
import { celebrateCorrectAnswer } from '@/lib/confetti';

export default function Class12MathematicsPage() {
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const mathematicsTopics = [
    {
      id: 'relations-functions',
      title: 'Relations and Functions',
      description: 'Types of relations, functions, inverse functions, and binary operations',
      difficulty: 'Hard',
      points: 200,
      duration: '45 min',
      completed: false,
      concepts: ['Types of Relations', 'One-to-One Functions', 'Onto Functions', 'Inverse Functions', 'Binary Operations'],
      realWorld: 'Computer programming, database design, mathematical modeling, and data analysis!'
    },
    {
      id: 'inverse-trigonometric',
      title: 'Inverse Trigonometric Functions',
      description: 'Properties and applications of inverse trigonometric functions',
      difficulty: 'Hard',
      points: 190,
      duration: '42 min',
      completed: false,
      concepts: ['arcsin, arccos, arctan', 'Domain & Range', 'Properties', 'Graphs'],
      realWorld: 'Engineering calculations, navigation systems, wave analysis, and physics!'
    },
    {
      id: 'matrices',
      title: 'Matrices',
      description: 'Matrix operations, determinants, inverse, and solving systems',
      difficulty: 'Expert',
      points: 220,
      duration: '50 min',
      completed: false,
      concepts: ['Matrix Operations', 'Determinants', 'Adjoint', 'Inverse Matrix', 'Cramer\'s Rule'],
      realWorld: 'Computer graphics, data science, quantum mechanics, and AI/ML algorithms!'
    },
    {
      id: 'determinants',
      title: 'Determinants',
      description: 'Properties of determinants, minors, cofactors, and applications',
      difficulty: 'Hard',
      points: 195,
      duration: '44 min',
      completed: false,
      concepts: ['Properties of Determinants', 'Minors & Cofactors', 'Adjoint Method', 'Applications'],
      realWorld: 'Linear transformations, solving systems, area calculations, and physics!'
    },
    {
      id: 'continuity-differentiability',
      title: 'Continuity and Differentiability',  
      description: 'Advanced calculus concepts, derivatives, and their applications',
      difficulty: 'Expert',
      points: 230,
      duration: '52 min',
      completed: false,
      concepts: ['Continuity', 'Differentiability', 'Chain Rule', 'Mean Value Theorem'],
      realWorld: 'Physics (motion analysis), economics (optimization), and engineering design!'
    },
    {
      id: 'applications-derivatives',
      title: 'Applications of Derivatives',
      description: 'Rate of change, tangents, normals, maxima, minima, and optimization',
      difficulty: 'Hard',
      points: 210,
      duration: '46 min',
      completed: false,
      concepts: ['Rate of Change', 'Tangents & Normals', 'Maxima & Minima', 'Optimization'],
      realWorld: 'Business optimization, engineering design, cost minimization, and profit maximization!'
    },
    {
      id: 'integrals',
      title: 'Integrals',
      description: 'Integration techniques, definite integrals, and fundamental theorem',
      difficulty: 'Expert',
      points: 240,
      duration: '55 min',
      completed: false,
      concepts: ['Integration Techniques', 'Definite Integrals', 'Fundamental Theorem', 'Properties'],
      realWorld: 'Area calculations, physics (work, energy), probability, and engineering!'
    },
    {
      id: 'applications-integrals',
      title: 'Applications of Integrals',
      description: 'Area under curves, area between curves, and volume calculations',
      difficulty: 'Hard',
      points: 205,
      duration: '45 min',
      completed: false,
      concepts: ['Area Under Curves', 'Area Between Curves', 'Volume of Solids'],
      realWorld: 'Architecture planning, manufacturing design, and scientific calculations!'
    },
    {
      id: 'differential-equations',
      title: 'Differential Equations',
      description: 'Formation and solution of differential equations',
      difficulty: 'Expert',
      points: 250,
      duration: '58 min',
      completed: false,
      concepts: ['Order & Degree', 'General Solutions', 'Particular Solutions', 'Applications'],
      realWorld: 'Population dynamics, radioactive decay, electrical circuits, and growth models!'
    },
    {
      id: 'vector-algebra',
      title: 'Vector Algebra',
      description: 'Vector operations, dot product, cross product, and applications',
      difficulty: 'Hard',
      points: 185,
      duration: '40 min',
      completed: false,
      concepts: ['Vector Operations', 'Dot Product', 'Cross Product', 'Scalar Triple Product'],
      realWorld: 'Physics (forces, fields), computer graphics, navigation, and engineering!'
    },
    {
      id: 'three-dimensional-geometry',
      title: 'Three Dimensional Geometry',
      description: 'Direction ratios, direction cosines, equations of lines and planes',
      difficulty: 'Hard',
      points: 200,
      duration: '44 min',
      completed: false,
      concepts: ['Direction Ratios', 'Direction Cosines', 'Line Equations', 'Plane Equations'],
      realWorld: '3D modeling, architecture, game development, and spatial analysis!'
    },
    {
      id: 'linear-programming',
      title: 'Linear Programming',
      description: 'Mathematical optimization, constraints, and graphical solutions',
      difficulty: 'Medium',
      points: 175,
      duration: '38 min',
      completed: false,
      concepts: ['Objective Function', 'Constraints', 'Feasible Region', 'Optimization'],
      realWorld: 'Resource allocation, production planning, transportation, and business optimization!'
    },
    {
      id: 'probability',
      title: 'Probability',
      description: 'Conditional probability, Bayes\' theorem, and random variables',
      difficulty: 'Hard',
      points: 190,
      duration: '42 min',
      completed: false,
      concepts: ['Conditional Probability', 'Bayes\' Theorem', 'Random Variables', 'Distributions'],
      realWorld: 'Statistics, data science, machine learning, insurance, and research!'
    }
  ];

  const completionRate = (completedTopics.size / mathematicsTopics.length) * 100;

  const handleTopicComplete = (topicId, points) => {
    setCompletedTopics(prev => new Set([...prev, topicId]));
    addPoints(points);
    updateGameProgress(`class-12-mathematics-${topicId}`, 100);
    celebrateCorrectAnswer();
  };

  const TopicCard = ({ topic }) => {
    const isCompleted = completedTopics.has(topic.id);
    
    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-orange-100 text-orange-800';
        case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'hover:scale-105'
      } ${topic.difficulty === 'Expert' ? 'border-red-300 shadow-md' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(topic.difficulty)}>
                {topic.difficulty}
              </Badge>
              {topic.difficulty === 'Expert' && (
                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Expert
                </Badge>
              )}
            </div>
            {isCompleted && <CheckCircle className="h-5 w-5 text-blue-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {topic.title}
            {topic.points >= 220 && <Sparkles className="h-4 w-4 text-yellow-500" />}
          </CardTitle>
          
          <CardDescription>
            {topic.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                {topic.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-yellow-600">{topic.points} pts</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Advanced Concepts:</h4>
            <div className="flex flex-wrap gap-1">
              {topic.concepts.map((concept, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Real World Applications:</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">{topic.realWorld}</p>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              disabled={true} // Will enable when individual topic pages are created
            >
              <Play className="mr-2 h-4 w-4" />
              {isCompleted ? 'Review' : 'Master'}
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
            Back to Class 12
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            <Calculator className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 12 Mathematics
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Master advanced mathematical concepts for competitive exams and higher studies
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Mastery Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTopics.size} of {mathematicsTopics.length} advanced topics mastered
            </p>
          </div>
        </div>
      </div>

      {/* Expert Level Notice */}
      <Card className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 flex items-center gap-2">
                Advanced Mathematics
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                These topics represent the pinnacle of school mathematics. Master them for JEE, NEET, and other competitive exams!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mathematicsTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Achievement Section */}
      {completedTopics.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-blue-600" />
              Advanced Mathematics Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completedTopics.size}</div>
                <div className="text-sm text-muted-foreground">Advanced Topics Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Array.from(completedTopics).reduce((total, id) => {
                    const topic = mathematicsTopics.find(t => t.id === id);
                    return total + (topic?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Premium Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Mathematics Mastery</div>
              </div>
            </div>
            
            {completionRate === 100 && (
              <div className="mt-4 p-4 bg-gold-100 dark:bg-gold-900/30 rounded-lg text-center">
                <h3 className="font-bold text-gold-800 dark:text-gold-200 flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  Congratulations! Mathematics Master!
                  <Crown className="h-5 w-5" />
                </h3>
                <p className="text-sm text-gold-700 dark:text-gold-300 mt-2">
                  You have conquered all advanced mathematics topics. Ready for any competitive exam!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}