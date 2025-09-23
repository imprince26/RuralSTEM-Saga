'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  BookOpen, 
  Users, 
  Globe, 
  Award, 
  PlayCircle, 
  ArrowRight,
  Trophy,
  Gamepad2,
  Languages,
  Wifi,
  BarChart3,
  Shield,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    
    // Remove automatic redirection - allow users to browse the home page
    // Users can navigate to dashboard manually via navigation menu
  }, []);

  const features = [
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "Gamified Learning",
      description: "Interactive STEM games with points, badges, and leaderboards to boost engagement by 15%"
    },
    {
      icon: <Languages className="h-8 w-8" />,
      title: "Multilingual Support",
      description: "Content available in English, Odia, and Hindi with voice-over for low-literacy users"
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Offline Access",
      description: "Fully functional app without internet, automatically syncs when online"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Teacher Analytics",
      description: "Real-time progress tracking, performance reports, and class management tools"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Adaptive Learning",
      description: "Personalized difficulty adjustment based on individual student performance"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Rural Context",
      description: "Odisha-specific STEM challenges and agriculture-based learning scenarios"
    }
  ];

  const stats = [
    { number: "15%", label: "Engagement Increase" },
    { number: "1000+", label: "STEM Activities" },
    { number: "3", label: "Languages Supported" },
    { number: "100%", label: "Offline Compatible" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 rural-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Smart India Hackathon 2025 - Problem Statement 25048
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                {t('homepage.hero.title')}
                <span className="text-primary block"> - RuralSTEM Saga</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t('homepage.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-6 animate-pulse-soft">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Start Learning Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    View Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Innovative Features for Rural Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built specifically for rural students with limited internet connectivity and low-cost devices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="game-card hover:scale-105 transition-transform duration-300"
              >
                <CardHeader>
                  <div className="text-primary mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Government of Odisha Initiative
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              This platform is developed as part of the Smart Education theme under 
              the Electronics & IT Department&apos;s commitment to transforming rural education 
              through technology innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-sm px-4 py-2">
                Smart Education
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                Rural Development
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                Digital Innovation
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">
                STEM Learning
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Rural Education?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students, teachers, and administrators already using RuralSTEM Saga 
            to make learning engaging and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=student">
              <Button size="lg" variant="secondary" className="px-8 py-6">
                <BookOpen className="mr-2 h-5 w-5" />
                Join as Student
              </Button>
            </Link>
            <Link href="/signup?role=teacher">
              <Button size="lg" variant="outline" className="px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Users className="mr-2 h-5 w-5" />
                Join as Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
