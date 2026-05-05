/**
 * FavoritesContext.jsx
 * Estado global dos favoritos. Persiste no localStorage.
 */
import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vione_favs")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("vione_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const isFav = (id) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);