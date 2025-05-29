import Layout from "../components/Layout";
import TaskList from "../components/TaskList";

// TasksPage displays task list depending on the user's role
export default function TasksPage() {
  const role = localStorage.getItem("role"); // Get current role from localStorage

  return (
    <Layout>
      {/* Header text changes based on role */}
      <h2 className="text-2xl font-semibold mb-4">
        {role == "agent" ? "My Task" : "Task Assigned "}
      </h2>

      {/* Display task list for either agent or admin */}
      <TaskList />
    </Layout>
  );
}
