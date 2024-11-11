export interface LeaderboardResponse {
  msg: string;
  leaderboard: {
    user_id: string;
    totalPoints: string;
    rank: string;
  }[];
}
