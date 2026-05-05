/**
 * registerForm.jsx
 *
 * Componente de cadastro de usuário.
 *
 * Responsável por:
 * - Capturar CPF, email e senha
 * - Aplicar máscara de CPF
 * - Enviar requisição de cadastro
 */


import { useState } from "react";
import { cadastroRequest } from "../services/api";
import { formatCPF } from "../utils/formatCPF";

export default function RegisterForm() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState(""); // <-- Novo
  const [password, setPassword] = useState(""); // <-- Novo

  const handleCadastro = async (e) => {
    e.preventDefault();

    const cpfLimpo = cpf.replace(/\D/g, "");

    // AGORA TEMOS CERTEZA QUE OS VALORES EXISTEM
    console.log("Enviando para API:", { cpfLimpo, email, password });

    try {
      // Passamos as variáveis do estado diretamente
      const data = await cadastroRequest(cpfLimpo, email, password);
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar: Verifique o console do servidor");
    }
  };

  return (
    <div className="form-box register">
      <form onSubmit={handleCadastro}>
        <h1>Registration</h1>

        <div className="input-box">
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            required
          />
          <i className="bx bxs-id-card"></i>
        </div>

        <div className="input-box">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <i className="bx bxs-envelope"></i>
        </div>

        <div className="input-box">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}