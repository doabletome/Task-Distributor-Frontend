// import { useState, useEffect } from "react";
// import api from "../services/api";

// export default function AgentsList({ role }) {
//   // State to manage agents, loading and error status
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 1) Pull fetchAgents out so both effect and retry button can use it
//   const fetchAgents = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       if (role === "admin") {
//         const { data } = await api.get("/agents");
//         setAgents(data);
//       } else if (role === "agent") {
//         const { data } = await api.get("/subagents");
//         setAgents(data);
//       }
//     } catch {
//       setError("Could not load agents");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2) Load on mount
//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   const handleEdit = async (id) => {
//     const agent = agents.find((a) => a._id === id);
//     if (!agent) return;

//     const name = window.prompt("Enter new name", agent.name);
//     const phone = window.prompt("Enter new phone", agent.phone);

//     if (!name || !phone) return;

//     try {
//       await api.put(`/subagents/${id}`, { name, phone });
//       await fetchAgents(); // reload updated data
//     } catch (err) {
//       alert("Failed to update agent");
//     }
//   };

//   // 3) Delete handler
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) {
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       if (role === "admin") {
//         await api.delete(`/agents/${id}`);
//       } else if (role === "agent") {
//         await api.delete(`/subagents/${id}`);
//       }

//       // Option A: reload list
//       await fetchAgents();
//       // Option B: remove from state without refetch:
//       // setAgents(prev => prev.filter(a => a._id !== id));
//     } catch {
//       setError("Failed to delete agent");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Display loading message
//   if (loading)
//     return <p className="text-center text-gray-500">Loading agents…</p>;

//   // Display error message with retry option
//   if (error)
//     return (
//       <div className="text-center text-red-600">
//         <p>{error}</p>
//         <button
//           onClick={fetchAgents}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );

//   // Display when no agents are found
//   if (!agents.length)
//     return <p className="text-center text-gray-600">No agents found.</p>;

//   // Render list of agents in a grid
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {agents.map((a) => (
//         <div
//           key={a._id}
//           className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
//         >
//           <span className="text-sm  text-red-300 font-bold">
//             {role === "agent" ? "SubAgent" : ""}
//           </span>
//           <h4 className="text-lg font-semibold mb-1">{a.name}</h4>
//           <p className="text-gray-700">
//             <strong>Email:</strong> {a.email}
//           </p>
//           <p className="text-gray-700">
//             <strong>Phone:</strong> {a.phone}
//           </p>
//           <div className="flex justify-evenly">
//             <button
//               onClick={() => handleDelete(a._id)}
//               className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//             >
//               {role === "agent" ? "Delete Subagent" : "Delete Agent"}
//             </button>
//             <button
//               onClick={() => handleEdit(a._id)}
//               className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import api from "../services/api";
import EditAgentModal from "../components/EditAgentModal";

export default function AgentsList({ role }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingAgent, setEditingAgent] = useState(null); // modal state

  const fetchAgents = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } =
        role === "admin"
          ? await api.get("/agents")
          : await api.get("/subagents");
      setAgents(data);
    } catch {
      setError("Could not load agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    try {
      await api.delete(`${role === "admin" ? "/agents" : "/subagents"}/${id}`);
      await fetchAgents();
    } catch {
      alert("Failed to delete agent");
    }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
  };

  const handleSave = async (id, updates) => {
    try {
      await api.put(`/subagents/${id}`, updates);
      setEditingAgent(null);
      await fetchAgents();
    } catch {
      alert("Update failed");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading agents…</p>;

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

  if (!agents.length)
    return <p className="text-center text-gray-600">No agents found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((a) => (
          <div
            key={a._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="text-sm text-red-300 font-bold">
              {role === "agent" ? "SubAgent" : ""}
            </span>
            <h4 className="text-lg font-semibold mb-1">{a.name}</h4>
            <p className="text-gray-700">
              <strong>Email:</strong> {a.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {a.phone}
            </p>
            <div className="flex justify-evenly">
              <button
                onClick={() => handleDelete(a._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                {role === "agent" ? "Delete Subagent" : "Delete Agent"}
              </button>
              <button
                onClick={() => handleEdit(a)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing */}
      <EditAgentModal
        isOpen={!!editingAgent}
        agent={editingAgent}
        onClose={() => setEditingAgent(null)}
        onSave={handleSave}
      />
    </>
  );
}
