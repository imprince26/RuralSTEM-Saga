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

export default function Class11Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'sets',
        title: 'Sets',
        description: 'Set theory, operations on sets, Venn diagrams, and applications',
        difficulty: 'Medium',
        points: 150,
        duration: '30 min',
        concept: 'Sets are collections of distinct objects. Set operations help solve logical and mathematical problems.',
        visualization: {
          type: 'venn-diagram-builder',
          description: 'Interactive Venn diagrams for set operations'
        },
        examples: [
          'A ∪ B: Union of sets A and B',
          'A ∩ B: Intersection of sets A and B',
          'A - B: Difference of sets A and B'
        ],
        realWorld: 'Database queries, probability, statistics, and logical reasoning!'
      },
      {
        id: 'relations-functions',
        title: 'Relations and Functions',
        description: 'Types of relations, functions, domain, range, and composite functions',
        difficulty: 'Hard',
        points: 170,
        duration: '35 min',
        concept: 'Relations connect elements of sets. Functions are special relations where each input has exactly one output.',
        visualization: {
          type: 'function-mapper',
          description: 'Interactive function graphing and relation visualization'
        },
        examples: [
          'One-to-one function: f(x) = x',
          'Many-to-one function: f(x) = x²',
          'Composite function: (fog)(x) = f(g(x))'
        ],
        realWorld: 'Computer programming, economics, engineering modeling, and data analysis!'
      },
      {
        id: 'trigonometric-functions',
        title: 'Trigonometric Functions',
        description: 'Trigonometric ratios, identities, equations, and graphs',
        difficulty: 'Hard',
        points: 180,
        duration: '38 min',
        concept: 'Trigonometric functions relate angles to ratios of sides in right triangles and describe periodic phenomena.',
        visualization: {
          type: 'trig-function-explorer',
          description: 'Interactive unit circle and trigonometric graphs'
        },
        examples: [
          'sin²θ + cos²θ = 1 (Pythagorean identity)',
          'sin(A+B) = sinA cosB + cosA sinB',
          'Period of sin x and cos x is 2π'
        ],
        realWorld: 'Sound waves, AC electricity, navigation, architecture, and physics!'
      },
      {
        id: 'principle-mathematical-induction',
        title: 'Mathematical Induction',
        description: 'Principle of mathematical induction and its applications in proofs',
        difficulty: 'Hard',
        points: 160,
        duration: '32 min',
        concept: 'Mathematical induction proves statements for all natural numbers by showing the base case and inductive step.',
        visualization: {
          type: 'induction-stepper',
          description: 'Step-by-step visualization of inductive proofs'
        },
        examples: [
          'Prove: 1 + 2 + 3 + ... + n = n(n+1)/2',
          'Base case: n = 1, LHS = 1, RHS = 1',
          'Inductive step: Assume true for k, prove for k+1'
        ],
        realWorld: 'Computer science algorithms, mathematical proofs, and logical reasoning!'
      },
      {
        id: 'complex-numbers',
        title: 'Complex Numbers',
        description: 'Algebra of complex numbers, polar form, and De Moivre\'s theorem',
        difficulty: 'Hard',
        points: 175,
        duration: '36 min',
        concept: 'Complex numbers extend real numbers by including imaginary unit i = √(-1). They have both algebraic and geometric interpretations.',
        visualization: {
          type: 'complex-plane-explorer',
          description: 'Interactive complex plane with operations and transformations'
        },
        examples: [
          'z = a + bi (rectangular form)',
          'z = r(cos θ + i sin θ) (polar form)',
          'De Moivre: (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ'
        ],
        realWorld: 'Electrical engineering, signal processing, quantum mechanics, and control systems!'
      },
      {
        id: 'linear-inequalities',
        title: 'Linear Inequalities',
        description: 'Graphical solution of linear inequalities and optimization',
        difficulty: 'Medium',
        points: 140,
        duration: '28 min',
        concept: 'Linear inequalities define regions in coordinate plane. They are used in optimization problems.',
        visualization: {
          type: 'inequality-grapher',
          description: 'Interactive graphing of linear inequalities and feasible regions'
        },
        examples: [
          '2x + 3y ≤ 6 defines a half-plane',
          'Feasible region: Intersection of all constraints',
          'Corner points give optimal solutions'
        ],
        realWorld: 'Resource allocation, production planning, diet problems, and business optimization!'
      },
      {
        id: 'limits-derivatives',
        title: 'Limits and Derivatives',
        description: 'Introduction to calculus: limits, continuity, and basic differentiation',
        difficulty: 'Hard',
        points: 190,
        duration: '40 min',
        concept: 'Limits describe behavior of functions near points. Derivatives measure instantaneous rate of change.',
        visualization: {
          type: 'calculus-visualizer',
          description: 'Interactive limits and derivative visualization with tangent lines'
        },
        examples: [
          'lim(x→a) f(x) = L',
          'f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
          'd/dx(xⁿ) = nxⁿ⁻¹'
        ],
        realWorld: 'Physics (velocity, acceleration), economics (marginal cost), and optimization!'
      }
    ],
    physics: [
      {
        id: 'units-measurements',
        title: 'Units and Measurements',
        description: 'SI units, dimensional analysis, errors, and significant figures',
        difficulty: 'Medium',
        points: 130,
        duration: '26 min',
        concept: 'Measurements require units and have uncertainties. Dimensional analysis helps check equations and derive relationships.',
        visualization: {
          type: 'measurement-lab',
          description: 'Virtual instruments showing precision, accuracy, and error analysis'
        },
        examples: [
          'SI base units: m, kg, s, A, K, mol, cd',
          'Dimensional formula: [v] = LT⁻¹',
          'Percentage error = (error/true value) × 100'
        ],
        realWorld: 'Scientific research, engineering design, quality control, and standardization!'
      },
      {
        id: 'motion-straight-line',
        title: 'Motion in a Straight Line',
        description: 'Kinematics: position, velocity, acceleration, and motion graphs',
        difficulty: 'Medium',
        points: 155,
        duration: '31 min',
        concept: 'Motion can be described using position-time and velocity-time graphs. Calculus relates position, velocity, and acceleration.',
        visualization: {
          type: 'kinematic-analyzer',
          description: 'Interactive motion graphs and kinematic equation solver'
        },
        examples: [
          'v = ds/dt (velocity as derivative of position)',
          'a = dv/dt (acceleration as derivative of velocity)',
          's = ut + ½at² (kinematic equation)'
        ],
        realWorld: 'Vehicle design, sports analysis, satellite tracking, and safety systems!'
      },
      {
        id: 'motion-plane',
        title: 'Motion in a Plane',
        description: 'Vector addition, projectile motion, and circular motion',
        difficulty: 'Hard',
        points: 170,
        duration: '34 min',
        concept: 'Two-dimensional motion involves vector quantities. Projectile motion combines horizontal and vertical motions.',
        visualization: {
          type: 'projectile-simulator',
          description: 'Interactive projectile motion with adjustable parameters'
        },
        examples: [
          'Range = u²sin2θ/g (projectile motion)',
          'Centripetal acceleration = v²/r',
          'Vector addition: A⃗ + B⃗ = C⃗'
        ],
        realWorld: 'Sports, artillery, satellite orbits, and amusement park rides!'
      },
      {
        id: 'laws-of-motion',
        title: 'Laws of Motion',
        description: 'Newton\'s laws, friction, dynamics of circular motion',
        difficulty: 'Hard',
        points: 165,
        duration: '33 min',
        concept: 'Newton\'s laws connect forces and motion. Different types of forces act in various situations.',
        visualization: {
          type: 'force-analyzer',
          description: 'Interactive force diagrams and motion simulations'
        },
        examples: [
          'F⃗ = ma⃗ (Newton\'s second law)',
          'Friction force = μN',
          'Centripetal force = mv²/r'
        ],
        realWorld: 'Vehicle dynamics, structural engineering, sports, and machinery design!'
      },
      {
        id: 'work-energy-power',
        title: 'Work, Energy and Power',
        description: 'Work-energy theorem, conservation of energy, and power',
        difficulty: 'Medium',
        points: 150,
        duration: '30 min',
        concept: 'Energy can be transformed but not destroyed. Work-energy theorem relates work done to change in kinetic energy.',
        visualization: {
          type: 'energy-transformer',
          description: 'Interactive energy conservation demonstrations'
        },
        examples: [
          'Work = F⃗ · s⃗ = Fs cos θ',
          'KE = ½mv², PE = mgh',
          'Power = Work/time = F⃗ · v⃗'
        ],
        realWorld: 'Power plants, vehicles, renewable energy systems, and mechanical design!'
      }
    ],
    chemistry: [
      {
        id: 'some-basic-concepts',
        title: 'Some Basic Concepts of Chemistry',
        description: 'Atomic and molecular masses, mole concept, stoichiometry',
        difficulty: 'Medium',
        points: 145,
        duration: '29 min',
        concept: 'Chemistry deals with atoms and molecules. The mole concept helps quantify chemical substances and reactions.',
        visualization: {
          type: 'mole-calculator',
          description: 'Interactive mole concept demonstrations and calculations'
        },
        examples: [
          '1 mole = 6.022 × 10²³ particles',
          'Molecular mass of H₂O = 18 u',
          'Stoichiometry: 2H₂ + O₂ → 2H₂O'
        ],
        realWorld: 'Drug formulation, industrial chemistry, environmental analysis, and quality control!'
      },
      {
        id: 'structure-of-atom-advanced',
        title: 'Structure of Atom (Advanced)',
        description: 'Quantum mechanical model, orbitals, and electronic configuration',
        difficulty: 'Hard',
        points: 180,
        duration: '36 min',
        concept: 'Electrons exist in orbitals described by quantum mechanics. Electronic configuration determines chemical properties.',
        visualization: {
          type: 'orbital-visualizer',
          description: '3D orbital shapes and electron density distributions'
        },
        examples: [
          'Quantum numbers: n, l, m, s',
          'Aufbau principle: Fill lower energy orbitals first',
          'Electronic configuration of carbon: 1s² 2s² 2p²'
        ],
        realWorld: 'Material science, semiconductor technology, and chemical bonding predictions!'
      },
      {
        id: 'classification-elements',
        title: 'Classification of Elements',
        description: 'Modern periodic law, periodic trends, and properties',
        difficulty: 'Medium',
        points: 155,
        duration: '31 min',
        concept: 'Periodic table organizes elements by electronic configuration. Properties show periodic trends.',
        visualization: {
          type: 'periodic-trends-explorer',
          description: 'Interactive periodic table showing property trends'
        },
        examples: [
          'Atomic radius decreases across period',
          'Ionization energy increases across period',
          'Electronegativity increases across period'
        ],
        realWorld: 'Material selection, drug design, catalyst development, and research!'
      },
      {
        id: 'chemical-bonding',
        title: 'Chemical Bonding and Molecular Structure',
        description: 'Ionic, covalent, and coordinate bonds, molecular geometry',
        difficulty: 'Hard',
        points: 175,
        duration: '35 min',
        concept: 'Atoms bond to achieve stable electronic configuration. Bonding determines molecular properties and shapes.',
        visualization: {
          type: 'molecule-shape-predictor',
          description: 'VSEPR theory and 3D molecular geometry visualization'
        },
        examples: [
          'Ionic bond: Transfer of electrons (NaCl)',
          'Covalent bond: Sharing of electrons (H₂O)',
          'VSEPR: Electron pairs repel to minimize energy'
        ],
        realWorld: 'Drug design, polymer chemistry, material engineering, and nanotechnology!'
      },
      {
        id: 'states-of-matter-advanced',
        title: 'States of Matter (Advanced)',
        description: 'Gas laws, kinetic theory, and intermolecular forces',
        difficulty: 'Medium',
        points: 140,
        duration: '28 min',
        concept: 'Gas behavior is described by laws and kinetic theory. Intermolecular forces determine physical properties.',
        visualization: {
          type: 'gas-law-simulator',
          description: 'Interactive gas law demonstrations and molecular motion'
        },
        examples: [
          'PV = nRT (ideal gas equation)',
          'Kinetic energy ∝ temperature',
          'van der Waals forces in real gases'
        ],
        realWorld: 'Weather prediction, industrial processes, refrigeration, and atmospheric science!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.physics, ...theorems.chemistry];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-11-${theoremId}`, 100);
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
            
            <Link href={`/learning/class-11/${theorem.id}`} className="flex-1">
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
          <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            11
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 11 - Advanced Learning
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Enter the world of advanced mathematics, physics, and chemistry
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