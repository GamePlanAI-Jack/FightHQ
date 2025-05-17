import React, { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemedLineChart } from "@/components/charts/ThemedLineChart";
import { Input } from "@/components/ui/Input";
import { saveAs } from "file-saver";
import toast, { Toaster } from "react-hot-toast";

// Define types for better type safety
type Student = {
  id: string;
  first_name: string;
  last_name: string;
  belt_rank: string;
  stripes: number;
  time_training: string;
};

type Request = {
  id: string;
  user_id: string;
  requested_gym: string;
  status: string;
  created_at: string;
};

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export default function InstructorDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [chartData, setChartData] = useState<{ belt: string; count: number }[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("users")
          .select("gym_id")
          .eq("id", user.id)
          .single();

        const gym_id = profile?.gym_id;

        const { data: gymStudents, error: studentsError } = await supabase
          .from("users")
          .select("id, first_name, last_name, belt_rank, stripes, time_training")
          .eq("gym_id", gym_id)
          .neq("id", user.id);

        if (studentsError) throw new Error(studentsError.message);

        const { data: switchRequests, error: requestsError } = await supabase
          .from("gym_switch_requests")
          .select("id, user_id, requested_gym, status, created_at")
          .eq("status", "pending");

        if (requestsError) throw new Error(requestsError.message);

        setStudents(gymStudents || []);
        setFilteredStudents(gymStudents || []);
        setRequests(switchRequests || []);
        setChartData(prepareChartData(gymStudents || []));
      } catch (error) {
        toast.error("Error fetching data: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = (students: Student[]) => {
    const belts = ["White", "Blue", "Purple", "Brown", "Black"];
    return belts.map((belt) => ({
      belt,
      count: students.filter((s) => s.belt_rank === belt).length,
    }));
  };

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    const filtered = students.filter((s) => {
      const name = `${s.first_name} ${s.last_name}`.toLowerCase();
      return name.includes(text.toLowerCase()) || s.belt_rank.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredStudents(filtered);
  }, [students]);

  const handleRequestAction = async (id: string, status: "approved" | "rejected") => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`)) return;

    try {
      const { error } = await supabase
        .from("gym_switch_requests")
        .update({ status })
        .eq("id", id);

      if (error) throw new Error(error.message);

      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast.success(`Request ${status}`);
    } catch (error) {
      toast.error(`Failed to ${status} request: ${(error as Error).message}`);
    }
  };

  const handlePromotion = async (userId: string, newBelt: string) => {
    if (!window.confirm(`Promote to ${newBelt}?`)) return;

    try {
      const { error } = await supabase.from("users").update({ belt_rank: newBelt }).eq("id", userId);
      if (error) throw new Error(error.message);

      setStudents((prev) => prev.map((s) => (s.id === userId ? { ...s, belt_rank: newBelt } : s)));
      setFilteredStudents((prev) => prev.map((s) => (s.id === userId ? { ...s, belt_rank: newBelt } : s)));
      setChartData(prepareChartData(students));
      toast.success("Promotion successful");
    } catch (error) {
      toast.error("Promotion failed: " + (error as Error).message);
    }
  };

  const handleExportCSV = () => {
    const headers = ["First Name", "Last Name", "Belt", "Stripes", "Years Training"];
    const rows = filteredStudents.filter((s) => selectedStudents.has(s.id)).map((s) => [
      s.first_name,
      s.last_name,
      s.belt_rank,
      s.stripes,
      s.time_training,
    ]);

    if (rows.length === 0) return toast.error("No students selected");

    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "students.csv");
    toast.success("CSV exported");
  };

  const toggleSelect = (id: string) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

      {loading ? (
        <p className="text-gray-400">Loading data...</p>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Gym Belt Distribution</h2>
            <ThemedLineChart data={chartData} dataKey="count" xKey="belt" label="Students" />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <Input
              placeholder="Search students by name or belt"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button variant="secondary" onClick={handleExportCSV}>
              Export Selected
            </Button>
          </div>

          <div className="overflow-x-auto mb-10">
            <table className="min-w-full table-auto border border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-left text-sm">
                  <th className="p-3">Select</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Belt</th>
                  <th className="p-3">Stripes</th>
                  <th className="p-3">Years Training</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleSelect(student.id)}
                      />
                    </td>
                    <td className="p-3">{student.first_name} {student.last_name}</td>
                    <td className="p-3">{student.belt_rank}</td>
                    <td className="p-3">{student.stripes}</td>
                    <td className="p-3">{student.time_training}</td>
                    <td className="p-3">
                      <select
                        onChange={(e) => handlePromotion(student.id, e.target.value)}
                        defaultValue=""
                        className="bg-gray-800 text-white text-sm px-2 py-1 rounded"
                      >
                        <option value="" disabled>Promote...</option>
                        {["White", "Blue", "Purple", "Brown", "Black"].map((belt) => (
                          <option key={belt} value={belt}>{belt}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Pending Gym Switch Requests</h2>
            {requests.length === 0 ? (
              <p className="text-gray-400">No pending requests.</p>
            ) : (
              <ul className="space-y-4">
                {requests.map((req) => (
                  <li
                    key={req.id}
                    className="border border-gray-700 p-3 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p><span className="text-sm">User ID:</span> {req.user_id}</p>
                      <p><strong>{req.requested_gym}</strong> — <span className="text-xs text-gray-400">{new Date(req.created_at).toLocaleDateString()}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleRequestAction(req.id, "approved")}>Approve</Button>
                      <Button variant="destructive" onClick={() => handleRequestAction(req.id, "rejected")}>Reject</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button variant="secondary" onClick={() => navigate("/account")}>Account Settings</Button>
        </>
      )}
    </div>
  );
}
