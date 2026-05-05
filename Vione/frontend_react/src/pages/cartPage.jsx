import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cart.css";

function formatPrice(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { state: { from: "/carrinho" } });
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="vione-home">
      <Navbar />
      <main className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Continue Shopping</button>
        <h1 className="cart-page__title">My Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <i className="bx bx-cart cart-empty__icon"></i>
            <p>Your cart is empty.</p>
            <button className="product-detail__btn-cart" onClick={() => navigate("/")}>
              View Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.key} className="cart-item">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item__img"
                  />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.product.name}</p>
                    <p className="cart-item__size">Size: {item.size}</p>
                    <p className="cart-item__price">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.key)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-summary__row">
                <span>Subtotal</span><span>{formatPrice(total)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className="cart-summary__free">Free</span>
              </div>
              <div className="cart-summary__total">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
              <button className="cart-summary__btn" onClick={() => navigate("/pagamento")}>
                Checkout
              </button>
              <button className="cart-summary__clear" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}