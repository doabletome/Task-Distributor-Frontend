// import { useState } from "react";
// import api from "../services/api";

// export default function AgentForm({ onAdded }) {
//   // State variables to manage form data, errors, messages, and loading status
//   const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Validate form fields before submission
//   const validate = () => {
//     const e = {};
//     if (!f.name.trim()) e.name = "Required.";
//     if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Invalid email.";
//     if (!f.phone.trim()) e.phone = "Required.";
//     if (f.password.length < 6) e.password = "Min 6 chars.";
//     return e;
//   };

//   // Handle form submission
//   const submit = async (e) => {
//     e.preventDefault();
//     setMsg("");

//     // Run validation
//     const ve = validate();
//     if (Object.keys(ve).length) return setErrors(ve);

//     setErrors({});
//     setLoading(true);
//     try {
//       // Send form data to backend to create a new agent
//       await api.post("/agents", f);
//       setMsg("Agent added ✅");
//       setF({ name: "", email: "", phone: "", password: "" }); // Clear form
//       onAdded(); // Callback to refresh list
//     } catch (err) {
//       setMsg(err.response?.data.message || "Error adding agent");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle field input change
//   const onChange = (key) => (e) => {
//     setF({ ...f, [key]: e.target.value });
//     setErrors({ ...errors, [key]: "" });
//     setMsg("");
//   };

//   return (
//     <form
//       onSubmit={submit}
//       className="max-w-md mx-auto mb-8 p-6 bg-gray-100 shadow-md rounded"
//     >
//       {/* Form heading */}
//       <h3 className="text-2xl mb-4 font-bold text-gray-800 text-center">
//         Add Agent
//       </h3>

//       {/* Success message */}
//       {msg && <p className="mb-4 text-green-600">{msg}</p>}

//       {/* Input fields */}
//       {["name", "email", "phone", "password"].map((field) => (
//         <div key={field} className="mb-4">
//           <label className="block mb-1 capitalize text-gray-700">{field}</label>
//           <input
//             type={field === "password" ? "password" : "text"}
//             value={f[field]}
//             onChange={onChange(field)}
//             className={`w-full p-2 border rounded focus:outline-none focus:ring ${
//               errors[field]
//                 ? "border-red-500 focus:ring-red-200"
//                 : "border-gray-300 focus:ring-blue-200"
//             }`}
//             disabled={loading}
//             required
//           />
//           {/* Field-specific error message */}
//           {errors[field] && (
//             <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
//           )}
//         </div>
//       ))}

//       {/* Submit button */}
//       <div className="flex justify-center">
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
//             loading && "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           {loading ? "Saving…" : "Save Agent"}
//         </button>
//       </div>
//     </form>
//   );
// }

import { useState } from "react";
import api from "../services/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function AgentForm({ onAdded }) {
  // State variables to manage form data, errors, messages, and loading status
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate form fields before submission
  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Required.";
    if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Invalid email.";
    if (!f.phone.trim()) e.phone = "Required.";
    else if (f.phone.replace(/\D/g, "").length < 7) {
      e.phone = "Invalid phone number.";
    }
    if (f.password.length < 6) e.password = "Min 6 chars.";
    return e;
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Run validation
    const ve = validate();
    if (Object.keys(ve).length) return setErrors(ve);

    setErrors({});
    setLoading(true);
    try {
      // Send form data to backend to create a new agent
      await api.post("/agents", f);
      setMsg("Agent added ✅");
      setF({ name: "", email: "", phone: "", password: "" }); // Clear form
      onAdded(); // Callback to refresh list
    } catch (err) {
      setMsg(err.response?.data.message || "Error adding agent");
    } finally {
      setLoading(false);
    }
  };

  // Handle field input change
  const onChange = (key) => (e) => {
    setF({ ...f, [key]: e.target.value });
    setErrors({ ...errors, [key]: "" });
    setMsg("");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mb-8 p-6 bg-gray-100 shadow-md rounded"
    >
      {/* Form heading */}
      <h3 className="text-2xl mb-4 font-bold text-gray-800 text-center">
        Add Agent
      </h3>

      {/* Success message */}
      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      {/* Name field */}
      <div className="mb-4">
        <label className="block mb-1 capitalize text-gray-700">Name</label>
        <input
          type="text"
          value={f.name}
          onChange={onChange("name")}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            errors.name
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          disabled={loading}
          required
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div className="mb-4">
        <label className="block mb-1 capitalize text-gray-700">Email</label>
        <input
          type="email"
          value={f.email}
          onChange={onChange("email")}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            errors.email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          disabled={loading}
          required
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone field */}
      <div className="mb-4">
        <label className="block mb-1 capitalize text-gray-700">Phone</label>
        <PhoneInput
          country="us" /* default country */
          value={f.phone} /* bind to your state */
          onChange={(value) => {
            setF({ ...f, phone: value });
            setErrors({ ...errors, phone: "" });
            setMsg("");
          }}
          inputProps={{
            name: "phone",
            required: true,
            disabled: loading,
          }}
          containerStyle={{ width: "100%" }}
          inputStyle={{
            width: "100%",
            padding: "0.5rem 0.75rem 0.5rem 48px",
            borderRadius: "0.25rem",
            border: errors.phone ? "1px solid #f56565" : "1px solid #d1d5db",
          }}
          buttonStyle={{
            border: "none",
            background: "transparent",
            marginLeft: "0.25rem",
          }}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Password field */}
      <div className="mb-4">
        <label className="block mb-1 capitalize text-gray-700">Password</label>
        <input
          type="password"
          value={f.password}
          onChange={onChange("password")}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            errors.password
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          disabled={loading}
          required
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Saving…" : "Save Agent"}
        </button>
      </div>
    </form>
  );
}
