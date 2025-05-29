import LoginForm from "../components/LoginForm";

// LoginPage wraps the LoginForm inside a centered full-page container
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-500">
      <LoginForm />
    </div>
  );
}
