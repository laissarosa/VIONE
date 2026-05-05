/**
 * togglePanel.jsx
 *
 * Componente responsável pela troca entre login e cadastro.
 *
 * Responsável por:
 * - Alternar interface entre os formulários
 * - Exibir mensagens de boas-vindas
 */

export default function TogglePanel({ onToggle }) {
  return (
    <div className="toggle-box">
      
     
      <div className="toggle-panel toggle-right">
        <h1>Welcome Back!</h1>
        <p>Already have an account?</p>
        <button className="btn" onClick={onToggle}>Login</button>
      </div>

      
      <div className="toggle-panel toggle-left">
        <h1>Hello, Welcome!</h1>
        <p>Don't have an account?</p>
        <button className="btn" onClick={onToggle}>Register</button>
      </div>
    </div>
  );
}