// components/EditAgentModal.jsx
import { useState, useEffect } from "react";

export default function EditAgentModal({ agent, isOpen, onClose, onSave }) {
  const [name, setName] = useState(agent?.name || "");
  const [phone, setPhone] = useState(agent?.phone || "");

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setPhone(agent.phone);
    }
  }, [agent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    onSave(agent._id, { name, phone });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Edit Agent</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Phone:
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
