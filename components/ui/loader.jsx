'use client';

import { motion } from 'framer-motion';
import { 
  RiPlantLine,
  RiLeafLine,
  RiFlowerLine,
  RiSeedlingLine,
  RiBookOpenLine,
  RiLightbulbLine,
  RiRocketLine,
  RiGamepadLine
} from 'react-icons/ri';

const LoadingSpinner = ({ size = "default" }) => {
  const sizes = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border-3 border-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-primary border-r-primary"></div>
    </motion.div>
  );
};

const FloatingIcon = ({ icon, delay = 0, className = "" }) => (
  <motion.div
    className={`absolute text-primary/30 ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {icon}
  </motion.div>
);

const GrowingPlant = () => {
  // Fallback CSS-only plant if icons fail to load
  const CSSPlant = () => (
    <motion.div 
      className="relative flex flex-col items-center justify-end h-24 w-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ground */}
      <motion.div
        className="absolute bottom-0 w-16 h-2 bg-amber-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Stem */}
      <motion.div
        className="w-1.5 bg-gradient-to-t from-green-600 to-green-500 rounded-full absolute bottom-2"
        initial={{ height: 0 }}
        animate={{ height: 50 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />
      
      {/* CSS Leaves */}
      <motion.div
        className="absolute bottom-10 -left-3 w-4 h-6 bg-green-500 rounded-full"
        style={{ clipPath: 'ellipse(50% 80% at 50% 100%)' }}
        initial={{ scale: 0, rotate: -60, opacity: 0 }}
        animate={{ scale: 1, rotate: -20, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      />
      
      <motion.div
        className="absolute bottom-8 -right-3 w-3 h-5 bg-green-400 rounded-full"
        style={{ clipPath: 'ellipse(50% 80% at 50% 100%)' }}
        initial={{ scale: 0, rotate: 60, opacity: 0 }}
        animate={{ scale: 1, rotate: 20, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
      />
      
      {/* CSS Flower */}
      <motion.div
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <div className="relative w-6 h-6">
          {/* Petals */}
          {[0, 72, 144, 216, 288].map((rotation, i) => (
            <div
              key={i}
              className="absolute w-2 h-3 bg-pink-500 rounded-full top-1/2 left-1/2 origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
              }}
            />
          ))}
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>
    </motion.div>
  );

  // Try to render with icons, fallback to CSS if needed
  try {
    return (
      <motion.div 
        className="relative flex flex-col items-center justify-end h-24 w-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ground/Soil */}
        <motion.div
          className="absolute bottom-0 w-16 h-2 bg-amber-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Stem */}
        <motion.div
          className="w-1.5 bg-gradient-to-t from-green-600 to-green-500 rounded-full absolute bottom-2 shadow-sm"
          initial={{ height: 0 }}
          animate={{ height: 50 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* First Leaf (Left side) */}
        <motion.div
          className="absolute bottom-10 -left-3"
          initial={{ scale: 0, rotate: -60, opacity: 0 }}
          animate={{ scale: 1, rotate: -20, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <RiLeafLine className="h-6 w-6 text-green-500 drop-shadow-sm" />
        </motion.div>
        
        {/* Second Leaf (Right side) */}
        <motion.div
          className="absolute bottom-8 -right-3"
          initial={{ scale: 0, rotate: 60, opacity: 0 }}
          animate={{ scale: 1, rotate: 20, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <RiLeafLine className="h-5 w-5 text-green-400 scale-x-[-1] drop-shadow-sm" />
        </motion.div>

        {/* Third Leaf (Left side, higher) */}
        <motion.div
          className="absolute bottom-6 -left-2"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: -15, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <RiLeafLine className="h-4 w-4 text-green-600 drop-shadow-sm" />
        </motion.div>

        {/* Flower */}
        <motion.div
          className="absolute bottom-14 left-1/2 transform -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <RiFlowerLine className="h-7 w-7 text-pink-500 drop-shadow-sm" />
          </motion.div>
        </motion.div>

        {/* Growing sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${40 + i * 10}%`,
              bottom: `${15 + i * 8}px`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
              y: [0, -10, -20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1 + i * 0.5,
              ease: "easeOut"
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
          </motion.div>
        ))}
      </motion.div>
    );
  } catch (error) {
    console.warn('React Icons failed to load, using CSS fallback');
    return <CSSPlant />;
  }
};

const PulsingDot = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`w-2 h-2 rounded-full bg-primary ${className}`}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const PageLoader = ({ 
  message = "Loading...", 
  type = "default",
  showProgress = false,
  progress = 0 
}) => {
  const renderLoader = () => {
    switch (type) {
      case "plant":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <GrowingPlant />
            </div>
            <motion.p
              className="text-muted-foreground text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {message}
            </motion.p>
          </div>
        );

      case "dots":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-2">
              <PulsingDot delay={0} />
              <PulsingDot delay={0.2} />
              <PulsingDot delay={0.4} />
            </div>
            <p className="text-muted-foreground text-lg font-medium">{message}</p>
          </div>
        );

      case "game":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-16 h-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RiGamepadLine className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            <p className="text-muted-foreground text-lg font-medium">{message}</p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center space-y-6">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground text-lg font-medium">{message}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon 
          icon={<RiSeedlingLine className="h-8 w-8" />} 
          delay={0}
          className="top-20 left-20"
        />
        <FloatingIcon 
          icon={<RiBookOpenLine className="h-6 w-6" />} 
          delay={1}
          className="top-32 right-32"
        />
        <FloatingIcon 
          icon={<RiLightbulbLine className="h-7 w-7" />} 
          delay={2}
          className="bottom-32 left-40"
        />
        <FloatingIcon 
          icon={<RiRocketLine className="h-9 w-9" />} 
          delay={0.5}
          className="bottom-20 right-20"
        />
      </div>

      {/* Main loader content */}
      <motion.div
        className="bg-card/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/50 max-w-sm w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {renderLoader()}
        
        {showProgress && (
          <motion.div
            className="mt-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Loading...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const InlineLoader = ({ 
  size = "default", 
  message,
  className = "" 
}) => (
  <div className={`flex items-center justify-center space-x-3 ${className}`}>
    <LoadingSpinner size={size} />
    {message && (
      <span className="text-muted-foreground font-medium">{message}</span>
    )}
  </div>
);

export const ButtonLoader = ({ 
  size = "sm",
  className = "" 
}) => (
  <LoadingSpinner size={size} />
);

// Skeleton loaders for specific content
export const GameCardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-muted rounded-full"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-muted rounded"></div>
      <div className="h-3 bg-muted rounded w-5/6"></div>
    </div>
    <div className="flex space-x-2">
      <div className="h-6 bg-muted rounded w-16"></div>
      <div className="h-6 bg-muted rounded w-20"></div>
    </div>
  </div>
);

export const UserCardSkeleton = () => (
  <div className="rounded-lg border bg-card p-4 animate-pulse">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 bg-muted rounded-full"></div>
      <div className="space-y-1 flex-1">
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="h-3 bg-muted rounded w-1/3"></div>
      </div>
    </div>
    <div className="h-3 bg-muted rounded w-full"></div>
  </div>
);

export default PageLoader;