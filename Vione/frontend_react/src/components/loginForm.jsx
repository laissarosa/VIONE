import { useNavigate, useLocation } from "react-router-dom";
import { loginRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  // Pega a página de origem — se não tiver, vai para o dashboard
  const from = location.state?.from || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.password.value;

    try {
      const data = await loginRequest(email, senha);
      if (data.success) {
        login(data.token, data.user);
        // Volta para onde o usuário estava antes de ser redirecionado
        navigate(from, { replace: true });
      } else {
        alert(data.message);
      }
    } catch {
      alert("Connection error. Is the backend running?");
    }
  };

  return (
    <div className="form-box login">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="email" name="email" placeholder="E-mail" required />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="forgot-link">
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className="btn">Login</button>
        <p>Or sign in with</p>
        <div className="social-icons">
          <a href="#"><i className="bx bxl-google"></i></a>
          <a href="#"><i className="bx bxl-facebook"></i></a>
          <a href="#"><i className="bx bxl-github"></i></a>
          <a href="#"><i className="bx bxl-linkedin"></i></a>
        </div>
      </form>
    </div>
  );
}