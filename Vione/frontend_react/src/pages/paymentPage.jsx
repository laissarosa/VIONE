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

export default function PaymentPage() {
  const { total, items, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { state: { from: "/pagamento" } });
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const handleFinalize = () => {
    alert("Payment processed successfully! (Simulation)");
    clearCart();
    navigate("/");
  };

  return (
    <div className="vione-home">
      <Navbar />
      <main className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Cart</button>
        <h1 className="cart-page__title">Payment</h1>

        <div className="cart-layout">
          <div className="cart-items">
            <div className="payment-options">
              <h3>How would you like to pay?</h3>

              <div style={{ marginTop: "20px" }}>
                <label className="radiostyle">
                  <input type="radio" name="pay" defaultChecked />
                  <i className="bx bxl-pix" style={{ color: "#32bcad", marginLeft: "10px" }}></i>
                  Pix (Instant approval)
                </label>
                <label className="radiostyle">
                  <input type="radio" name="pay" />
                  <i className="bx bx-credit-card" style={{ marginLeft: "10px" }}></i>
                  Credit Card
                </label>
                <label className="radiostyle">
                  <input type="radio" name="pay" />
                  <i className="bx bx-barcode" style={{ marginLeft: "10px" }}></i>
                  Bank Slip
                </label>
              </div>

              <div style={{ marginTop: "30px" }}>
                <h4>Delivery Details</h4>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  The order will be sent to the address registered in your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary__row">
              <span>Total items</span>
              <span>{items.length}</span>
            </div>
            <div className="cart-summary__total">
              <span>Total Amount</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="cart-summary__btn" onClick={handleFinalize}>
              Confirm and Pay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}