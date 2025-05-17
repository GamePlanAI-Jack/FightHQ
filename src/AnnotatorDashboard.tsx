// src/components/AnnotatorDashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';

interface AnnotatorStats {
  id: string;
  annotations_completed: number;
  accuracy_score: number;
  flagged_annotations: number;
}

export default function AnnotatorDashboard() {
  const [stats, setStats] = useState<AnnotatorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data,
        error
      } = await supabase
        .from('annotator_stats')
        .select('*')
        .single(); // Adjust for logged-in annotator identity if needed

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
    return <p className="p-4">Loading annotator stats...</p>;
  }

  if (!stats) {
    return <p className="p-4">No stats available.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Annotator Dashboard</h2>
      <div className="grid grid-cols-2 gap
