'use client';

import { Suspense } from 'react';
import { GameCardSkeleton, InlineLoader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import { 
  RiPlayFill, 
  RiTimeLine, 
  RiStarFill, 
  RiLockLine, 
  RiCheckboxCircleFill 
} from 'react-icons/ri';

const GameCard = ({ game, category, onPlay }) => {
  // Simulate heavy component
  return (
    <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${category.color} text-white`}>
            {category.icon}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{game.title}</h3>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </div>
        </div>
        
        {game.unlocked ? (
          <RiCheckboxCircleFill className="h-5 w-5 text-green-500" />
        ) : (
          <RiLockLine className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <RiTimeLine className="h-4 w-4 text-muted-foreground" />
              <span>{game.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <RiStarFill className="h-4 w-4 text-yellow-500" />
              <span>{game.points} pts</span>
            </div>
          </div>
          <Badge variant={
            game.difficulty === 'easy' ? 'secondary' :
            game.difficulty === 'medium' ? 'default' : 'destructive'
          }>
            {game.difficulty}
          </Badge>
        </div>
        
        <button
          onClick={() => onPlay(game)}
          disabled={!game.unlocked}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md transition-colors"
        >
          <RiPlayFill className="h-4 w-4" />
          <span>{game.unlocked ? 'Play Now' : 'Locked'}</span>
        </button>
      </div>
    </div>
  );
};

export const LazyGameCard = ({ game, category, onPlay }) => (
  <Suspense fallback={<GameCardSkeleton />}>
    <GameCard game={game} category={category} onPlay={onPlay} />
  </Suspense>
);

export const LazyGameSection = ({ children }) => (
  <Suspense fallback={<InlineLoader message="Loading games..." className="py-12" />}>
    {children}
  </Suspense>
);

export default LazyGameCard;