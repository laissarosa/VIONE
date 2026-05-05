/**
 * CategorySidebar.jsx
 * Drawer lateral que abre ao clicar em Feminino ou Masculino no menu.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATALOG } from "../data/products";

export default function CategorySidebar({ categoryKey, onClose }) {
  const navigate  = useNavigate();
  const category  = CATALOG[categoryKey];

  // Fecha com ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Trava scroll do body enquanto aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!category) {
    console.warn(`CategorySidebar: categoria "${categoryKey}" não encontrada em CATALOG`);
    return null;
  }

  const handleSubcat = (subcatId) => {
    onClose();
    navigate(`/categoria/${categoryKey}/${subcatId}`);
  };

  return (
    <>
      {/* Backdrop escuro */}
      <div
        className="sidebar-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 200,
        }}
      />

      {/* Drawer */}
      <aside
        className="category-sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "300px",
          background: "#fff",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          overflowY: "auto",
          animation: "slideIn 0.25s ease",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 24px 20px",
          borderBottom: "1px solid #f0f0f0",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#9b30d9", margin: 0 }}>
            {category.label}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 26,
              cursor: "pointer",
              color: "#666",
              lineHeight: 1,
              padding: 4,
            }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSubcat(sub.id)}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "16px 24px",
                fontSize: 15,
                fontWeight: 500,
                color: "#333",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8f0ff";
                e.currentTarget.style.color = "#9b30d9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.color = "#333";
              }}
            >
              {sub.label}
            </button>
          ))}
        </nav>
      </aside>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}