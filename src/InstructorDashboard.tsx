import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure correct path to supabaseClient.ts

interface InstructorStats {
  total_students: number;
  promoted_students: number;
  pending_requests: number;
  average_belt_rank: string;
}

export default function InstructorDashboard() {
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch instructor stats when component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('instructor_stats') // Ensure this table exists and is accessible
          .select('*')
          .single();  // Adjust this query as needed for your schema

        if (error) {
          console.error('Error fetching stats:', error.message); // Log specific error
          throw new Error(error.message); // Handle the error more gracefully
        }

        setStats(data);
      } catch (error) {
        console.error('Something went wrong in the fetch:', error);  // Catch fetch errors
      } finally {
        setLoading(false);  // Set loading state to false once fetch completes
      }
    };

    fetchStats();
  }, []);  // Empty dependency array to run this effect only once after component mounts

  if (loading) {
    return <p className="p-4">Loading instructor stats...</p>;
  }

  if (!stats) {
    return <p className="p-4">No stats available.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-lg font-bold">{stats.total_students}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="text-sm text-gray-500">Promoted Students</p>
          <p className="text-lg font-bold">{stats.promoted_students}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <p className="text-sm text-gray-500">Pending Requests</p>
          <p className="text-lg font-bold">{stats.pending_requests}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-sm text-gray-500">Average Belt Rank</p>
          <p className="text-lg font-bold">{stats.average_belt_rank}</p>
        </div>
      </div>
    </div>
  );
}
