"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  BookOpen,
  Calculator,
  FlaskConical,
  Zap,
  Play,
  Trophy,
  Clock,
  Star,
  CheckCircle,
  Eye,
  Lightbulb,
  Target,
  Atom
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function Class9Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'number-systems',
        title: 'Number Systems',
        description: 'Real numbers, rational and irrational numbers, laws of exponents',
        difficulty: 'Medium',
        points: 120,
        duration: '25 min',
        concept: 'Numbers can be classified into different systems. Real numbers include both rational and irrational numbers.',
        visualization: {
          type: 'number-system-tree',
          description: 'Interactive tree showing classification of numbers'
        },
        examples: [
          'Rational: 1/2, 0.75, -3',
          'Irrational: √2, π, √3',
          'Laws of exponents: aᵐ × aⁿ = aᵐ⁺ⁿ'
        ],
        realWorld: 'Measurements, calculations, and computer systems use different number types!'
      },
      {
        id: 'polynomials',
        title: 'Polynomials',
        description: 'Degree of polynomials, factorization, and algebraic identities',
        difficulty: 'Hard',
        points: 130,
        duration: '28 min',
        concept: 'Polynomials are expressions with variables raised to whole number powers. They can be factored using identities.',
        visualization: {
          type: 'polynomial-grapher',
          description: 'Interactive graphing tool for polynomial functions'
        },
        examples: [
          'Linear: 2x + 3 (degree 1)',
          'Quadratic: x² - 5x + 6 (degree 2)',
          'Factoring: x² - 4 = (x+2)(x-2)'
        ],
        realWorld: 'Physics equations, engineering calculations, and economic models use polynomials!'
      },
      {
        id: 'coordinate-geometry',
        title: 'Coordinate Geometry',
        description: 'Cartesian plane, distance formula, section formula',
        difficulty: 'Medium',
        points: 115,
        duration: '23 min',
        concept: 'Points can be located on a plane using coordinates. This helps solve geometric problems algebraically.',
        visualization: {
          type: 'coordinate-plotter',
          description: 'Interactive coordinate plane with plotting tools'
        },
        examples: [
          'Distance formula: √[(x₂-x₁)² + (y₂-y₁)²]',
          'Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)',
          'Point (3,4) is 5 units from origin'
        ],
        realWorld: 'GPS navigation, computer graphics, architecture, and map-making!'
      },
      {
        id: 'linear-equations-two-variables',
        title: 'Linear Equations in Two Variables',
        description: 'Graphing linear equations, solutions, and applications',
        difficulty: 'Medium',
        points: 125,
        duration: '26 min',
        concept: 'Equations with two variables represent lines on a coordinate plane. Their intersections give solutions.',
        visualization: {
          type: 'linear-equation-grapher',
          description: 'Interactive tool to graph and solve linear equations'
        },
        examples: [
          '2x + 3y = 6 represents a straight line',
          'Slope-intercept form: y = mx + c',
          'Parallel lines have same slope'
        ],
        realWorld: 'Business planning, resource allocation, and optimization problems!'
      },
      {
        id: 'euclids-geometry',
        title: 'Introduction to Euclid\'s Geometry',
        description: 'Axioms, postulates, and logical reasoning in geometry',
        difficulty: 'Medium',
        points: 110,
        duration: '22 min',
        concept: 'Geometry is built on fundamental assumptions (axioms and postulates) from which all other facts are proven.',
        visualization: {
          type: 'geometric-proofs',
          description: 'Interactive geometric constructions and proofs'
        },
        examples: [
          'A straight line can be drawn between any two points',
          'All right angles are equal',
          'If equals are added to equals, the sums are equal'
        ],
        realWorld: 'Logical reasoning, mathematical proofs, and precise constructions!'
      }
    ],
    physics: [
      {
        id: 'motion',
        title: 'Motion',
        description: 'Uniform and non-uniform motion, acceleration, equations of motion',
        difficulty: 'Hard',
        points: 140,
        duration: '30 min',
        concept: 'Motion can be described using displacement, velocity, and acceleration. Mathematical equations relate these quantities.',
        visualization: {
          type: 'motion-simulator',
          description: 'Interactive simulations of different types of motion'
        },
        examples: [
          'Velocity = displacement/time',
          'Acceleration = change in velocity/time',
          'v = u + at (first equation of motion)'
        ],
        realWorld: 'Vehicle design, sports analysis, space missions, and safety systems!'
      },
      {
        id: 'force-laws-of-motion',
        title: 'Force and Newton\'s Laws of Motion',
        description: 'Newton\'s three laws, inertia, momentum, and applications',
        difficulty: 'Hard',
        points: 150,
        duration: '32 min',
        concept: 'Forces cause changes in motion. Newton\'s laws describe the relationship between forces and motion.',
        visualization: {
          type: 'force-demonstrator',
          description: 'Interactive experiments showing Newton\'s laws'
        },
        examples: [
          'First law: Objects at rest stay at rest (inertia)',
          'Second law: F = ma',
          'Third law: Every action has equal opposite reaction'
        ],
        realWorld: 'Vehicle safety, rocket propulsion, sports, and machine design!'
      },
      {
        id: 'gravitation',
        title: 'Gravitation',
        description: 'Universal law of gravitation, acceleration due to gravity',
        difficulty: 'Hard',
        points: 135,
        duration: '28 min',
        concept: 'Every object attracts every other object with a gravitational force. This explains planetary motion and weight.',
        visualization: {
          type: 'gravity-simulator',
          description: 'Interactive planetary system showing gravitational effects'
        },
        examples: [
          'F = G(m₁m₂)/r² (Universal law)',
          'g = 9.8 m/s² on Earth',
          'Weight = mass × gravitational acceleration'
        ],
        realWorld: 'Satellite orbits, tides, space exploration, and weighing systems!'
      },
      {
        id: 'work-energy',
        title: 'Work and Energy',
        description: 'Work, kinetic and potential energy, conservation of energy',
        difficulty: 'Medium',
        points: 125,
        duration: '25 min',
        concept: 'Work is done when force causes displacement. Energy is the ability to do work and can be conserved.',
        visualization: {
          type: 'energy-converter',
          description: 'Interactive demonstrations of energy transformations'
        },
        examples: [
          'Work = Force × displacement × cos θ',
          'Kinetic energy = ½mv²',
          'Potential energy = mgh'
        ],
        realWorld: 'Power generation, vehicle efficiency, renewable energy, and machines!'
      },
      {
        id: 'sound-physics',
        title: 'Sound (Physics)',
        description: 'Wave nature of sound, speed, reflection, and applications',
        difficulty: 'Medium',
        points: 115,
        duration: '23 min',
        concept: 'Sound is a mechanical wave that requires a medium to travel. Its properties determine what we hear.',
        visualization: {
          type: 'sound-wave-analyzer',
          description: 'Interactive sound wave properties and acoustics'
        },
        examples: [
          'Sound speed in air ≈ 343 m/s',
          'Echo: Reflection of sound waves',
          'Frequency determines pitch'
        ],
        realWorld: 'Music, medical ultrasound, sonar navigation, and noise control!'
      }
    ],
    chemistry: [
      {
        id: 'matter-nature-behaviour',
        title: 'Matter - Nature and Behaviour',
        description: 'States of matter, kinetic theory, and changes of state',
        difficulty: 'Medium',
        points: 100,
        duration: '20 min',
        concept: 'Matter exists in different states based on particle arrangement and energy. State changes involve energy transfer.',
        visualization: {
          type: 'particle-simulator',
          description: 'Interactive particle motion in different states'
        },
        examples: [
          'Solid: Fixed shape and volume',
          'Liquid: Fixed volume, variable shape',
          'Gas: Variable shape and volume'
        ],
        realWorld: 'Weather phenomena, cooking, industrial processes, and material science!'
      },
      {
        id: 'pure-substances-mixtures',
        title: 'Is Matter Pure?',
        description: 'Pure substances, mixtures, separation techniques',
        difficulty: 'Easy',
        points: 95,
        duration: '18 min',
        concept: 'Matter can be pure (single substance) or mixture (multiple substances). Various techniques separate mixtures.',
        visualization: {
          type: 'separation-lab',
          description: 'Virtual laboratory for separation techniques'
        },
        examples: [
          'Pure: Distilled water, pure gold',
          'Mixtures: Salt water, air, soil',
          'Separation: Filtration, distillation, chromatography'
        ],
        realWorld: 'Water purification, mining, food processing, and quality control!'
      },
      {
        id: 'atoms-molecules',
        title: 'Atoms and Molecules',
        description: 'Atomic theory, symbols, molecular formulas, and mole concept',
        difficulty: 'Hard',
        points: 145,
        duration: '30 min',
        concept: 'All matter is made of atoms. Atoms combine to form molecules. The mole helps count atoms and molecules.',
        visualization: {
          type: 'atomic-builder',
          description: 'Interactive atom and molecule construction'
        },
        examples: [
          'H₂O: 2 hydrogen atoms, 1 oxygen atom',
          'Molar mass of water = 18 g/mol',
          'Avogadro number = 6.022 × 10²³'
        ],
        realWorld: 'Drug formulation, material design, environmental chemistry, and food science!'
      },
      {
        id: 'structure-of-atom',
        title: 'Structure of Atom',
        description: 'Discovery of electron, proton, neutron, and atomic models',
        difficulty: 'Hard',
        points: 155,
        duration: '32 min',
        concept: 'Atoms have a nucleus containing protons and neutrons, with electrons orbiting around it.',
        visualization: {
          type: 'atomic-model-explorer',
          description: 'Interactive atomic models from Thomson to modern'
        },
        examples: [
          'Proton: +1 charge, mass ≈ 1 amu',
          'Electron: -1 charge, negligible mass',
          'Neutron: neutral, mass ≈ 1 amu'
        ],
        realWorld: 'Nuclear energy, medical imaging, radiocarbon dating, and electronics!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.physics, ...theorems.chemistry];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-9-${theoremId}`, 100);
  };

  const TheoremCard = ({ theorem, subject }) => {
    const isCompleted = completedTheorems.has(theorem.id);
    
    const getSubjectColor = (subject) => {
      switch(subject) {
        case 'mathematics': return 'bg-blue-100 text-blue-800';
        case 'physics': return 'bg-purple-100 text-purple-800';
        case 'chemistry': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getSubjectIcon = (subject) => {
      switch(subject) {
        case 'mathematics': return <Calculator className="h-4 w-4" />;
        case 'physics': return <Zap className="h-4 w-4" />;
        case 'chemistry': return <Atom className="h-4 w-4" />;
        default: return <BookOpen className="h-4 w-4" />;
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:scale-105'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={getSubjectColor(subject)}>
              <div className="flex items-center gap-1">
                {getSubjectIcon(subject)}
                <span className="capitalize">{subject}</span>
              </div>
            </Badge>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold">
            {theorem.title}
          </CardTitle>
          
          <CardDescription>
            {theorem.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>{theorem.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{theorem.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              <span>{theorem.points} pts</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {theorem.concept}
          </p>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedTheorem(theorem)}
              className="flex-1"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            
            <Link href={`/learning/class-9/${theorem.id}`} className="flex-1">
              <Button size="sm" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                {isCompleted ? 'Review' : 'Start'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TheoremPreview = ({ theorem }) => {
    if (!theorem) return null;

    return (
      <Card className="mb-6 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              {theorem.title} - Preview
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTheorem(null)}>
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Core Concept:</h4>
            <p>{theorem.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Examples:</h4>
            <ul className="space-y-1">
              {theorem.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-sm">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Real-World Application:</h4>
            <p className="text-sm">{theorem.realWorld}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Interactive Feature:</h4>
            <p className="text-sm">{theorem.visualization.description}</p>
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
            Back to Learning
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            9
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 9 - Discovery
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Discover advanced mathematics, physics, and chemistry concepts
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTheorems.size} of {allTheorems.length} theorems completed
            </p>
          </div>
        </div>
      </div>

      {/* Theorem Preview */}
      {selectedTheorem && <TheoremPreview theorem={selectedTheorem} />}

      {/* Tabs for subjects */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mathematics">Math</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.mathematics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="mathematics" />
            ))}
            {theorems.physics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="physics" />
            ))}
            {theorems.chemistry.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="chemistry" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mathematics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.mathematics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="mathematics" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="physics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.physics.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="physics" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chemistry" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theorems.chemistry.map((theorem) => (
              <TheoremCard key={theorem.id} theorem={theorem} subject="chemistry" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement Section */}
      {completedTheorems.size > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completedTheorems.size}</div>
                <div className="text-sm text-muted-foreground">Theorems Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Array.from(completedTheorems).reduce((total, id) => {
                    const theorem = allTheorems.find(t => t.id === id);
                    return total + (theorem?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Class Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}