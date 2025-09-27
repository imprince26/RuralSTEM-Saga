import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { Leaderboard } from '@/lib/models';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'overall';
    const period = searchParams.get('period') || 'all-time';
    const limit = parseInt(searchParams.get('limit')) || 10;
    const userId = searchParams.get('userId');

    // Update leaderboard first
    await Leaderboard.updateLeaderboard(category, period);

    // Get top players
    const topPlayers = await Leaderboard.getTopPlayers(category, period, limit);

    let userRank = null;
    if (userId) {
      userRank = await Leaderboard.getUserRank(userId, category, period);
    }

    return NextResponse.json(
      {
        topPlayers,
        userRank,
        category,
        period
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { category = 'overall', period = 'all-time' } = await request.json();

    // Manually trigger leaderboard update
    const leaderboardEntries = await Leaderboard.updateLeaderboard(category, period);

    return NextResponse.json(
      {
        message: 'Leaderboard updated successfully',
        entriesCount: leaderboardEntries.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Leaderboard update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}