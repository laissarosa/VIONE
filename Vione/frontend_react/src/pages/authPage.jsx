import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm    from "../components/loginForm";
import RegisterForm from "../components/registerForm";
import TogglePanel  from "../components/togglePanel";
import { useAuth }  from "../context/AuthContext";
import "../styles/auth.css";

export default function AuthPage() {
  const [active, setActive] = useState(false);
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Preserva o "from" para o <Navigate> caso o usuário já esteja logado
  // e tente acessar /login diretamente (sem vir de um redirecionamento)
  const from = location.state?.from || "/dashboard";

  if (isLoggedIn) return <Navigate to={from} replace />;

  return (
    <div className={`container ${active ? "active" : ""}`} id="container">
      <LoginForm />
      <RegisterForm />
      <TogglePanel onToggle={() => setActive(!active)} />
    </div>
  );
}