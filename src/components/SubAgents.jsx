import { useState, useEffect } from "react";
import api from "../services/api";

export default function SubagentTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError("");
      try {
        // Decode JWT to get sub-agent's id (and role, if you want to guard)
        const token = localStorage.getItem("token");
        const { id, role } = JSON.parse(atob(token.split(".")[1]));

        if (role !== "subagent") {
          setError("Only sub-agents can view this page.");
        } else {
          const { data } = await api.get(`/tasks/agent/${id}`);
          setTasks(data);
        }
      } catch {
        setError("Could not load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p className="text-center">Loading tasks…</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!tasks.length)
    return <p className="text-center text-gray-600">No tasks assigned.</p>;

  return (
    <div className="grid gap-6">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="p-4 bg-white shadow rounded hover:shadow-md transition"
        >
          <h4 className="text-lg font-semibold">{t.firstName}</h4>
          <p className="text-gray-700">{t.phone}</p>
          <p className="text-gray-600 mt-1">{t.notes}</p>
        </div>
      ))}
    </div>
  );
}
