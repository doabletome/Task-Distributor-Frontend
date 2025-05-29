import { useState, useEffect } from "react";
import api from "../services/api";

export default function AgentsList() {
  // State to manage agents, loading and error status
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch agents from backend
    const fetchAgents = async () => {
      setLoading(true);
      setError("");
      try {
        // GET request to /agents
        const { data } = await api.get("/agents");
        setAgents(data);
      } catch {
        setError("Could not load agents");
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Display loading message
  if (loading)
    return <p className="text-center text-gray-500">Loading agents…</p>;

  // Display error message with retry option
  if (error)
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchAgents}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  // Display when no agents are found
  if (!agents.length)
    return <p className="text-center text-gray-600">No agents found.</p>;

  // Render list of agents in a grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((a) => (
        <div
          key={a._id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <h4 className="text-lg font-semibold mb-1">{a.name}</h4>
          <p className="text-gray-700">
            <strong>Email:</strong> {a.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {a.phone}
          </p>
        </div>
      ))}
    </div>
  );
}
