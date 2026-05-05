/**
 * categoryPage.jsx
 * Busca produtos do backend 
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductsBySubcategory } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/products.css";

function formatPrice(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const { toggle, isFav } = useFavorites();

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductsBySubcategory(category, subcategory)
      .then((data) => {
        if (data.success) setProducts(data.products);
        else setError("Unable to load products.");
      })
      .catch(() => setError("Error connecting to the server."))
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  const title = products[0]
    ? products[0].subcategory || subcategory
    : subcategory;

  return (
    <div className="vione-home">
      <Navbar />
      <main className="product-grid-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="product-grid-page__title" style={{ textTransform: "capitalize" }}>
          {title}
        </h1>

        {loading && <p className="product-grid-page__status">Loading products...</p>}
        {error   && <p className="product-grid-page__status product-grid-page__status--error">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="product-grid-page__status">No products found in this category.</p>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-card__img-wrap"
                onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}
              >
                <img src={product.imageUrl} alt={product.name} className="product-card__img" />
                <span className="product-card__discount-badge">{product.discount}% OFF</span>
                <button
                  className={`product-card__fav ${isFav(product.id) ? "active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); toggle(product); }}
                  aria-label="Favorite this product"
                >
                  <i className={`bx ${isFav(product.id) ? "bxs-heart" : "bx-heart"}`}></i>
                </button>
              </div>
              <div
                className="product-card__info"
                onClick={() => navigate(`/produto/${product.id}`, { state: { product } })}
                style={{ cursor: "pointer" }}
              >
                <p className="product-card__name">{product.name}</p>
                <p className="product-card__original-price">{formatPrice(product.originalPrice)}</p>
                <p className="product-card__price">{formatPrice(product.price)}</p>
                <p className="product-card__off">{product.discount}% OFF</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}