// src/components/AnnotationApp.tsx
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient.ts';

interface Annotation {
  id: string;
  match_id: string;
  timestamp: number;
  action: string;
}

export default function AnnotationApp() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [action, setAction] = useState('');
  const [matchId, setMatchId] = useState('');
  const [timestamp, setTimestamp] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnnotations = async () => {
      const { data, error } = await supabase
        .from('annotations')
        .select('*');

      if (error) {
        console.error('Error fetching annotations:', error.message);
      } else {
        setAnnotations(data || []);
      }
    };

    fetchAnnotations();
  }, []);

  const submitAnnotation = async () => {
    if (!matchId || !action) return;

    setLoading(true);

    const { data, error } = await supabase.from('annotations').insert([
      {
        match_id: matchId,
        timestamp,
        action,
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Error submitting annotation: ' + error.message);
    } else {
      setAction('');
      setTimestamp(0);
      setAnnotations((prev) => [...prev, ...(data || [])]);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Annotation Tool</h2>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Match ID"
          className="w-full p-2 border rounded"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Timestamp (seconds)"
          className="w-full p-2 border rounded"
          value={timestamp}
          onChange={(e) => setTimestamp(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Action Description"
          className="w-full p-2 border rounded"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <button
          onClick={submitAnnotation}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Annotation'}
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Submitted Annotations</h3>
      <ul className="space-y-2">
        {annotations.map((a) => (
          <li key={a.id} className="p-2 border rounded">
            <strong>Match:</strong> {a.match_id} | <strong>Time:</strong> {a.timestamp}s | <strong>Action:</strong> {a.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
