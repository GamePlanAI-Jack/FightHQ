import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  belt_rank: string;
  years_training: number;
  stripes: number;
  gym_name: string;
  avatar_url: string;
};

const beltOptions = ["White", "Blue", "Purple", "Brown", "Black"];

export default function Account() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [newGym, setNewGym] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: keyof UserProfile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && profile) {
      const { error } = await supabase
        .from("users")
        .update(profile)
        .eq("id", user.id);

      if (error) {
        setStatus("Error saving profile.");
      } else {
        setStatus("Profile updated successfully.");
      }
    }

    setSaving(false);
  };

  const handlePasswordReset = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.auth.resetPasswordForEmail(user.email);
      setStatus("Password reset email sent.");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const filePath = `avatars/${user.id}.png`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setStatus("Avatar upload failed.");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    if (urlData?.publicUrl) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: urlData.publicUrl })
        .eq("id", user.id);

      if (!updateError) {
        setProfile({ ...profile, avatar_url: urlData.publicUrl });
        setStatus("Avatar updated successfully.");
      }
    }
  };

  const handleGymSwitchRequest = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && newGym.trim()) {
      const { error } = await supabase.from("gym_switch_requests").insert({
        user_id: user.id,
        requested_gym: newGym.trim(),
      });

      if (!error) {
        setStatus("Gym switch request submitted.");
        setNewGym("");
      } else {
        setStatus("Failed to submit gym switch request.");
      }
    }
  };

  if (!profile) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-600"
            />
          )}
          <div>
            <Input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm">First Name</label>
          <Input
            value={profile.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Last Name</label>
          <Input
            value={profile.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <Input value={profile.email} disabled className="opacity-50" />
        </div>

        <div>
          <label className="block mb-1 text-sm">Belt Rank</label>
          <select
            value={profile.belt_rank}
            onChange={(e) => handleChange("belt_rank", e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-full text-white"
          >
            {beltOptions.map((rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Years Training</label>
          <Input
            type="number"
            value={profile.years_training}
            onChange={(e) =>
              handleChange("years_training", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Stripes</label>
          <Input
            type="number"
            value={profile.stripes}
            onChange={(e) => handleChange("stripes", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Gym</label>
          <Input value={profile.gym_name} disabled className="opacity-50" />
        </div>

        <div className="mt-2">
          <label className="block mb-1 text-sm">Request Gym Switch</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter new gym name"
              value={newGym}
              onChange={(e) => setNewGym(e.target.value)}
            />
            <Button variant="outline" onClick={handleGymSwitchRequest}>
              Submit
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={handlePasswordReset}>
            Send Password Reset Email
          </Button>
        </div>

        {status && (
          <div className="text-sm text-green-400 mt-4">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
