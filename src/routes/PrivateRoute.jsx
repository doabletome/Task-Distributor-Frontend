import { Navigate } from "react-router-dom";

// PrivateRoute is a wrapper to protect routes from unauthorized access
export default function PrivateRoute({ children }) {
  // Check if a token is present in localStorage (i.e., user is logged in)
  return localStorage.getItem("token") ? (
    children // If authenticated, render the requested component
  ) : (
    <Navigate to="/login" replace /> // Otherwise, redirect to login
  );
}
