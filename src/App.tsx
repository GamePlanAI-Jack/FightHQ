import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PostVerification from './pages/PostVerificationSplash';
import FighterDashboard from './pages/FighterDashboard';
import AnnotatorDashboard from './pages/AnnotatorDashboard';
import Account from "@/pages/Account";
import Welcome from "@/pages/Welcome";
import { ProtectedRoute } from "@/components/Routing/ProtectedRoute";
import InstructorDashboard from './pages/InstructorDashboard';
import { PublicOnlyRoute } from "@/components/Routing/PublicOnlyRoute";
import './index.css'; 




const TestProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return children;
};

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!error) setUserData(data);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Redirect root to welcome */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
  
        {/* Public pages */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post-verification" element={<PostVerification />} />
  
        {/* Dashboards */}
        <Route path="/fighter-dashboard" element={<FighterDashboard />} />
        <Route path="/annotator-dashboard" element={<AnnotatorDashboard />} />
        
        {/* Protected instructor-only dashboard */}
        <Route path="/instructor-dashboard" element={<ProtectedRoute allowedRoles={["instructor"]}>
          <InstructorDashboard />
            </ProtectedRoute>
  }
/>

        {/* Auth route, only for users who are NOT logged in */}
        <Route
          path="/auth"
          element={
            <PublicOnlyRoute>
              <Auth />
            </PublicOnlyRoute>
          }
        />
  
        {/* Legacy login/signup redirects */}
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />
  
        {/* Fallback for unknown routes */}
        <Route
          path="*"
          element={<div className="text-center text-white p-10">404 — Page not found</div>}
        />
      </Routes>
    </Router>
  );
}
