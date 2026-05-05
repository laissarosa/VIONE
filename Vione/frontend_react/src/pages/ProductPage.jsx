import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/products.css";

function formatPrice(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductPage() {
  const { state }    = useLocation();
  const location     = useLocation();
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { addItem }  = useCart();
  const { toggle, isFav } = useFavorites();
  const { isLoggedIn }    = useAuth();

  const [product, setProduct]     = useState(state?.product || null);
  const [loading, setLoading]     = useState(!state?.product);
  const [selectedSize, setSize]   = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [msg, setMsg]             = useState("");

  useEffect(() => {
    if (!state?.product) {
      fetchProductById(id)
        .then((data) => { if (data.success) setProduct(data.product); })
        .finally(() => setLoading(false));
    }
  }, [id, state]);

  useEffect(() => { setActiveImg(0); }, [product?.id]);

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(""), 2500); };

  const handleAddCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (!selectedSize) { showMsg("Select a size!"); return; }
    addItem(product, selectedSize);
    showMsg("Product added to cart! 🛒");
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    toggle(product);
  };

  if (loading) return (
    <div className="vione-home"><Navbar />
      <p className="product-grid-page__status" style={{ padding: "80px 24px" }}>Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="vione-home"><Navbar />
      <div style={{ padding: "80px 24px", textAlign: "center" }}>
        <p>Product not found.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );

  const images = product.images?.length ? product.images : [product.imageUrl].filter(Boolean);

  return (
    <div className="vione-home">
      <Navbar />
      <main className="product-detail">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="product-detail__inner">
          <div className="product-detail__gallery">
            <div className="product-detail__img-wrap">
              <img src={images[activeImg]} alt={product.name} className="product-detail__img" />
              <span className="product-card__discount-badge product-detail__badge">
                {product.discount}% OFF
              </span>
            </div>
            {images.length > 1 && (
              <div className="product-detail__thumbs">
                {images.map((url, i) => (
                  <button
                    key={i}
                    className={`product-detail__thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={url} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__name">{product.name}</h1>
            {product.description && (
              <p className="product-detail__description">{product.description}</p>
            )}
            <div className="product-detail__prices">
              <span className="product-detail__original">{formatPrice(product.originalPrice)}</span>
              <span className="product-detail__price">{formatPrice(product.price)}</span>
              <span className="product-detail__off">{product.discount}% OFF</span>
            </div>
            <div className="product-detail__sizes">
              <p className="product-detail__sizes-label">Size:</p>
              <div className="product-detail__sizes-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {msg && <p className="product-detail__msg">{msg}</p>}
            <div className="product-detail__actions">
              <button className="product-detail__btn-cart" onClick={handleAddCart}>
                <i className="bx bx-cart"></i> Add to Cart
              </button>
              <button
                className={`product-detail__btn-fav ${isFav(product.id) ? "active" : ""}`}
                onClick={handleFavorite}
              >
                <i className={`bx ${isFav(product.id) ? "bxs-heart" : "bx-heart"}`}></i>
                {isFav(product.id) ? "Saved to Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}