import Layout from "../components/Layout";
import AgentForm from "../components/AgentForm";
import AgentsList from "../components/AgentsList";
import SubAgents from "../components/SubAgents";
// Page for managing agents
export default function AgentsPage() {
  const refresh = () => window.location.reload(); // Function to refresh page after adding agent
  const role = localStorage.getItem("role"); // Get user role from localStorage
  const token = localStorage.getItem("token");

  if (role === "subagent") {
    return <SubAgents role={role} token={token} />;
  }
  return (
    <Layout>
      {/* Only show the form to add agents if user is admin */}
      <AgentForm onAdded={refresh} role={role} />

      {/* Show the list of agents for both admin and agents */}
      <AgentsList role={role} />
    </Layout>
  );
}
