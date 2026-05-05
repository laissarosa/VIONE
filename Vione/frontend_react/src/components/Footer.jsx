/**
 * Footer.jsx
 * Rodapé completo com links, formas de pagamento e redes sociais.
 */
export default function Footer() {
  return (
    <footer className="vione-footer">
      <div className="vione-footer__inner">

        {/* Atendimento */}
        <div className="vione-footer__col">
        <h4>Customer Service</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Exchanges and Returns</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
        </ul>
      </div>

      {/* Institutional */}
      <div className="vione-footer__col">
        <h4>Institutional</h4>
        <ul>
          <li><a href="#">About Vione</a></li>
          <li><a href="#">Our Stores</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Affiliate Program</a></li>
          <li><a href="#">Vione Card</a></li>
        </ul>
      </div>

      {/* Categories */}
      <div className="vione-footer__col">
        <h4>Categories</h4>
        <ul>
          <li><a href="#">Women</a></li>
          <li><a href="#">Men</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Beauty</a></li>
          <li><a href="#">Jeans</a></li>
        </ul>
      </div>

      {/* Payment Methods */}
      <div className="vione-footer__col">
        <h4>Payment Methods</h4>
        <div className="vione-footer__payments">
          <span className="pay-badge">VISA</span>
          <span className="pay-badge">MASTER</span>
          <span className="pay-badge">ELO</span>
          <span className="pay-badge">PIX</span>
          <span className="pay-badge">BOLETO</span>
        </div>
      </div>

        {/* Redes Sociais */}
        <div className="vione-footer__col">
          <h4>Social Media</h4>
          <div className="vione-footer__social">
            <a href="#" className="vione-footer__social-btn vione-footer__social-btn--fb" aria-label="Facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="vione-footer__social-btn vione-footer__social-btn--ig" aria-label="Instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="vione-footer__social-btn vione-footer__social-btn--tw" aria-label="Twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="vione-footer__social-btn vione-footer__social-btn--yt" aria-label="YouTube">
              <i className="bx bxl-youtube"></i>
            </a>
          </div>
          <div className="vione-footer__contact">
            <p><i className="bx bx-envelope"></i> contato@vione.com.br</p>
            <p><i className="bx bx-phone"></i> (11) 4002-8922</p>
          </div>
        </div>

      </div>
    </footer>
  );
}