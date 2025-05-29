import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// LoginForm component handles the admin login form UI and logic
export default function LoginForm() {
  // State hooks for form inputs and status flags
  const [email, setEmail] = useState(""); // stores the email input
  const [password, setPassword] = useState(""); // stores the password input
  const [error, setError] = useState(""); // stores any error message to display
  const [loading, setLoading] = useState(false); // indicates whether a login request is in flight

  const nav = useNavigate(); // React Router hook to programmatically navigate

  // Form submit handler
  const submit = async (e) => {
    e.preventDefault(); // prevent default form postback
    setError(""); // clear any existing error
    setLoading(true); // show loading state

    try {
      // Send login request to backend
      const { data } = await api.post("/auth/login", { email, password });

      // On success, store the JWT token and user role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect to the Agents page
      nav("/agents");
    } catch (err) {
      // On failure, display the error message from server or a fallback
      setError(err.response?.data.message || "Login failed");
    } finally {
      setLoading(false); // reset loading state
    }
  };

  return (
    <form
      onSubmit={submit} // attach our submit handler
      className="max-w-md p-10 bg-gray-100 rounded-lg shadow-lg"
    >
      {/* Form heading */}
      <h2 className="text-3xl mb-6 text-center font-bold text-gray-800">
        Login Page
      </h2>

      {/* Error banner, shown only if error state is non-empty */}
      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      {/* Email input */}
      <label className="block mb-4">
        <span className="text-gray-700">Email</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // update email state on change
          required
          disabled={loading} // disable when loading
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </label>

      {/* Password input */}
      <label className="block mb-6">
        <span className="text-gray-700">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // update password state on change
          required
          minLength={6} // enforce minimum length
          disabled={loading} // disable when loading
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </label>

      {/* Submit button, centered and sized */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading} // disable while request is in flight
          className={`px-6 py-2 text-white rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed" // greyed out during loading
              : "bg-blue-600 hover:bg-blue-700" // blue normally, darker on hover
          }`}
        >
          {/* Show spinner text or Login */}
          {loading ? "Logging in…" : "Login"}
        </button>
      </div>
    </form>
  );
}
