'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RiHome4Line,
  RiGamepadLine,
  RiCompassLine,
  RiSearchLine,
  RiArrowLeftLine,
  RiQuestionLine,
  RiLightbulbLine,
  RiRocketLine,
  RiBookOpenLine,
  RiMapPin2Line,
  RiStarLine
} from 'react-icons/ri';
import { 
  RiPlantLine,
  RiLeafLine,
  RiFlowerLine,
  RiTreeLine
} from 'react-icons/ri';
import Link from 'next/link';

const FloatingIcon = ({ icon, delay = 0, duration = 3 }) => (
  <motion.div
    className="absolute opacity-20 text-primary/30"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
);

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const suggestedPages = [
    {
      title: 'Home',
      description: 'Return to the main page',
      href: '/',
      icon: <RiHome4Line className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      title: 'Games',
      description: 'Explore STEM games',
      href: '/games',
      icon: <RiGamepadLine className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      title: 'Dashboard',
      description: 'View your progress',
      href: '/dashboard',
      icon: <RiCompassLine className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      title: 'Leaderboard',
      description: 'See top performers',
      href: '/leaderboard',
      icon: <RiStarLine className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon 
          icon={<RiPlantLine className="h-12 w-12" />} 
          delay={0}
          duration={4}
        />
        <FloatingIcon 
          icon={<RiLeafLine className="h-8 w-8" />} 
          delay={1}
          duration={3.5}
        />
        <FloatingIcon 
          icon={<RiFlowerLine className="h-10 w-10" />} 
          delay={2}
          duration={5}
        />
        <FloatingIcon 
          icon={<RiTreeLine className="h-14 w-14" />} 
          delay={0.5}
          duration={4.5}
        />
        
        {/* Position them around the screen */}
        <div className="absolute top-20 left-20">
          <FloatingIcon 
            icon={<RiLightbulbLine className="h-10 w-10" />} 
            delay={1.5}
            duration={3}
          />
        </div>
        <div className="absolute top-32 right-32">
          <FloatingIcon 
            icon={<RiRocketLine className="h-12 w-12" />} 
            delay={2.5}
            duration={4}
          />
        </div>
        <div className="absolute bottom-32 left-40">
          <FloatingIcon 
            icon={<RiBookOpenLine className="h-9 w-9" />} 
            delay={1}
            duration={3.5}
          />
        </div>
        <div className="absolute bottom-20 right-20">
          <FloatingIcon 
            icon={<RiMapPin2Line className="h-11 w-11" />} 
            delay={3}
            duration={4.2}
          />
        </div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
        {/* Main 404 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Large 404 with STEM styling */}
          <motion.div 
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-[8rem] md:text-[12rem] font-bold text-primary/20 leading-none">
              404
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <RiQuestionLine className="h-24 w-24 md:h-32 md:w-32 text-primary" />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <div className="space-y-4">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Oops! Page Not Found
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Looks like you've ventured off the learning path! This page seems to be playing hide and seek. 
              Let's get you back to exploring the exciting world of STEM education.
            </motion.p>
          </div>

          {/* Fun badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary">
              <RiCompassLine className="h-4 w-4 mr-2" />
              Lost Explorer Badge Earned! 🏆
            </Badge>
          </motion.div>
        </motion.div>

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {suggestedPages.map((page, index) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <Link href={page.href}>
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${page.color}`}>
                      {page.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
        >
          <Button 
            onClick={() => router.back()} 
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RiArrowLeftLine className="h-5 w-5" />
            Go Back
          </Button>
          
          <Link href="/">
            <Button size="lg" className="gap-2">
              <RiHome4Line className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/games">
            <Button variant="secondary" size="lg" className="gap-2">
              <RiGamepadLine className="h-5 w-5" />
              Explore Games
            </Button>
          </Link>
        </motion.div>

        {/* Fun facts section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="pt-12 border-t border-border/50"
        >
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
              <RiLightbulbLine className="h-5 w-5 text-primary" />
              Did You Know?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In rural Odisha, traditional knowledge systems have been teaching STEM concepts for centuries! 
              Our platform bridges this gap by combining modern gamification with time-tested learning principles.
            </p>
          </div>
        </motion.div>

        {/* Search suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2.2 }}
          className="pt-4"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <RiSearchLine className="h-4 w-4" />
            Try using the search feature or check your URL for typos
          </p>
        </motion.div>
      </div>
    </div>
  );
}