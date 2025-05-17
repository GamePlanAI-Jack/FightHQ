import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [belt, setBelt] = useState("White");
  const [stripes, setStripes] = useState(0);
  const [timeTraining, setTimeTraining] = useState("");
  const [gymName, setGymName] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Login successful!");
      } else {
        const {
          data: { user },
          error: signUpError,
        } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Gym lookup
        let gym_id: number | null = null;
        const gymLookup = await supabase
          .from("gyms")
          .select("id")
          .eq("name", gymName)
          .single();

        if (gymLookup.data) {
          gym_id = gymLookup.data.id;
        } else {
          const { data: newGym, error: gymInsertError } = await supabase
            .from("gyms")
            .insert({ name: gymName })
            .select()
            .single();

          if (gymInsertError) throw gymInsertError;
          gym_id = newGym.id;
        }

        const { error: profileInsertError } = await supabase.from("users").insert({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          dob,
          belt_rank: belt,
          stripes,
          time_training: parseFloat(timeTraining),
          gym_name: gymName,
          gym_referral_code: referralCode,
          gym_id,
        });

        if (profileInsertError) throw profileInsertError;

        setMessage("Signup successful! Please check your email to confirm.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center">
          {isLogin ? "Login to MatIQ" : "Create your MatIQ Account"}
        </h2>

        <div className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <div className="flex gap-4">
                <select
                  value={belt}
                  onChange={(e) => setBelt(e.target.value)}
                  className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white"
                >
                  <option>White</option>
                  <option>Blue</option>
                  <option>Purple</option>
                  <option>Brown</option>
                  <option>Black</option>
                </select>
                <input
                  type="number"
                  min={0}
                  max={4}
                  placeholder="Stripes"
                  value={stripes}
                  onChange={(e) => setStripes(parseInt(e.target.value))}
                  className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white"
                />
              </div>
              <input
                type="number"
                placeholder="Years Training"
                value={timeTraining}
                onChange={(e) => setTimeTraining(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Gym Name"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                placeholder="Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />

          <button
            onClick={handleAuth}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-indigo-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
