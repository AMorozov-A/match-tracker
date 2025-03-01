interface Player {
  username: string;
  kills: number;
}

interface Team {
  name: string;
  players: Player[];
  points: number;
  place: number;
  total_kills: number;
}

export type MatchStatus = 'Scheduled' | 'Ongoing' | 'Finished';

interface Match {
  time: string;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

interface ApiResponse {
  ok: boolean;
  data: {
    matches: Match[];
  };
}

const API_BASE_URL = 'https://app.ftoyd.com/fronttemp-service';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fronttemp`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = await response.json();

    if (!data.ok) {
      throw new Error('Failed to fetch matches');
    }

    return data.data.matches;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export type { Match, Player, Team };
