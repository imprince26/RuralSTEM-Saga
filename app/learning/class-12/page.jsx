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
  Atom,
  Sparkles,
  Crown
} from 'lucide-react';
import Link from 'next/link';
import { useGameStore } from '@/stores/useGameStore';

export default function Class12Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedTheorem, setSelectedTheorem] = useState(null);
  const [completedTheorems, setCompletedTheorems] = useState(new Set());
  const { addPoints, updateGameProgress } = useGameStore();

  const theorems = {
    mathematics: [
      {
        id: 'matrices',
        title: 'Matrices',
        description: 'Matrix operations, determinants, inverse, and solving systems',
        difficulty: 'Hard',
        points: 200,
        duration: '45 min',
        concept: 'Matrices are rectangular arrays of numbers. They are fundamental in linear algebra and solving systems of equations.',
        visualization: {
          type: 'matrix-transformer',
          description: 'Interactive matrix operations and transformations'
        },
        examples: [
          'Matrix multiplication: (AB)ᵢⱼ = Σ AᵢₖBₖⱼ',
          'Determinant of 2×2: |A| = ad - bc',
          'Inverse matrix: AA⁻¹ = I'
        ],
        realWorld: 'Computer graphics, data science, economics, engineering, and AI/ML!'
      },
      {
        id: 'determinants',
        title: 'Determinants',
        description: 'Properties, calculation methods, and applications of determinants',
        difficulty: 'Hard',
        points: 190,
        duration: '42 min',
        concept: 'Determinants are scalar values that encode important properties of matrices like invertibility and volume scaling.',
        visualization: {
          type: 'determinant-calculator',
          description: 'Step-by-step determinant calculation and geometric interpretation'
        },
        examples: [
          'det(AB) = det(A) × det(B)',
          'Cramer\'s rule: x = Dₓ/D',
          'Area of triangle using determinants'
        ],
        realWorld: 'Linear transformations, optimization, physics, and coordinate geometry!'
      },
      {
        id: 'continuity-differentiability',
        title: 'Continuity and Differentiability',
        description: 'Advanced calculus concepts, chain rule, and applications',
        difficulty: 'Expert',
        points: 220,
        duration: '48 min',
        concept: 'Continuity ensures smooth functions. Differentiability enables analysis of rates of change and optimization.',
        visualization: {
          type: 'continuity-explorer',
          description: 'Interactive continuity and differentiability checker'
        },
        examples: [
          'Chain rule: d/dx[f(g(x))] = f\'(g(x)) × g\'(x)',
          'Critical points: f\'(x) = 0',
          'Mean Value Theorem applications'
        ],
        realWorld: 'Physics (motion analysis), economics (optimization), and engineering design!'
      },
      {
        id: 'applications-derivatives',
        title: 'Applications of Derivatives',
        description: 'Maxima, minima, rate of change, and curve sketching',
        difficulty: 'Hard',
        points: 210,
        duration: '46 min',
        concept: 'Derivatives find optimal values and describe function behavior. They solve real-world optimization problems.',
        visualization: {
          type: 'optimization-solver',
          description: 'Interactive optimization problems and curve analysis'
        },
        examples: [
          'Maximum profit: dP/dx = 0',
          'Related rates: dV/dt = 4πr² × dr/dt',
          'Newton-Raphson method for roots'
        ],
        realWorld: 'Business optimization, engineering design, physics, and economics!'
      },
      {
        id: 'integrals',
        title: 'Integrals',
        description: 'Integration techniques, definite integrals, and applications',
        difficulty: 'Expert',
        points: 230,
        duration: '50 min',
        concept: 'Integration is the reverse of differentiation. It calculates areas, volumes, and accumulation of quantities.',
        visualization: {
          type: 'integral-visualizer',
          description: 'Interactive integration techniques and area visualization'
        },
        examples: [
          '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C',
          'Integration by parts: ∫ u dv = uv - ∫ v du',
          'Fundamental theorem: ∫ₐᵇ f\'(x) dx = f(b) - f(a)'
        ],
        realWorld: 'Physics (work, energy), probability, economics, and engineering!'
      },
      {
        id: 'applications-integrals',
        title: 'Applications of Integrals',
        description: 'Area calculation, volume of solids, and practical applications',
        difficulty: 'Hard',
        points: 205,
        duration: '44 min',
        concept: 'Integrals calculate areas between curves, volumes of revolution, and solve accumulation problems.',
        visualization: {
          type: 'area-volume-calculator',
          description: 'Interactive area and volume calculations using integrals'
        },
        examples: [
          'Area between curves: ∫[f(x) - g(x)] dx',
          'Volume by disk method: π∫[f(x)]² dx',
          'Arc length: ∫√(1 + [f\'(x)]²) dx'
        ],
        realWorld: 'Architecture, manufacturing, fluid dynamics, and space calculations!'
      },
      {
        id: 'differential-equations',
        title: 'Differential Equations',
        description: 'Formation, solving methods, and applications of differential equations',
        difficulty: 'Expert',
        points: 240,
        duration: '52 min',
        concept: 'Differential equations model rates of change. They describe natural phenomena and dynamic systems.',
        visualization: {
          type: 'differential-equation-solver',
          description: 'Interactive differential equation solving and direction fields'
        },
        examples: [
          'dy/dx = ky (exponential growth/decay)',
          'Separable equations: dy/dx = f(x)g(y)',
          'Linear equations: dy/dx + Py = Q'
        ],
        realWorld: 'Population dynamics, radioactive decay, electrical circuits, and physics!'
      },
      {
        id: 'vector-algebra',
        title: 'Vector Algebra',
        description: 'Vector operations, dot product, cross product, and applications',
        difficulty: 'Hard',
        points: 185,
        duration: '40 min',
        concept: 'Vectors represent quantities with direction and magnitude. Vector algebra enables 3D geometry and physics.',
        visualization: {
          type: 'vector-calculator',
          description: 'Interactive 3D vector operations and geometric interpretations'
        },
        examples: [
          'a⃗ · b⃗ = |a||b|cos θ (dot product)',
          'a⃗ × b⃗ gives perpendicular vector (cross product)',
          'Vector equation of line: r⃗ = a⃗ + λb⃗'
        ],
        realWorld: 'Physics (forces, fields), computer graphics, navigation, and engineering!'
      }
    ],
    physics: [
      {
        id: 'electric-charges-fields',
        title: 'Electric Charges and Fields',
        description: 'Coulomb\'s law, electric field, electric flux, and Gauss\'s law',
        difficulty: 'Hard',
        points: 195,
        duration: '43 min',
        concept: 'Electric charges create electric fields. Gauss\'s law relates electric flux to enclosed charge.',
        visualization: {
          type: 'electric-field-mapper',
          description: 'Interactive electric field visualization and Gauss\'s law demonstrations'
        },
        examples: [
          'Coulomb\'s law: F = kq₁q₂/r²',
          'Electric field: E⃗ = F⃗/q',
          'Gauss\'s law: ∮E⃗·dA⃗ = Q/ε₀'
        ],
        realWorld: 'Electronics, lightning protection, electrostatic painting, and medical devices!'
      },
      {
        id: 'electrostatic-potential',
        title: 'Electrostatic Potential and Capacitance',
        description: 'Electric potential, equipotential surfaces, capacitors, and energy',
        difficulty: 'Hard',
        points: 185,
        duration: '41 min',
        concept: 'Electric potential is potential energy per unit charge. Capacitors store electrical energy in electric fields.',
        visualization: {
          type: 'potential-visualizer',
          description: 'Interactive potential surfaces and capacitor demonstrations'
        },
        examples: [
          'Potential: V = W/q = kQ/r',
          'Capacitance: C = Q/V',
          'Energy in capacitor: U = ½CV²'
        ],
        realWorld: 'Electronics, energy storage, touchscreens, and power systems!'
      },
      {
        id: 'current-electricity',
        title: 'Current Electricity',
        description: 'Electric current, resistance, Ohm\'s law, and electrical circuits',
        difficulty: 'Medium',
        points: 170,
        duration: '38 min',
        concept: 'Electric current is flow of charge. Ohm\'s law relates voltage, current, and resistance in circuits.',
        visualization: {
          type: 'circuit-simulator',
          description: 'Interactive circuit building and analysis tool'
        },
        examples: [
          'Ohm\'s law: V = IR',
          'Power: P = VI = I²R = V²/R',
          'Kirchhoff\'s laws for circuit analysis'
        ],
        realWorld: 'Electrical engineering, household appliances, computers, and power distribution!'
      },
      {
        id: 'magnetic-effects',
        title: 'Magnetic Effects of Current',
        description: 'Magnetic field, force on current, electromagnetic induction',
        difficulty: 'Hard',
        points: 200,
        duration: '44 min',
        concept: 'Moving charges create magnetic fields. Changing magnetic fields induce electric fields (Faraday\'s law).',
        visualization: {
          type: 'magnetic-field-visualizer',
          description: 'Interactive magnetic field patterns and electromagnetic induction'
        },
        examples: [
          'Magnetic force: F⃗ = qv⃗ × B⃗',
          'Faraday\'s law: ε = -dΦ/dt',
          'Lenz\'s law: Induced current opposes change'
        ],
        realWorld: 'Electric motors, generators, transformers, and magnetic levitation!'
      },
      {
        id: 'electromagnetic-induction',
        title: 'Electromagnetic Induction',
        description: 'Faraday\'s law, Lenz\'s law, self-inductance, and AC generators',
        difficulty: 'Hard',
        points: 210,
        duration: '46 min',
        concept: 'Changing magnetic flux induces EMF. This principle enables generators, transformers, and many electrical devices.',
        visualization: {
          type: 'induction-demonstrator',
          description: 'Interactive electromagnetic induction and AC generation'
        },
        examples: [
          'Motional EMF: ε = Blv',
          'Self-inductance: ε = -L(dI/dt)',
          'Mutual inductance: M₁₂ = M₂₁'
        ],
        realWorld: 'Power generation, wireless charging, induction cooktops, and transformers!'
      },
      {
        id: 'alternating-current',
        title: 'Alternating Current',
        description: 'AC circuits, reactance, impedance, and power in AC circuits',
        difficulty: 'Expert',
        points: 225,
        duration: '48 min',
        concept: 'AC voltage and current vary sinusoidally. Reactive components create phase differences between voltage and current.',
        visualization: {
          type: 'ac-circuit-analyzer',
          description: 'Interactive AC circuit analysis with phasor diagrams'
        },
        examples: [
          'RMS values: Vᵣₘₛ = V₀/√2',
          'Impedance: Z = √(R² + (XL - XC)²)',
          'Power factor: cos φ = R/Z'
        ],
        realWorld: 'Power transmission, household electricity, motors, and electronic devices!'
      },
      {
        id: 'electromagnetic-waves',
        title: 'Electromagnetic Waves',
        description: 'Wave properties, electromagnetic spectrum, and wave propagation',
        difficulty: 'Hard',
        points: 180,
        duration: '39 min',
        concept: 'Electromagnetic waves are self-propagating oscillations of electric and magnetic fields traveling at light speed.',
        visualization: {
          type: 'em-wave-simulator',
          description: 'Interactive electromagnetic wave propagation and properties'
        },
        examples: [
          'Wave equation: c = fλ',
          'Energy density: u = ½(ε₀E² + B²/μ₀)',
          'Poynting vector: S⃗ = E⃗ × B⃗/μ₀'
        ],
        realWorld: 'Radio, TV, mobile phones, medical imaging, and space communication!'
      },
      {
        id: 'ray-optics',
        title: 'Ray Optics and Optical Instruments',
        description: 'Reflection, refraction, lenses, mirrors, and optical instruments',
        difficulty: 'Medium',
        points: 165,
        duration: '36 min',
        concept: 'Light travels in straight lines (rays). Reflection and refraction at surfaces enable image formation by mirrors and lenses.',
        visualization: {
          type: 'optics-simulator',
          description: 'Interactive ray tracing and optical instrument design'
        },
        examples: [
          'Snell\'s law: n₁sin θ₁ = n₂sin θ₂',
          'Lens formula: 1/f = 1/v + 1/u',
          'Magnification: m = v/u = h\'/h'
        ],
        realWorld: 'Cameras, telescopes, microscopes, eyeglasses, and fiber optics!'
      }
    ],
    chemistry: [
      {
        id: 'solid-state',
        title: 'The Solid State',
        description: 'Crystal structures, defects, electrical and magnetic properties',
        difficulty: 'Hard',
        points: 175,
        duration: '38 min',
        concept: 'Solids have ordered crystal structures. Defects and impurities determine electrical and mechanical properties.',
        visualization: {
          type: 'crystal-structure-builder',
          description: 'Interactive 3D crystal lattice visualization and defect analysis'
        },
        examples: [
          'Cubic crystal systems: simple, BCC, FCC',
          'Schottky defect: Equal cation-anion vacancies',
          'Frenkel defect: Cation displacement'
        ],
        realWorld: 'Semiconductor technology, material engineering, ceramics, and nanotechnology!'
      },
      {
        id: 'solutions',
        title: 'Solutions',
        description: 'Concentration units, colligative properties, and ideal solutions',
        difficulty: 'Medium',
        points: 160,
        duration: '35 min',
        concept: 'Solutions have uniform composition. Colligative properties depend only on particle concentration, not identity.',
        visualization: {
          type: 'solution-property-calculator',
          description: 'Interactive colligative property calculations and demonstrations'
        },
        examples: [
          'Molarity: M = moles of solute/L of solution',
          'Raoult\'s law: P = P°X (vapor pressure)',
          'Osmotic pressure: π = iMRT'
        ],
        realWorld: 'Pharmaceuticals, food processing, water treatment, and biological systems!'
      },
      {
        id: 'electrochemistry',
        title: 'Electrochemistry',
        description: 'Redox reactions, electrochemical cells, batteries, and electrolysis',
        difficulty: 'Hard',
        points: 190,
        duration: '42 min',
        concept: 'Electrochemistry involves electron transfer reactions. It enables batteries, fuel cells, and metal purification.',
        visualization: {
          type: 'electrochemical-cell-simulator',
          description: 'Interactive galvanic and electrolytic cell demonstrations'
        },
        examples: [
          'Nernst equation: E = E° - (RT/nF)lnQ',
          'Faraday\'s laws of electrolysis',
          'Standard electrode potentials'
        ],
        realWorld: 'Batteries, fuel cells, electroplating, corrosion protection, and metal extraction!'
      },
      {
        id: 'chemical-kinetics',
        title: 'Chemical Kinetics',
        description: 'Reaction rates, rate laws, activation energy, and catalysis',
        difficulty: 'Hard',
        points: 185,
        duration: '40 min',
        concept: 'Chemical kinetics studies reaction rates and mechanisms. Catalysts lower activation energy to speed reactions.',
        visualization: {
          type: 'kinetics-analyzer',
          description: 'Interactive reaction rate analysis and Arrhenius equation explorer'
        },
        examples: [
          'Rate law: Rate = k[A]ᵐ[B]ⁿ',
          'Arrhenius equation: k = Ae^(-Ea/RT)',
          'Half-life: t₁/₂ = 0.693/k (first order)'
        ],
        realWorld: 'Industrial processes, drug development, environmental chemistry, and catalysis!'
      },
      {
        id: 'surface-chemistry',
        title: 'Surface Chemistry',
        description: 'Adsorption, catalysis, colloids, and emulsions',
        difficulty: 'Medium',
        points: 155,
        duration: '33 min',
        concept: 'Surface chemistry involves phenomena at interfaces. Adsorption and colloids have important applications.',
        visualization: {
          type: 'surface-phenomenon-explorer',
          description: 'Interactive adsorption isotherms and colloidal system demonstrations'
        },
        examples: [
          'Langmuir isotherm: θ = KP/(1 + KP)',
          'Freundlich isotherm: x/m = kP^(1/n)',
          'Tyndall effect in colloids'
        ],
        realWorld: 'Catalysis, water purification, cosmetics, food industry, and nanotechnology!'
      },
      {
        id: 'general-principles-metallurgy',
        title: 'General Principles of Metallurgy',
        description: 'Occurrence, extraction, refining, and uses of metals',
        difficulty: 'Medium',
        points: 150,
        duration: '32 min',
        concept: 'Metallurgy extracts metals from ores using reduction, roasting, and purification techniques.',
        visualization: {
          type: 'metallurgy-process-simulator',
          description: 'Interactive metal extraction and purification processes'
        },
        examples: [
          'Thermodynamic principles: ΔG = ΔH - TΔS',
          'Ellingham diagrams for reduction',
          'Zone refining for purification'
        ],
        realWorld: 'Steel production, aluminum extraction, electronics, and material engineering!'
      },
      {
        id: 'p-block-elements',
        title: 'p-Block Elements',
        description: 'Group 15-18 elements, their compounds, and properties',
        difficulty: 'Hard',
        points: 180,
        duration: '39 min',
        concept: 'p-block elements show diverse properties. They form important compounds like acids, bases, and industrial chemicals.',
        visualization: {
          type: 'p-block-property-explorer',
          description: 'Interactive periodic trends and compound structure visualization'
        },
        examples: [
          'Nitrogen fixation: N₂ + 3H₂ → 2NH₃',
          'Contact process: SO₂ + ½O₂ → SO₃',
          'Noble gas compounds: XeF₄, XeF₆'
        ],
        realWorld: 'Fertilizers, semiconductors, pharmaceuticals, and industrial chemicals!'
      },
      {
        id: 'd-f-block-elements',
        title: 'd and f Block Elements',
        description: 'Transition metals, lanthanides, actinides, and their compounds',
        difficulty: 'Hard',
        points: 195,
        duration: '43 min',
        concept: 'Transition metals have partially filled d-orbitals. They show variable oxidation states and form colored compounds.',
        visualization: {
          type: 'transition-metal-explorer',
          description: 'Interactive d-orbital splitting and coordination complex visualization'
        },
        examples: [
          'Variable oxidation states: Fe²⁺, Fe³⁺',
          'Crystal field theory: d-orbital splitting',
          'Lanthanide contraction effect'
        ],
        realWorld: 'Catalysis, electronics, medical imaging, nuclear technology, and advanced materials!'
      }
    ]
  };

  const allTheorems = [...theorems.mathematics, ...theorems.physics, ...theorems.chemistry];
  const completionRate = (completedTheorems.size / allTheorems.length) * 100;

  const handleTheoremComplete = (theoremId, points) => {
    setCompletedTheorems(prev => new Set([...prev, theoremId]));
    addPoints(points);
    updateGameProgress(`class-12-${theoremId}`, 100);
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

    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
        case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-gold-500 bg-gold-50 dark:bg-gold-900/20' : 'hover:scale-105'
      } ${theorem.difficulty === 'Expert' ? 'border-red-300 shadow-md' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge className={getSubjectColor(subject)}>
                <div className="flex items-center gap-1">
                  {getSubjectIcon(subject)}
                  <span className="capitalize">{subject}</span>
                </div>
              </Badge>
              {theorem.difficulty === 'Expert' && (
                <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Expert
                </Badge>
              )}
            </div>
            {isCompleted && <CheckCircle className="h-5 w-5 text-gold-500" />}
          </div>
          
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {theorem.title}
            {theorem.points >= 200 && <Sparkles className="h-4 w-4 text-gold-500" />}
          </CardTitle>
          
          <CardDescription>
            {theorem.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <Badge variant="outline" className={getDifficultyColor(theorem.difficulty)}>
                {theorem.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span>{theorem.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-gold-500" />
              <span className="font-semibold text-gold-600">{theorem.points} pts</span>
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
            
            <Link href={`/learning/class-12/${theorem.id}`} className="flex-1">
              <Button size="sm" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                {isCompleted ? 'Review' : 'Master'}
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
              {theorem.difficulty === 'Expert' && <Crown className="h-4 w-4 text-red-500" />}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTheorem(null)}>
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {theorem.difficulty === 'Expert' && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200 flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Expert Level Challenge
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                This theorem requires advanced mathematical maturity and deep conceptual understanding.
              </p>
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Core Concept:</h4>
            <p>{theorem.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Examples:</h4>
            <ul className="space-y-1">
              {theorem.examples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {example}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Real-World Applications:</h4>
            <p className="text-sm">{theorem.realWorld}</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Interactive Feature:</h4>
            <p className="text-sm">{theorem.visualization.description}</p>
          </div>

          <div className="bg-gold-50 dark:bg-gold-900/20 p-4 rounded-lg border border-gold-200">
            <h4 className="font-semibold mb-2 text-gold-800 dark:text-gold-200">
              Mastery Reward: {theorem.points} Points
            </h4>
            <p className="text-sm text-gold-700 dark:text-gold-300">
              Complete this theorem to earn premium points and unlock advanced features!
            </p>
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
          <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            12
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class 12 - Mastery Level
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">
            Master advanced concepts and prepare for competitive exams
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Mastery Progress</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedTheorems.size} of {allTheorems.length} advanced theorems mastered
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
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                Advanced Mathematics & Science
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                These theorems represent the pinnacle of school-level STEM education. Master them to excel in competitive exams!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theorem Preview */}
      {selectedTheorem && <TheoremPreview theorem={selectedTheorem} />}

      {/* Tabs for subjects */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
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
        <Card className="mt-8 bg-gradient-to-r from-gold-50 to-amber-50 dark:from-gold-950/20 dark:to-amber-950/20 border-gold-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-gold-500" />
              Mastery Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-600">{completedTheorems.size}</div>
                <div className="text-sm text-muted-foreground">Advanced Theorems Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-600">
                  {Array.from(completedTheorems).reduce((total, id) => {
                    const theorem = allTheorems.find(t => t.id === id);
                    return total + (theorem?.points || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Premium Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-600">{Math.round(completionRate)}%</div>
                <div className="text-sm text-muted-foreground">Mastery Progress</div>
              </div>
            </div>
            
            {completionRate === 100 && (
              <div className="mt-4 p-4 bg-gold-100 dark:bg-gold-900/30 rounded-lg text-center">
                <h3 className="font-bold text-gold-800 dark:text-gold-200 flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  Congratulations! Master of Class 12 STEM!
                  <Crown className="h-5 w-5" />
                </h3>
                <p className="text-sm text-gold-700 dark:text-gold-300 mt-2">
                  You have mastered all advanced concepts. Ready for higher education and competitive exams!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}