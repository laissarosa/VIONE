/**
 * AuthContext.jsx
 * Gerencia sessão do usuário.
 * Lê o token do localStorage e extrai o userId sem depender de chamada extra ao backend.
 */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Decodifica o payload do JWT sem biblioteca externa
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem("token") || null);
  const [user, setUser]     = useState(() => {
    const t = localStorage.getItem("token");
    return t ? parseJwt(t) : null;
  });

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    // Prefere os dados retornados pelo backend; fallback para o payload do JWT
    setUser(userData || parseJwt(newToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Verifica expiração do token a cada vez que a aba fica ativa
  useEffect(() => {
    const check = () => {
      if (!token) return;
      const payload = parseJwt(token);
      if (payload?.exp && payload.exp * 1000 < Date.now()) {
        logout();
      }
    };
    window.addEventListener("focus", check);
    return () => window.removeEventListener("focus", check);
  }, [token]);

  const isLoggedIn = !!token;
  const userId     = user?.id ?? null;

  return (
    <AuthContext.Provider value={{ token, user, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);