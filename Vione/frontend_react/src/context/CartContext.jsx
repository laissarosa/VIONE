/**
 * CartContext.jsx
 * - Não logado: carrinho salvo no localStorage
 * - Logado: carrinho salvo no banco via API
 * - Ao logar: itens locais são migrados para o banco automaticamente
 */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "../services/api";

const CartContext = createContext();

const LOCAL_KEY = "vione_cart_guest";

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; }
  catch { return []; }
}

function saveLocal(items) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { isLoggedIn, userId, token } = useAuth();

  // items para usuário NÃO logado (localStorage)
  const [localItems, setLocalItems] = useState(loadLocal);

  // items para usuário logado (banco)
  const [remoteItems, setRemoteItems] = useState([]);
  const [loadingRemote, setLoadingRemote] = useState(false);

  // Headers autenticados
  const authHeaders = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Carrega carrinho do banco quando loga
  useEffect(() => {
    if (!isLoggedIn || !userId) return;

    setLoadingRemote(true);

    // Migra itens locais para o banco antes de buscar
    const migrate = async () => {
      const local = loadLocal();
      for (const item of local) {
        await addToCart(userId, item.product.id, item.size, item.qty, token);
      }
      // Limpa localStorage após migração
      localStorage.removeItem(LOCAL_KEY);
      setLocalItems([]);
    };

    migrate()
      .then(() => fetchCart(userId, token))
      .then((data) => {
        if (data.success) setRemoteItems(normalizeRemote(data.cart.items));
      })
      .finally(() => setLoadingRemote(false));
  }, [isLoggedIn, userId]);

  // Persiste itens locais no localStorage
  useEffect(() => {
    if (!isLoggedIn) saveLocal(localItems);
  }, [localItems, isLoggedIn]);

  // Normaliza itens vindos do banco para o mesmo formato do localStorage
  function normalizeRemote(rawItems = []) {
    return rawItems.map((item) => ({
      key:     `${item.productId}-${item.size}`,
      dbId:    item.id,          // id do CartItem no banco
      size:    item.size,
      qty:     item.qty,
      product: {
        ...item.product,
        sizes: typeof item.product.sizes === "string"
          ? JSON.parse(item.product.sizes)
          : item.product.sizes,
      },
    }));
  }

  // ── Ações ─────────────────────────────────────────────────────

  const addItem = async (product, size) => {
    if (isLoggedIn) {
      const data = await addToCart(userId, product.id, size, 1, token);
      if (data.success) {
        const refreshed = await fetchCart(userId, token);
        if (refreshed.success) setRemoteItems(normalizeRemote(refreshed.cart.items));
      }
    } else {
      setLocalItems((prev) => {
        const key = `${product.id}-${size}`;
        const existing = prev.find((i) => i.key === key);
        if (existing) return prev.map((i) => i.key === key ? { ...i, qty: i.qty + 1 } : i);
        return [...prev, { key, product, size, qty: 1 }];
      });
    }
  };

  const removeItem = async (key) => {
    if (isLoggedIn) {
      const item = remoteItems.find((i) => i.key === key);
      if (!item) return;
      await removeCartItem(userId, item.dbId, token);
      setRemoteItems((prev) => prev.filter((i) => i.key !== key));
    } else {
      setLocalItems((prev) => prev.filter((i) => i.key !== key));
    }
  };

  const updateQty = async (key, qty) => {
    if (qty < 1) return removeItem(key);
    if (isLoggedIn) {
      const item = remoteItems.find((i) => i.key === key);
      if (!item) return;
      await updateCartItem(userId, item.dbId, qty, token);
      setRemoteItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
    } else {
      setLocalItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i));
    }
  };

  const clearCart = async () => {
    if (isLoggedIn) {
      await clearCartApi(userId, token);
      setRemoteItems([]);
    } else {
      setLocalItems([]);
    }
  };

  const items = isLoggedIn ? remoteItems : localItems;
  const total = items.reduce((sum, i) => sum + (i.product.price || 0) * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      total, count, loadingRemote,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);