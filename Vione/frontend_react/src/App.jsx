import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider }      from "./context/AuthContext";
import { CartProvider }      from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// AJUSTE DEFINITIVO BASEADO NA SUA PASTA 'PAGES':
import HomePage      from "./pages/homePage";      // Estava 'h' minúsculo no print
import AuthPage      from "./pages/authPage";      // Estava 'a' minúsculo no print
import Dashboard     from "./pages/dashboard";     // Estava 'd' minúsculo no print
import CategoryPage  from "./pages/categoryPage";  // Estava 'c' minúsculo no print
import ProductPage   from "./pages/ProductPage";   // ESTE é com 'P' maiúsculo no seu print
import CartPage      from "./pages/cartPage";      // Estava 'c' minúsculo no print
import FavoritesPage from "./pages/favoritesPage"; // Estava 'f' minúsculo no print
import PaymentPage   from "./pages/paymentPage";   // Estava 'p' minúsculo no print

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/"                                 element={<HomePage />}      />
              <Route path="/login"                            element={<AuthPage />}       />
              <Route path="/dashboard"                        element={<Dashboard />}      />
              <Route path="/categoria/:category/:subcategory" element={<CategoryPage />}  />
              <Route path="/produto/:id"                      element={<ProductPage />}    />
              <Route path="/carrinho"                         element={<CartPage />}       />
              <Route path="/favoritos"                        element={<FavoritesPage />}  />
              <Route path="/pagamento"                        element={<PaymentPage />}    />
            </Routes>
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}