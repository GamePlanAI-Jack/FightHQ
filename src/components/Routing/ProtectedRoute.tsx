import React, { useEffect, useState, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps): ReactElement => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user", error.message);
        setRole(null);
      }

      if (user) {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        setRole(data?.role || null);
      }
      setLoading(false);
    };

    fetchRole();
  }, [location.pathname]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/welcome" replace />;

  return children;
};
