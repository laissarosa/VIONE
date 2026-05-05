const API_URL = "http://localhost:3000";

// ── Auth ──────────────────────────────────────────────────────────

export const loginRequest = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha: password }),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Connection error." };
  }
};

export const cadastroRequest = async (cpf, email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, email, senha: password }),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Connection error." };
  }
};

// ── Produtos ──────────────────────────────────────────────────────

export const fetchProductsBySubcategory = async (category, subcategory) => {
  const res = await fetch(`${API_URL}/products/${category}/${subcategory}`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/item/${id}`);
  return res.json();
};

// ── Helpers ───────────────────────────────────────────────────────

function authHeader(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ── Carrinho ──────────────────────────────────────────────────────

export const fetchCart = async (userId, token) => {
  const res = await fetch(`${API_URL}/cart/${userId}`, {
    headers: authHeader(token),
  });
  return res.json();
};

export const addToCart = async (userId, productId, size, qty = 1, token) => {
  const res = await fetch(`${API_URL}/cart/${userId}/add`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ productId, size, qty }),
  });
  return res.json();
};

export const updateCartItem = async (userId, itemId, qty, token) => {
  const res = await fetch(`${API_URL}/cart/${userId}/update`, {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify({ itemId, qty }),
  });
  return res.json();
};

export const removeCartItem = async (userId, itemId, token) => {
  const res = await fetch(`${API_URL}/cart/${userId}/remove`, {
    method: "DELETE",
    headers: authHeader(token),
    body: JSON.stringify({ itemId }),
  });
  return res.json();
};

export const clearCartApi = async (userId, token) => {
  const res = await fetch(`${API_URL}/cart/${userId}/clear`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
};

// ── Favoritos ─────────────────────────────────────────────────────

export const fetchFavorites = async (userId, token) => {
  const res = await fetch(`${API_URL}/favorites/${userId}`, {
    headers: authHeader(token),
  });
  return res.json();
};

export const toggleFavoriteApi = async (userId, productId, token) => {
  const res = await fetch(`${API_URL}/favorites/${userId}/toggle`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ productId }),
  });
  return res.json();
};