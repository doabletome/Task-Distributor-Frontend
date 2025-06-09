import { useEffect, useState } from "react";
import api from "../services/api";

export default function SubagentsPage() {
  const [subagents, setSubagents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/subagents/tasks");
        setSubagents(data);
      } catch (err) {
        setError("Could not load subagent tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading…</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  if (!subagents.length)
    return (
      <p className="text-center text-gray-600">No subagents or tasks found.</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subagents.map(({ subagent, tasks }) => (
        <div
          key={subagent.id}
          className="p-4 bg-white shadow rounded-lg hover:shadow-md transition"
        >
          {/* Subagent Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{subagent.name}</h3>
            <p className="text-gray-600 text-sm">{subagent.email}</p>
          </div>

          {/* Tasks List */}
          {tasks.length ? (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li
                  key={t._id}
                  className="p-2 bg-gray-50 rounded border border-gray-200"
                >
                  <p className="font-medium">{t.firstName}</p>
                  <p className="text-sm text-gray-700">{t.phone}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.notes}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No tasks assigned.</p>
          )}
        </div>
      ))}
    </div>
  );
}
