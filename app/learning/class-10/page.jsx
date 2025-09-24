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

export default function Class10Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'real-numbers',
        title: 'Real Numbers',
        description: 'Euclid\'s division lemma, HCF, LCM, and fundamental theorem of arithmetic',
        difficulty: 'Hard',
        points: 140,
        duration: '30 min',
        concept: 'Every integer can be expressed as a product of primes in a unique way. This helps in finding HCF and LCM.',
        visualization: {
          type: 'prime-factorizer',
          description: 'Interactive prime factorization and HCF/LCM calculator'
        },
        examples: [
          '12 = 2² × 3',
          'HCF(12, 18) = 6',
          'LCM(12, 18) = 36'
        ],
        realWorld: 'Cryptography, scheduling, gear ratios, and computer algorithms!'
      },
      {
        id: 'polynomials-advanced',  
        title: 'Polynomials (Advanced)',
        description: 'Zeros of polynomials, relationship between zeros and coefficients',
        difficulty: 'Hard',
        points: 150,
        duration: '32 min',
        concept: 'Polynomial zeros are values that make the polynomial equal to zero. They relate to the coefficients through specific formulas.',
        visualization: {
          type: 'polynomial-zero-finder',
          description: 'Interactive graph showing polynomial zeros and their relationships'
        },
        examples: [
          'For ax² + bx + c: Sum of zeros = -b/a',
          'Product of zeros = c/a',
          'x² - 5x + 6 has zeros 2 and 3'
        ],
        realWorld: 'Engineering optimization, economics, and scientific modeling!'
      },
      {
        id: 'linear-equations-pair',
        title: 'Pair of Linear Equations',
        description: 'Graphical and algebraic methods for solving simultaneous equations',
        difficulty: 'Medium',
        points: 130,
        duration: '28 min',
        concept: 'Two linear equations can be solved simultaneously using substitution, elimination, or graphical methods.',
        visualization: {
          type: 'equation-pair-solver',
          description: 'Interactive solver showing all three methods graphically'
        },
        examples: [
          'x + y = 5, x - y = 1 gives x = 3, y = 2',
          'Consistent: Unique solution exists',
          'Inconsistent: No solution exists'
        ],
        realWorld: 'Business optimization, resource allocation, and engineering design!'
      },
      {
        id: 'quadratic-equations',
        title: 'Quadratic Equations',
        description: 'Solving by factorization, completing square, and quadratic formula',
        difficulty: 'Hard',
        points: 160,
        duration: '35 min',
        concept: 'Quadratic equations have degree 2 and can be solved using multiple methods. The discriminant determines the nature of roots.',
        visualization: {
          type: 'quadratic-explorer',
          description: 'Interactive parabola showing roots, vertex, and discriminant effects'
        },
        examples: [
          'x² - 5x + 6 = 0 gives x = 2, 3',
          'Quadratic formula: x = (-b ± √(b²-4ac))/2a',
          'Discriminant = b² - 4ac'
        ],
        realWorld: 'Projectile motion, profit maximization, and architectural design!'
      },
      {
        id: 'arithmetic-progressions',
        title: 'Arithmetic Progressions',
        description: 'nth term, sum of n terms, and applications of AP',
        difficulty: 'Medium',
        points: 125,
        duration: '26 min',
        concept: 'An arithmetic progression has a constant difference between consecutive terms. Formulas help find any term or sum.',
        visualization: {
          type: 'ap-visualizer',
          description: 'Interactive sequence builder showing AP patterns'
        },
        examples: [
          'AP: 2, 5, 8, 11, ... (d = 3)',
          'nth term: a + (n-1)d',
          'Sum of n terms: n/2[2a + (n-1)d]'
        ],
        realWorld: 'Salary increments, loan payments, and population growth patterns!'
      },
      {
        id: 'triangles',
        title: 'Triangles',
        description: 'Similar triangles, Pythagoras theorem, and applications',
        difficulty: 'Medium',
        points: 120,
        duration: '25 min',
        concept: 'Similar triangles have proportional sides and equal angles. The Pythagoras theorem relates sides of right triangles.',
        visualization: {
          type: 'triangle-explorer',
          description: 'Interactive triangle properties and similarity checker'
        },
        examples: [
          'Similar triangles: Corresponding sides are proportional',
          'Pythagoras: a² + b² = c² (right triangle)',
          'Basic proportionality theorem (Thales theorem)'
        ],
        realWorld: 'Architecture, navigation, surveying, and engineering measurements!'
      }
    ],
    physics: [
      {
        id: 'light-reflection-refraction',
        title: 'Light - Reflection and Refraction',
        description: 'Laws of reflection, refraction, lenses, and optical instruments',
        difficulty: 'Hard',
        points: 155,
        duration: '33 min',
        concept: 'Light changes direction when it hits surfaces or enters different media. Lenses use refraction to form images.',
        visualization: {
          type: 'optics-laboratory',
          description: 'Virtual optics lab with mirrors, lenses, and ray tracing'
        },
        examples: [
          'Snell\'s law: n₁sinθ₁ = n₂sinθ₂',
          'Lens formula: 1/f = 1/v - 1/u',
          'Magnification = v/u = hi/ho'
        ],
        realWorld: 'Eyeglasses, cameras, telescopes, microscopes, and fiber optics!'
      },
      {
        id: 'electricity',
        title: 'Electricity',
        description: 'Electric current, Ohm\'s law, electrical power, and heating effects',
        difficulty: 'Medium',
        points: 145,
        duration: '30 min',
        concept: 'Electric current flows due to potential difference. Resistance opposes current flow, and electrical energy converts to other forms.',
        visualization: {
          type: 'circuit-simulator',
          description: 'Interactive circuit builder with various components'
        },
        examples: [
          'Ohm\'s law: V = IR',
          'Power = VI = I²R = V²/R',
          'Electrical energy = Power × time'
        ],
        realWorld: 'Home wiring, electronic devices, power generation, and electric vehicles!'
      },
      {
        id: 'magnetic-effects',
        title: 'Magnetic Effects of Electric Current',
        description: 'Magnetic field, electromagnetic induction, and electric motor',
        difficulty: 'Hard',
        points: 150,
        duration: '32 min',
        concept: 'Moving electric charges create magnetic fields. Changing magnetic fields induce electric currents (electromagnetic induction).',
        visualization: {
          type: 'electromagnetic-lab',
          description: 'Interactive demonstrations of magnetic effects and induction'
        },
        examples: [
          'Right-hand rule for magnetic field direction',
          'Fleming\'s left-hand rule for motor effect',
          'Fleming\'s right-hand rule for generator effect'
        ],
        realWorld: 'Electric motors, generators, transformers, and magnetic storage devices!'
      },
      {
        id: 'sources-of-energy',
        title: 'Sources of Energy',
        description: 'Conventional and non-conventional energy sources, environmental impact',
        difficulty: 'Easy',
        points: 110,
        duration: '22 min',
        concept: 'Energy sources can be renewable or non-renewable. Choice of energy affects environment and sustainability.',
        visualization: {
          type: 'energy-source-map',
          description: 'Interactive map showing different energy sources and their impacts'
        },
        examples: [
          'Renewable: Solar, wind, hydro, geothermal',
          'Non-renewable: Coal, oil, natural gas',
          'Nuclear energy: Fission and fusion'
        ],
        realWorld: 'Power plants, environmental policy, and sustainable development!'
      }
    ],
    chemistry: [
      {
        id: 'acid-bases-salts',
        title: 'Acids, Bases and Salts',
        description: 'pH scale, reactions of acids and bases, and salt preparation',
        difficulty: 'Medium',
        points: 135,
        duration: '28 min',
        concept: 'Acids and bases have characteristic properties and reactions. pH measures acidity/basicity on a scale of 0-14.',
        visualization: {
          type: 'ph-laboratory',
          description: 'Virtual chemistry lab for acid-base experiments'
        },
        examples: [
          'pH < 7: Acidic, pH = 7: Neutral, pH > 7: Basic',
          'Acid + Base → Salt + Water',
          'Universal indicator shows pH through colors'
        ],
        realWorld: 'Food preservation, medicine, agriculture, and industrial processes!'
      },
      {
        id: 'metals-nonmetals',
        title: 'Metals and Non-metals',
        description: 'Properties, reactivity series, extraction of metals, and corrosion',
        difficulty: 'Medium',
        points: 140,
        duration: '29 min',
        concept: 'Metals and non-metals have contrasting properties. Reactivity series helps predict reactions and extraction methods.',
        visualization: {
          type: 'reactivity-simulator',
          description: 'Interactive reactivity series and metal extraction processes'
        },
        examples: [
          'Metals: Lustrous, conductive, malleable',
          'Non-metals: Dull, insulator, brittle',
          'Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au'
        ],
        realWorld: 'Metallurgy, construction materials, electronics, and jewelry!'
      },
      {
        id: 'carbon-compounds',
        title: 'Carbon and its Compounds',
        description: 'Covalent bonding, hydrocarbons, functional groups, and nomenclature',
        difficulty: 'Hard',
        points: 165,
        duration: '35 min',
        concept: 'Carbon forms millions of compounds due to its unique bonding properties. Organic chemistry studies carbon compounds.',
        visualization: {
          type: 'molecule-builder',
          description: 'Interactive 3D molecule construction and naming tool'
        },
        examples: [
          'Methane: CH₄ (simplest hydrocarbon)',
          'Functional groups: -OH (alcohol), -COOH (carboxylic acid)',
          'Isomers: Same formula, different structure'
        ],
        realWorld: 'Fuels, plastics, medicines, food additives, and biotechnology!'
      },
      {
        id: 'life-processes',
        title: 'Life Processes',
        description: 'Nutrition, respiration, transportation, and excretion in living organisms',
        difficulty: 'Medium',
        points: 125,
        duration: '26 min',
        concept: 'Living organisms carry out essential life processes to maintain themselves and continue their species.',
        visualization: {
          type: 'life-process-simulator',
          description: 'Interactive models of biological processes'
        },
        examples: [
          'Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
          'Respiration: Glucose + Oxygen → CO₂ + Water + Energy',
          'Blood circulation: Heart pumps blood through vessels'
        ],
        realWorld: 'Healthcare, agriculture, biotechnology, and environmental science!'
      },
      {
        id: 'periodic-classification',
        title: 'Periodic Classification of Elements',
        description: 'Modern periodic table, trends in properties, and significance',
        difficulty: 'Hard',
        points: 155,
        duration: '32 min',
        concept: 'Elements are arranged in periodic table based on atomic number. Properties show periodic trends across periods and groups.',
        visualization: {
          type: 'periodic-table-explorer',
          description: 'Interactive periodic table showing trends and properties'
        },
        examples: [
          'Atomic size decreases across period',
          'Metallic character decreases across period',
          'Valency varies across period and group'
        ],
        realWorld: 'Material science, drug design, environmental chemistry, and research!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.physics, ...theorems.chemistry];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-10-${theoremId}`, 100);
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
            
            <Link href={`/learning/class-10/${theorem.id}`} className="flex-1">
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
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            10
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 10 - Foundation Plus
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Master board exam concepts in Mathematics, Physics, and Chemistry
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