/**
 * favoritesPage.jsx
 * Página de produtos salvos nos favoritos.
 */
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cart.css";
import "../styles/products.css";

function formatPrice(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function FavoritesPage() {
  const { favorites, toggle } = useFavorites();
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="vione-home">
      <Navbar />
      <main className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="cart-page__title">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="cart-empty">
            <i className="bx bx-heart cart-empty__icon"></i>
            <p>You haven't saved any products yet.</p>
            <button className="product-detail__btn-cart" onClick={() => navigate("/")}>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="product-grid" style={{ padding: "0 0 40px" }}>
            {favorites.map((product) => (
              <div key={product.id} className="product-card">
                <div
                  className="product-card__img-wrap"
                  onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}
                >
                  <img src={product.imageUrl} alt={product.name} className="product-card__img" />
                  <span className="product-card__discount-badge">{product.discount}% OFF</span>
                  <button
                    className="product-card__fav active"
                    onClick={(e) => { e.stopPropagation(); toggle(product); }}
                  >
                    <i className="bx bxs-heart"></i>
                  </button>
                </div>
                <div className="product-card__info">
                  <p className="product-card__name">{product.name}</p>
                  <p className="product-card__original-price">{formatPrice(product.originalPrice)}</p>
                  <p className="product-card__price">{formatPrice(product.price)}</p>
                  <button
                    className="product-detail__btn-cart"
                    style={{ marginTop: 8, padding: "8px", fontSize: 13 }}
                    onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}
                  >
                    Ver produto
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}