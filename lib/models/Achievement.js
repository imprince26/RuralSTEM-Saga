import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true
  },
  icon: {
    type: String,
    default: '🏆'
  },
  category: {
    type: String,
    required: true,
    enum: ['mathematics', 'science', 'technology', 'engineering', 'general']
  },
  type: {
    type: String,
    required: true,
    enum: [
      'first_game', 'perfect_score', 'speed_demon', 'streak_master',
      'category_master', 'dedication', 'explorer', 'perfectionist',
      'time_saver', 'comeback_kid', 'consistent_player'
    ]
  },
  criteria: {
    gameId: String,
    minScore: Number,
    maxTime: Number, // in seconds
    minStreak: Number,
    gamesCompleted: Number,
    categoryGames: Number
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  points: {
    type: Number,
    default: 10,
    min: 1
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
AchievementSchema.index({ userId: 1, category: 1 });
AchievementSchema.index({ userId: 1, type: 1 });
AchievementSchema.index({ userId: 1, earnedAt: -1 });
AchievementSchema.index({ rarity: 1 });

// Static method to check and award achievements
AchievementSchema.statics.checkAndAward = async function(userId, gameProgress) {
  const achievements = [];
  
  // First game achievement
  const firstGameExists = await this.findOne({ userId, type: 'first_game' });
  if (!firstGameExists) {
    achievements.push({
      userId,
      title: 'First Steps',
      description: 'Completed your first game!',
      icon: '🎯',
      category: 'general',
      type: 'first_game',
      rarity: 'common',
      points: 10
    });
  }
  
  // Perfect score achievement
  if (gameProgress.accuracy === 100) {
    const perfectScoreExists = await this.findOne({ 
      userId, 
      type: 'perfect_score', 
      'criteria.gameId': gameProgress.gameId 
    });
    if (!perfectScoreExists) {
      achievements.push({
        userId,
        title: 'Perfect Score!',
        description: `Got 100% in ${gameProgress.gameId}`,
        icon: '💯',
        category: gameProgress.category,
        type: 'perfect_score',
        criteria: { gameId: gameProgress.gameId },
        rarity: 'rare',
        points: 25
      });
    }
  }
  
  // Speed demon achievement (completed in less than 2 minutes)
  if (gameProgress.timeSpent < 120 && gameProgress.completed) {
    const speedExists = await this.findOne({ 
      userId, 
      type: 'speed_demon',
      'criteria.gameId': gameProgress.gameId
    });
    if (!speedExists) {
      achievements.push({
        userId,
        title: 'Speed Demon',
        description: `Completed ${gameProgress.gameId} in under 2 minutes!`,
        icon: '⚡',
        category: gameProgress.category,
        type: 'speed_demon',
        criteria: { gameId: gameProgress.gameId, maxTime: 120 },
        rarity: 'epic',
        points: 50
      });
    }
  }
  
  // Streak master achievement
  if (gameProgress.streak >= 5) {
    const streakExists = await this.findOne({ 
      userId, 
      type: 'streak_master',
      'criteria.minStreak': { $lte: gameProgress.streak }
    });
    if (!streakExists) {
      achievements.push({
        userId,
        title: 'Streak Master',
        description: `Achieved a ${gameProgress.streak} question streak!`,
        icon: '🔥',
        category: gameProgress.category,
        type: 'streak_master',
        criteria: { minStreak: gameProgress.streak },
        rarity: gameProgress.streak >= 10 ? 'legendary' : 'epic',
        points: gameProgress.streak >= 10 ? 100 : 75
      });
    }
  }
  
  // Save all new achievements
  if (achievements.length > 0) {
    await this.insertMany(achievements);
  }
  
  return achievements;
};

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);