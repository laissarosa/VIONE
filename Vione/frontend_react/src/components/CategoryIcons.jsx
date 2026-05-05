/**
 * CategoryIcons.jsx
 * Grade de categorias com ícones circulares roxos (igual ao print).
 */

// Ícones em SVG inline — fiel aos da imagem (tag, estrela, camiseta, pessoa, bebê, etc.)
const CATEGORIES = [
  {
    id: 1, label: "Sales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 2, label: "New Arrivals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
  },
  {
    id: 3, label: "Womens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H7v13a2 2 0 002 2h6a2 2 0 002-2V10h3.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
      </svg>
    ),
  },
  {
    id: 4, label: "Mens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4"/>
        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
      </svg>
    ),
  },
  {
    id: 5, label: "Kids",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4"/>
        <path d="M8 14s-4 1-4 5h16c0-4-4-5-4-5"/>
        <path d="M9 8c0-1.5.5-3 3-3s3 1.5 3 3"/>
      </svg>
    ),
  },
  {
    id: 6, label: "Beauty",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
    ),
  },
  {
    id: 7, label: "Basics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H7v13a2 2 0 002 2h6a2 2 0 002-2V10h3.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
      </svg>
    ),
  },
  {
    id: 8, label: "Jeans",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="2.5"/>
        <circle cx="16" cy="8" r="2.5"/>
        <path d="M5.5 10.5V20h4l2.5-5 2.5 5h4V10.5"/>
      </svg>
    ),
  },
  {
    id: 9, label: "Acessories",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 5a7 7 0 100 14A7 7 0 0012 5z"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    id: 10, label: "Shoes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17l3-6 2 3 4-7 4 5 2-2 3 7H3z"/>
      </svg>
    ),
  },
  {
    id: 11, label: "Sportswear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8l4 4-4 4-4-4 4-4z"/>
      </svg>
    ),
  },
  {
    id: 12, label: "Beachwear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 18c4-4 8-4 12 0s8 4 8 0"/>
        <path d="M2 14c4-4 8-4 12 0s8 4 8 0"/>
        <path d="M2 10c4-4 8-4 12 0s8 4 8 0"/>
      </svg>
    ),
  },
  {
    id: 13, label: "Intimate Wear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
  },
];

export default function CategoryIcons() {
  return (
    <section className="cat-icons">
      <div className="cat-icons__grid">
        {CATEGORIES.map((cat) => (
          <a key={cat.id} href="#" className="cat-icons__item">
            <div className="cat-icons__circle">
              {cat.icon}
            </div>
            <span className="cat-icons__label">{cat.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}