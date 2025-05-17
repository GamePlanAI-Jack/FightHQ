import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Spinner } from "@/components/ui/Spinner"; 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <Spinner />;

  return isLoggedIn ? <Navigate to="/welcome" replace /> : children;
};
