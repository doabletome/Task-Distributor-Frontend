import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import AgentsPage from "./pages/AgentsPage";
import UploadPage from "./pages/UploadPage";
import TasksPage from "./pages/TasksPage";
import SubagentsPage from "./pages/SubagentsPage";
// Main application router
export default function App() {
  return (
    <Routes>
      {/* Public route: Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected route: Agents page (admin only view for creating agents) */}
      <Route
        path="/agents"
        element={
          <PrivateRoute>
            <AgentsPage />
          </PrivateRoute>
        }
      />

      {/* Protected route: CSV Upload page (admin only) */}
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <UploadPage />
          </PrivateRoute>
        }
      />

      {/* Protected route: Task list (agent: own tasks, admin: all tasks) */}
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />

      <Route path="/subagentTasks" element={<SubagentsPage />} />

      {/* Catch-all route: redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
