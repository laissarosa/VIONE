/**
 * HeroBanner.jsx
 * Carrossel de banners principais.
 */
import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    id: 1,
    image: "/banners/ads/beauty.png", 
    title: "Beauty",
    subtitle: "Unforgettable gifts\nfor Mother's Day",
  },
  {
    id: 2,
    image: "/banners/ads/winter.png", 
    title: "Fashion",
    subtitle: "New arrivals\nfor you to shine",
  },
  {
    id: 3,
    image: "/banners/ads/sale.png",
    title: "Offers",
    subtitle: "Up to 50% off\non selected items",
  },
  {
    id: 4,
    image: "/banners/ads/kids.png",
    title: "Summer",
    subtitle: "Exclusive collection\njust arrived",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="hero-banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="hero-banner__track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {SLIDES.map((slide) => (
          <div key={slide.id} className="hero-banner__slide">
            <img
              src={slide.image}
              alt={slide.title}
              className="hero-banner__img"
            />
            {/* Overlay com texto */}
            <div className="hero-banner__overlay">
              <h2 className="hero-banner__title">{slide.title}</h2>
              <p className="hero-banner__sub">
                {slide.subtitle.split("\n").map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Setas */}
      <button className="hero-banner__arrow hero-banner__arrow--prev" onClick={prev} aria-label="Anterior">
        <i className="bx bx-chevron-left"></i>
      </button>
      <button className="hero-banner__arrow hero-banner__arrow--next" onClick={next} aria-label="Próximo">
        <i className="bx bx-chevron-right"></i>
      </button>

      {/* Dots */}
      <div className="hero-banner__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-banner__dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}