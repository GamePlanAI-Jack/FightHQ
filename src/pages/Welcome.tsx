import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeProvider";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

type UserProfile = {
  first_name: string;
  belt_rank: string;
  email: string;
  roles: string[]; // Array of role names
};

type Role = {
  name: string; // Role name (e.g., 'instructor')
};

export default function Welcome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isInstructor, setIsInstructor] = useState(false); // To track if user is instructor

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Fetch the profile data from the 'users' table
      const { data, error } = await supabase
        .from("users")
        .select("first_name, belt_rank, email")
        .eq("id", user.id)
        .single();

      // Check if user has 'instructor' role
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("roles(name)") // Get the 'name' field from the 'roles' table
        .eq("user_id", user.id);

      if (rolesError) {
        console.error("Error fetching roles:", rolesError.message);
        return;
      }

      // Fix: Ensure roles is typed as an array of Role objects
      const userRoles: string[] = roles?.flatMap((role: { roles: { name: string }[] }) => role.roles.map((r) => r.name)) || [];

      if (userRoles.includes("instructor")) {
        setIsInstructor(true); // Set instructor role flag
      }

      if (!error && data) {
        setProfile({ ...data, roles: userRoles });
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white px-6 py-10 relative">
      {/* Top Right Menu */}
      <div className="absolute top-4 right-6 flex gap-4 items-center">
        <button
          onClick={() => navigate("/account-settings")}
          className="text-sm text-gray-300 hover:text-white transition"
        >
          Account Settings
        </button>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome back{profile?.first_name ? `, ${profile.first_name}` : ""} 👋
        </h1>
        <p className="text-lg text-gray-300 text-center mb-8 max-w-xl">
          Glad to see you again. Choose where you want to go:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <Button
            className="h-32 text-xl font-semibold rounded-2xl"
            onClick={() => navigate("/fighter-dashboard")}
          >
            Fighter Dashboard
          </Button>

          <Button
            className="h-32 text-xl font-semibold rounded-2xl"
            variant="outline"
            onClick={() => navigate("/annotator-dashboard")}
          >
            Annotator Dashboard
          </Button>

          <Button
            className="h-32 text-xl font-semibold rounded-2xl"
            variant="secondary"
            onClick={() => navigate("/gym-owner-dashboard")}
          >
            Gym Owner Dashboard
          </Button>

          {/* Conditionally render the Instructor Dashboard button */}
          {isInstructor && (
            <Button
              className="h-32 text-xl font-semibold rounded-2xl"
              variant="outline"
              onClick={() => navigate("/instructor-dashboard")}
            >
              Instructor Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const { theme, toggleTheme } = useTheme();

<button
  onClick={toggleTheme}
  className="fixed bottom-4 right-4 px-3 py-2 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md transition"
>
  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
