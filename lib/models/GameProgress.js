import mongoose from 'mongoose';

const GameProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: String,
    required: [true, 'Game ID is required'],
    enum: [
      // Mathematics games
      'algebra-adventure', 'basic-arithmetic', 'fraction-pizza', 'geometry-builder',
      'graph-explorer', 'number-quest', 'pattern-master', 'probability-casino',
      // Science games
      'atom-builder', 'biology-explorer', 'chemistry-lab', 'ecosystem-manager',
      'periodic-table', 'physics-lab', 'solar-system', 'weather-wizard',
      // Technology games
      'ai-trainer', 'algorithm-arena', 'app-architect', 'code-creator',
      'coding-basics', 'database-detective', 'digital-citizen', 'web-designer',
      // Engineering games
      'bridge-builder', 'circuit-master', 'city-planner', 'green-engineer',
      'material-tester', 'robot-builder', 'rocket-designer', 'simple-machines'
    ]
  },
  category: {
    type: String,
    required: true,
    enum: ['mathematics', 'science', 'technology', 'engineering']
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  maxScore: {
    type: Number,
    required: true,
    min: 0
  },
  questionsAttempted: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  timeSpent: {
    type: Number,
    required: true,
    min: 0 // in seconds
  },
  completed: {
    type: Boolean,
    default: false
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  hintsUsed: {
    type: Number,
    default: 0,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  achievements: [{
    name: String,
    description: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  gameSession: {
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date
    },
    attempts: {
      type: Number,
      default: 1
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for accuracy percentage
GameProgressSchema.virtual('accuracy').get(function() {
  if (this.totalQuestions === 0) return 0;
  return Math.round((this.score / this.maxScore) * 100);
});

// Virtual for completion percentage
GameProgressSchema.virtual('completionRate').get(function() {
  if (this.totalQuestions === 0) return 0;
  return Math.round((this.questionsAttempted / this.totalQuestions) * 100);
});

// Virtual for time spent in minutes
GameProgressSchema.virtual('timeSpentMinutes').get(function() {
  return Math.round(this.timeSpent / 60);
});

// Indexes for better query performance
GameProgressSchema.index({ userId: 1, gameId: 1 });
GameProgressSchema.index({ userId: 1, category: 1 });
GameProgressSchema.index({ userId: 1, score: -1 });
GameProgressSchema.index({ userId: 1, createdAt: -1 });
GameProgressSchema.index({ gameId: 1, score: -1 });

// Ensure one active session per user per game
GameProgressSchema.index({ userId: 1, gameId: 1, completed: 1 });

// Pre-save middleware to update completion status
GameProgressSchema.pre('save', function(next) {
  if (this.questionsAttempted >= this.totalQuestions) {
    this.completed = true;
    this.gameSession.completedAt = new Date();
  }
  next();
});

// Static method to get user's best score for a game
GameProgressSchema.statics.getBestScore = function(userId, gameId) {
  return this.findOne({ userId, gameId })
    .sort({ score: -1 })
    .select('score maxScore accuracy timeSpent');
};

// Static method to get user's game statistics
GameProgressSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$category',
        totalGames: { $sum: 1 },
        completedGames: { $sum: { $cond: ['$completed', 1, 0] } },
        totalScore: { $sum: '$score' },
        totalMaxScore: { $sum: '$maxScore' },
        totalTimeSpent: { $sum: '$timeSpent' },
        averageAccuracy: { $avg: '$accuracy' },
        bestStreak: { $max: '$streak' }
      }
    }
  ]);
};

export default mongoose.models.GameProgress || mongoose.model('GameProgress', GameProgressSchema);