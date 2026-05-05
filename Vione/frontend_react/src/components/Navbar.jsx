import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CategorySidebar from "./CategorySidebar";

const CATEGORIES_MENU = [
  { key: "new",         label: "New Arrivals", hasSidebar: false },
  { key: "womens",      label: "Women",        hasSidebar: true  },
  { key: "mens",        label: "Men",          hasSidebar: true  },
  { key: "kids",        label: "Kids",         hasSidebar: false },
  { key: "beauty",      label: "Beauty",       hasSidebar: false },
  { key: "basics",      label: "Basics",       hasSidebar: false },
  { key: "denim",       label: "Denim",        hasSidebar: false },
  { key: "accessories", label: "Accessories",  hasSidebar: false },
  { key: "shoes",       label: "Shoes",        hasSidebar: false },
  { key: "sportswear",  label: "Sportswear",   hasSidebar: false },
  { key: "swimwear",    label: "Swimwear",     hasSidebar: false },
  { key: "underwear",   label: "Underwear",    hasSidebar: false },
];

export default function Navbar() {
  const [search, setSearch]           = useState("");
  const [openSidebar, setOpenSidebar] = useState(null);
  const { count }      = useCart();
  const { isLoggedIn } = useAuth();
  const navigate       = useNavigate();

  const handleCatClick = (cat) => {
    if (!cat.hasSidebar) return;
    setOpenSidebar((prev) => (prev === cat.key ? null : cat.key));
  };

  return (
    <>
      <header className="vione-header">
        <div className="vione-header__main">
          <a href="/" className="vione-header__logo">
            <div className="vione-header__logo-icon">V</div>
            <span>VIONE</span>
          </a>

          <div className="vione-header__search-wrap">
            <i className="bx bx-search vione-header__search-icon"></i>
            <input
              className="vione-header__search"
              type="text"
              placeholder="Search products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="vione-header__icons">
            <a href="/favoritos" className="vione-header__icon-btn">
              <i className="bx bx-heart"></i>
              <span>Favorites</span>
            </a>

            <a href="/carrinho" className="vione-header__icon-btn" style={{ position: "relative" }}>
              <i className="bx bx-cart"></i>
              <span>Cart</span>
              {count > 0 && (
                <span className="vione-header__cart-badge">{count}</span>
              )}
            </a>

            {/* Conta: vai para /dashboard se logado, /login se não */}
            <button
              className="vione-header__icon-btn"
              onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
            >
              <i className={`bx ${isLoggedIn ? "bxs-user" : "bx-user"}`}></i>
              <span>{isLoggedIn ? "Account" : "Sign In"}</span>
            </button>
          </div>
        </div>

        <nav className="vione-header__categories">
          <div className="vione-header__categories-inner">
            {CATEGORIES_MENU.map((cat) => (
              <button
                key={cat.key}
                className={`vione-header__cat-link ${openSidebar === cat.key ? "active" : ""}`}
                onClick={() => handleCatClick(cat)}
                style={{ cursor: cat.hasSidebar ? "pointer" : "default" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {openSidebar && (
        <CategorySidebar
          categoryKey={openSidebar}
          onClose={() => setOpenSidebar(null)}
        />
      )}
    </>
  );
}