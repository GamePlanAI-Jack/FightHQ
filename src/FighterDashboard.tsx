// src/components/FighterDashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';

interface FighterStats {
  id: string;
  total_matches: number;
  wins: number;
  losses: number;
  submissions: number;
  escapes: number;
}

export default function FighterDashboard() {
  const [stats, setStats] = useState<FighterStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data,
        error
      } = await supabase
        .from('fighter_stats')
        .select('*')
        .single(); // Adjust this as needed for your schema

      if (error) {
        console.error('Error fetching stats:', error.message);
      } else {
        setStats(data);
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-4">Loading fighter stats...</p>;
  }

  if (!stats) {
    return <p className="p-4">No stats available.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fighter Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <p className="text-sm text-gray-500">Total Matches</p>
          <p className="text-lg font-bold">{stats.total_matches}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="text-sm text-gray-500">Wins</p>
          <p className="text-lg font-bold">{stats.wins}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <p className="text-sm text-gray-500">Losses</p>
          <p className="text-lg font-bold">{stats.losses}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-sm text-gray-500">Submissions</p>
          <p className="text-lg font-bold">{stats.submissions}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <p className="text-sm text-gray-500">Escapes</p>
          <p className="text-lg font-bold">{stats.escapes}</p>
        </div>
      </div>
    </div>
  );
}
