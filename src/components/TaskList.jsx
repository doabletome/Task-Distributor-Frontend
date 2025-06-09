import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
export default function TaskList() {
  // State variables to hold fetched data, loading status, and any error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch tasks when component mounts
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        // Decode JWT to extract user ID and role
        const token = localStorage.getItem("token");
        const { id, role } = JSON.parse(atob(token.split(".")[1]));

        // Make API call to get tasks assigned to the agent (or all if admin)
        const res = await api.get(`/tasks/agent/${id}`);
        console.log(res);

        // Save both role and payload (tasks or agent-task mapping)
        setData({ role, payload: res.data });
      } catch {
        // Handle any failure in fetching
        setError("Could not load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Show loading indicator
  if (loading) return <p className="text-center text-gray-500">Loading…</p>;

  // Show error message if API fails
  if (error) return <p className="text-center text-red-600">{error}</p>;

  // Destructure role and payload from state
  const { role, payload, userId } = data;

  // ----------- Agent View ------------
  // If logged-in user is an agent, render a flat list of tasks
  if (role === "agent") {
    if (!payload.length) {
      return <p className="text-center text-gray-600">No tasks assigned.</p>;
    }
    return (
      <div className="grid gap-6">
        {payload.map((t) => (
          <div
            key={t._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <h4 className="text-lg font-semibold text-gray-800">
              {t.firstName}
            </h4>
            <p className="text-gray-700">{t.phone}</p>
            <p className="text-gray-600 mt-1">{t.notes}</p>
          </div>
        ))}
        <Link to="/subagentTasks" className="font-bold text-sm text-red-300">
          SubAgents
        </Link>
      </div>
    );
  }

  // ----------- Admin View ------------
  // If logged-in user is an admin, render a grid of agents with their tasks
  if (role === "admin") {
    if (!payload.length) {
      return (
        <p className="text-center text-gray-600">No agents or tasks found.</p>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {payload.map(({ agent, tasks }) => (
          <div
            key={agent.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col"
          >
            {/* Agent details */}
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-800">{agent.name}</h4>
              <p className="text-gray-600 text-sm">{agent.email}</p>
            </div>

            {/* Tasks assigned to this agent */}
            {tasks.length ? (
              <ul className="space-y-2 overflow-auto">
                {tasks.map((t) => (
                  <li
                    key={t._id}
                    className="p-2 bg-gray-50 rounded border border-gray-200"
                  >
                    <p className="font-medium">{t.firstName}</p>
                    <p className="text-gray-700 text-sm">{t.phone}</p>
                    <p className="text-gray-600 text-xs mt-1">{t.notes}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No tasks assigned.</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ----------- Unknown Role Fallback ------------
  return <p className="text-center text-red-600">Unauthorized view.</p>;
}
