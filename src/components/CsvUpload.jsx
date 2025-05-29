import { useState, useCallback } from "react";
import api from "../services/api";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Read user role from localStorage
  const role = localStorage.getItem("role");

  // Validate uploaded file type and size
  const validateFile = (f) => {
    if (!f) return "Select a file.";
    if (!f.name.match(/\.(csv|xls|xlsx)$/)) return "Must be .csv/.xls/.xlsx";
    if (f.size > 5e6) return "Max size is 5MB.";
    return "";
  };

  // Handle file selection
  const pickFile = (f) => {
    const e = validateFile(f);
    setError(e);
    setFile(e ? null : f);
    setMsg("");
  };

  // Input file change handler
  const onFileChange = (e) => pickFile(e.target.files[0]);

  // Drag and drop handler
  const onDrop = useCallback((e) => {
    e.preventDefault();
    pickFile(e.dataTransfer.files[0]);
  }, []);

  // Form submit handler
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    // Prevent agents from uploading files
    if (role !== "admin") {
      return setError("Only admins can upload and distribute tasks.");
    }

    // Validate selected file
    const ve = validateFile(file);
    if (ve) return setError(ve);

    setLoading(true);
    try {
      // Send file to backend
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/tasks/upload", fd);
      setMsg(`✅ Distributed ${data.distributed} items`);
      setFile(null); // Clear file input
    } catch (err) {
      setError(err.response?.data.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg"
    >
      {/* Form heading */}
      <h2 className="text-2xl mb-4 text-center font-semibold">
        Upload Leads CSV
      </h2>

      {/* Error or success messages */}
      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}
      {msg && (
        <p className="text-green-600 bg-green-100 p-2 rounded mb-4">{msg}</p>
      )}

      {/* File input label with drag & drop */}
      <label
        htmlFor="upload"
        className={`block p-6 mb-4 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          error ? "border-red-400" : "border-gray-300"
        } ${loading && "opacity-50 cursor-not-allowed"}`}
      >
        {file ? file.name : "Click or drop file here"}
        <input
          id="upload"
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={onFileChange}
          disabled={loading}
          className="hidden"
        />
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading…" : "Upload & Distribute"}
      </button>
    </form>
  );
}
