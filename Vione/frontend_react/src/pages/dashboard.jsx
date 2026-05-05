import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/userProfile.css";

export default function UserProfile() {
  const navigate      = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="user-page-wrapper">
      <div className="user-container">
        <aside className="sidebar">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <div className="profile-header">
            <h1>My Account</h1>
            <p>Welcome, {user?.email?.split("@")[0] || "User"}</p>
          </div>
          <nav className="user-menu">
            <ul>
              <li><i className="bx bx-map"></i> My Addresses</li>
              <li><i className="bx bx-credit-card"></i> Saved Cards</li>
              <li><i className="bx bx-purchase-tag"></i> My Coupons</li>
              <li><i className="bx bx-cog"></i> Settings</li>
            </ul>
          </nav>
          <button onClick={handleLogout} className="btn-logout">
            Sign Out
          </button>
        </aside>

        <main className="main-content">
          <section className="orders-section">
            <h2>Activity Summary</h2>
            <div className="orders-grid">
              <div className="stat-card">
                <span className="card-icon">🛒</span>
                <div className="card-info">
                  <strong>My Orders</strong><span>View history</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="card-icon">🚚</span>
                <div className="card-info">
                  <strong>On the Way</strong><span>2 active orders</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="card-icon">⭐</span>
                <div className="card-info">
                  <strong>To Review</strong><span>5 items</span>
                </div>
              </div>
              <div className="stat-card">
                <span className="card-icon">💰</span>
                <div className="card-info">
                  <strong>Pending Payment</strong><span>No outstanding balance</span>
                </div>
              </div>
            </div>
          </section>
          <section className="wallet-section">
            <h2>My Wallet</h2>
            <div className="wallet-card">
              <div className="wallet-info">
                <p>Vione Balance</p><h3>R$ 450,00</h3>
              </div>
              <div className="wallet-divider"></div>
              <div className="wallet-info">
                <p>Active Coupons</p><h3>3 available</h3>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}