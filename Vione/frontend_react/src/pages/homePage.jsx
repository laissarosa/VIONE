/**
 * homePage.jsx
 * Página inicial da Vione.
 * Apenas importa e monta os componentes na ordem correta.
 */
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar          from "../components/Navbar";
import HeroBanner      from "../components/HeroBanner";
import CategoryIcons   from "../components/CategoryIcons";
import Footer          from "../components/Footer";
import "../styles/home.css";
import "../styles/sidebar.css"; // adicionar esta linha

export default function HomePage() {
  return (
    <div className="vione-home">
      <AnnouncementBar />
      <Navbar />
      <HeroBanner />
      <CategoryIcons />
      <Footer />
    </div>
  );
}