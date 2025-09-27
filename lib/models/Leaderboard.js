import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['mathematics', 'science', 'technology', 'engineering', 'overall']
  },
  period: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'all-time']
  },
  totalScore: {
    type: Number,
    required: true,
    default: 0
  },
  gamesPlayed: {
    type: Number,
    required: true,
    default: 0
  },
  averageScore: {
    type: Number,
    required: true,
    default: 0
  },
  timeSpent: {
    type: Number,
    required: true,
    default: 0 // in minutes
  },
  rank: {
    type: Number,
    required: true,
    min: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  periodStart: {
    type: Date,
    required: true
  },
  periodEnd: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
LeaderboardSchema.index({ category: 1, period: 1, rank: 1 });
LeaderboardSchema.index({ userId: 1, category: 1, period: 1 });
LeaderboardSchema.index({ period: 1, lastUpdated: -1 });
LeaderboardSchema.index({ totalScore: -1 });

// Static method to update leaderboard
LeaderboardSchema.statics.updateLeaderboard = async function(category = 'overall', period = 'all-time') {
  const GameProgress = mongoose.models.GameProgress;
  
  let matchCondition = {};
  let periodStart, periodEnd;
  
  // Set period dates
  const now = new Date();
  switch (period) {
    case 'daily':
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      periodEnd = new Date(periodStart.getTime() + 24 * 60 * 60 * 1000);
      matchCondition.createdAt = { $gte: periodStart, $lt: periodEnd };
      break;
    case 'weekly':
      const weekStart = now.getDate() - now.getDay();
      periodStart = new Date(now.getFullYear(), now.getMonth(), weekStart);
      periodEnd = new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      matchCondition.createdAt = { $gte: periodStart, $lt: periodEnd };
      break;
    case 'monthly':
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      matchCondition.createdAt = { $gte: periodStart, $lt: periodEnd };
      break;
    case 'all-time':
      periodStart = new Date('2024-01-01');
      periodEnd = now;
      break;
  }
  
  // Add category filter if not overall
  if (category !== 'overall') {
    matchCondition.category = category;
  }
  
  // Aggregate user scores
  const results = await GameProgress.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: '$userId',
        totalScore: { $sum: '$score' },
        gamesPlayed: { $sum: 1 },
        averageScore: { $avg: '$score' },
        timeSpent: { $sum: { $divide: ['$timeSpent', 60] } } // Convert to minutes
      }
    },
    { $sort: { totalScore: -1, averageScore: -1 } }
  ]);
  
  // Clear existing leaderboard entries for this category and period
  await this.deleteMany({ category, period });
  
  // Create new leaderboard entries
  const leaderboardEntries = results.map((result, index) => ({
    userId: result._id,
    category,
    period,
    totalScore: result.totalScore,
    gamesPlayed: result.gamesPlayed,
    averageScore: Math.round(result.averageScore * 100) / 100,
    timeSpent: Math.round(result.timeSpent),
    rank: index + 1,
    periodStart,
    periodEnd
  }));
  
  if (leaderboardEntries.length > 0) {
    await this.insertMany(leaderboardEntries);
  }
  
  return leaderboardEntries;
};

// Static method to get top players
LeaderboardSchema.statics.getTopPlayers = function(category = 'overall', period = 'all-time', limit = 10) {
  return this.find({ category, period })
    .populate('userId', 'name profileImage grade')
    .sort({ rank: 1 })
    .limit(limit);
};

// Static method to get user's rank
LeaderboardSchema.statics.getUserRank = function(userId, category = 'overall', period = 'all-time') {
  return this.findOne({ userId, category, period })
    .populate('userId', 'name profileImage grade');
};

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);